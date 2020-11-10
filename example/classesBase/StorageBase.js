export class StorageBase {
	_sConnect;

	constructor ( sConnect ) {
		this._sConnect = sConnect;
	}

	insert( sData ) {
		console.log( `StorageBase: insert into ${this._sConnect}: ${sData}` );
	}
}