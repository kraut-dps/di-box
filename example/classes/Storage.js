import {StorageBase} from "../classesBase/StorageBase.js";

export class Storage extends StorageBase {
	constructor( sConnect ) {
		super();
		this.sConnect = sConnect;
	}
}