import {Box} from "./Box.js";

/**
 * коробка коробок
 * имеет дополнительный метод box, который по массиву конфигураций вернет singleton Box объект
 */
export class RootBox extends Box {

	/**
	 * @type {Object.<string, object>} объект для хранения зависимостей
	 */
	oOpts = {};

	/**
	 * @type {Object.<string, Box>} объект хранения коробок
	 */
	_oOne = {};

	constructor( oOpts ) {
		super();
		this.oOpts = oOpts;
	}

	box( sName ) {
		if ( !this._oOne[sName] ) {
			const { _Box, _fnRel, ...oDeps } = this.oOpts[sName];

			if( typeof _Box === 'undefined' ) {
				throw new Error( sName + '._Box prop required' );
			}

			const oBox = new _Box();

			Object.assign( oBox, oDeps );

			if( _fnRel ) {
				_fnRel( this, oBox );
			}

			this._initCheck( oBox );

			this._oOne[sName] = oBox;
		}
		return this._oOne[sName];
	}
}