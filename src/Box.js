/**
 * @typedef {{ bNeedSelfCheck?: boolean, sNeedCheckPrefix?: string?, sProtectedPrefix?: string? }} IOpts
 */
/**
 * коробка конструкторов
 * при инициализации автоматически делает bind( this ) всех свойств-функций
 * если свойство начинается на "new*", дополнительно вызывает проверку результата, все свойства должны быть !== undefined
 * имеет вспомогательный метод one() для организации singleton/service экземпляров
 * для работы метода one, требуется WeakMap
 */
export class Box {

  /**
   * @type {string|null}
   */
  _sNeedCheckPrefix

  /**
   * @type {string|null}
   */
  _sProtectedPrefix

  /**
   * @type {boolean} была уже проверка самого Box?
   */
  _bNeedSelfCheck

  /**
   * @type {boolean} один раз пропустить проверку
   */
  _bSkipCheck = false

  /**
   * @type {WeakMap} синглетонов
   */
  _oOne

  /**
   * oOpts.bNeedSelfCheck - нужно ли проверять сам Box на свойства undefined
   * oOpts.sNeedCheckPrefix - возвращаемые значения методов с этим префиксом будут проверяться на undefined
   * oOpts.sProtectedPrefix - особый префикс, при его наличии проверка на undefined пропускается
   * @param {IOpts|null} oOpts
   */
  constructor (oOpts = null) {

    const { bNeedSelfCheck = true, sNeedCheckPrefix = 'new', sProtectedPrefix = '_' } = oOpts || {};

    this._sNeedCheckPrefix = sNeedCheckPrefix
    this._sProtectedPrefix = sProtectedPrefix
    this._bNeedSelfCheck = bNeedSelfCheck
    this._autoBind()
  }

  /**
   * метод по функции создания нового объекта, создает его и кеширует
   * @param {function} fnNew
   * @return {any}
   */
  one (fnNew) {
    // не в конструкторе, потому что к моменту вызова конструктора может не быть
    // полифила WeakMap
    if (!this._oOne) {
      this._oOne = new WeakMap()
    }

    if (this._oOne.has(fnNew)) {
      return this._oOne.get(fnNew)
    } else {
      const oObj = fnNew.call(this)
      this._oOne.set(fnNew, oObj)
      return oObj
    }
  }

  /**
   * пройтись по публичным свойствам объекта, Error если хоть один undefined
   * @param {object} oObj
   * @param {string|null} sProtectedPrefix
   */
  initCheck (oObj, sProtectedPrefix = null) {

    if (sProtectedPrefix === null) {
      sProtectedPrefix = this._sProtectedPrefix
    }

    for (let sPropName in oObj) {

      // is protected prop
      if (sProtectedPrefix !== null && sPropName.indexOf(sProtectedPrefix) === 0) {
        continue
      }

      if (typeof oObj[sPropName] !== 'undefined') {
        continue
      }

      throw new Error('di-box: "' + oObj.constructor.name + '.' + sPropName + '" object property value is undefined')
    }
  }

  /**
   * возможность пропустить следующую проверку initCheck
   */
  skipCheck () {
    this._bSkipCheck = true
  }

  /**
   * сбросить все уже созданные синглетоны
   */
  reset () {
    this._oOne = null
  }

  /**
   * автоустановка this контекста во все методы объекта
   * для методов new*, проверяет чтобы ни одно публичное свойство не содержало undefined
   */
  _autoBind () {
    let oObj = this
    do {
      // проходимся по всем потомкам, до Box
      if (Box === oObj.constructor) {
        break
      }

      // проходимся по всем свойствам, и находим функции
      const aProps = Object.getOwnPropertyNames(oObj)
      for (let i = 0; i < aProps.length; i++) {

        let sPropName = aProps[i]

        if (!this._isFn(sPropName)) {
          continue
        }

        // делаем bind(this) c проверками, если необходимо
        this[sPropName] = this._bind(this[sPropName], this._isNeedCheck(sPropName))
      }
    } while ((
      oObj = Object.getPrototypeOf(oObj)
    ))
  }

  /**
   * привязка к методу контекста this
   * @param {function} fnMethod
   * @param {boolean} bWithInitCheck true означает с результатом выполнить еще initCheck
   * @return {function}
   */
  _bind (fnMethod, bWithInitCheck) {

    // return fnMethod.bind( this );

    return (...aArgs) => {

      // проверяем сам Box
      this._selfCheck()

      // .bind( this )
      const oNewObj = fnMethod.call(this, ...aArgs)

      // внутри fnMethod мог быть вызван .skipCheck()
      if (this._bSkipCheck) {
        bWithInitCheck = false
        this._bSkipCheck = true
      }

      if (bWithInitCheck) {
        this.initCheck(oNewObj)
      }
      return oNewObj
    }
  }

  /**
   * проверка самого Box
   * @return void
   */
  _selfCheck () {
    if (this._bNeedSelfCheck) {
      this.initCheck(this, '_')
      this._bNeedSelfCheck = false
    }
  }

  /**
   * по названию свойства понять, нужно ли делать check
   * @param {string} sPropName
   * @return {boolean}
   */
  _isNeedCheck (sPropName) {
    return this._sNeedCheckPrefix !== null && sPropName.indexOf(this._sNeedCheckPrefix) === 0
  }

  /**
   * по названию свойства понять, функция это или нет
   * @param {string} sPropName
   * @return {boolean}
   */
  _isFn (sPropName) {
    return typeof this[sPropName] === 'function' && sPropName !== 'constructor'
  }
}