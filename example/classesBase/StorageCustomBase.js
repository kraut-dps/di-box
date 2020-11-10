import {StorageBase} from "./StorageBase.js";

export class StorageCustomBase extends StorageBase{
	insert( sData ) {
		console.log( `StorageCustom: insert into ${this._sConnect}: ${sData}` );
	}
}