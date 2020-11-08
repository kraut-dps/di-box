/**
 * коробка конструкторов
 * при инициализации автоматически делает bind( this ) всех свойств-функций
 * если свойство начинается на "new*", дополнительно вызывает проверку результата, все свойства должны быть !== undefined
 * имеет вспомогательный метод one() для организации singleton/service экземпляров
 * для работы метода one, требуется WeakMap
 */
export class Box {
    /**
     * @param {string} sNeedCheckPrefix если свойство Box функция и начинается с этого префикса,
     * нужно сделать initCheck() возвращемого значения
     * @param {string} sProtectedPrefix если свойство с этим префиксом, при initCheck пропускаем его
     */
    constructor(sNeedCheckPrefix?: string, sProtectedPrefix?: string);
    /**
     * @type {string|null}
     */
    _sNeedCheckPrefix: string | null;
    /**
     * @type {string|null}
     */
    _sProtectedPrefix: string | null;
    /**
     * @type {WeakMap} синглетонов
     */
    _oOne: WeakMap<any, any>;
    /**
     * @type {boolean} была уже проверка самого Box?
     */
    _bSelfCheck: boolean;
    /**
     * @type {boolean} один раз пропустить проверку
     */
    _bSkipCheck: boolean;
    /**
     * метод по функции создания нового объекта, создает его и кеширует
     * @param {function} fnNew
     * @return {any}
     */
    one(fnNew: Function): any;
    /**
     * пройтись по публичным свойствам объекта, Error если хоть один undefined
     * @param {object} oObj
     * @param {string|null} sProtectedPrefix
     */
    initCheck(oObj: object, sProtectedPrefix?: string | null): void;
    /**
     * возможность пропустить следующую проверку initCheck
     */
    skipCheck(): void;
    /**
     * сбросить все уже созданные синглетоны
     */
    reset(): void;
    /**
     * автоустановка this контекста во все методы объекта
     * для методов new*, проверяет чтобы ни одно публичное свойство не содержало undefined
     */
    _autoBind(): void;
    /**
     * привязка к методу контекста this
     * @param {function} fnMethod
     * @param {boolean} bWithInitCheck true означает с результатом выполнить еще initCheck
     * @return {function}
     */
    _bind(fnMethod: Function, bWithInitCheck: boolean): Function;
    /**
     * проверка самого Box
     * @return void
     */
    _selfCheck(): void;
    /**
     * по названию свойства понять, нужно ли делать check
     * @param {string} sPropName
     * @return {boolean}
     */
    _isNeedCheck(sPropName: string): boolean;
    /**
     * по названию свойства понять, функция это или нет
     * @param {string} sPropName
     * @return {boolean}
     */
    _isFn(sPropName: string): boolean;
}
