/**
 * коробка конструкторов
 * при инициализации автоматически делает bind( this ) всех свойств-функций
 * если свойство начинается на "new*", дополнительно вызывает проверку результата, все свойства должны быть !== undefined
 * имеет вспомогательный метод one для организации singleton/service экземпляров
 * для работы метода one, требуется WeakMap
 */
export class Box{

	/**
	 * @type {WeakMap} синглетонов
	 */
	_oOne;

	constructor() {
		this._autoBind();
	}

	/**
	 * метод по функции создания нового объекта, создает его и кеширует
	 * @param {function} fnNew
	 * @return {object}
	 */
	one( fnNew ) {
		// не в конструкторе, потому что к моменту вызова конструктора может не быть
		// полифила WeakMap
		if( !this._oOne ) {
			this._oOne = new WeakMap();
		}

		if( this._oOne.has( fnNew ) ) {
			return this._oOne.get( fnNew );
		} else {
			const oObj = fnNew.call( this );
			this._oOne.set( fnNew, oObj );
			return oObj;
		}
	}

	/**
	 * автоустановка this контекста во все методы объекта
	 * для методов new*, проверяет чтобы ни одно публичное свойство не содержало undefined
	 */
	_autoBind() {
		let oObj = this;
		do {
			// проходимся по всем потомкам, до Box
			if( Box === oObj.constructor ) {
				break;
			}

			// проходимся по всем свойствам, и находим функции
			const aProps = Object.getOwnPropertyNames( oObj );
			for( let i = 0; i < aProps.length; i++ ) {
				let sPropName = aProps[ i ];

				if( !this._isFn( sPropName ) ) {
					continue;
				}

				// если свойство функция, и начинается с new... , добавляем в просто bind this
				// проверку, что все свйойства не undefined
				this[ sPropName ] = this._bind( this[ sPropName ], this._isBuilder( sPropName ) );
			}
		} while ( ( oObj = Object.getPrototypeOf( oObj ) ) );
	}

	/**
	 * привязка к методу контекста this
	 * @param {function} fnMethod
	 * @param {boolean} bWithInitCheck true означает с результатом выполнить еще _initCheck
	 * @return {function}
	 */
	_bind( fnMethod, bWithInitCheck ) {
		if( bWithInitCheck ) {
			return ( ...aArgs ) => {
				const oNewObj = fnMethod.call( this, ...aArgs );
				this._initCheck( oNewObj );
				return oNewObj;
			};
		} else {
			return fnMethod.bind( this );
		}
	}

	/**
	 * пройтись по публичным свойствам объекта, Error если хоть один undefined
	 * @param oObj
	 */
	_initCheck( oObj ) {

		for( let sPropName in oObj ) {

			// is protected prop
			if( sPropName.substring( 0, 1 ) === '_' ) {
				continue;
			}

			if( typeof oObj[ sPropName ] !== 'undefined' ) {
				continue;
			}

			throw new Error( '"' + oObj.constructor.name + '.' + sPropName + '" object property value  is undefined' );
		}
	}

	/**
	 * по названию свойства понять, билдер это или нет?
	 * @param {string} sPropName
	 * @return {boolean}
	 */
	_isBuilder( sPropName ) {
		return sPropName.indexOf( 'new' ) === 0;
	}

	_isFn( sPropName ) {
		return typeof this[ sPropName ] === 'function' && sPropName !== 'constructor';
	}
}