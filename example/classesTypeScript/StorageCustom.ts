import {StorageCustomBase} from "../classesBase/StorageCustomBase.js";

export class StorageCustom extends StorageCustomBase {
    constructor( protected sConnect: string ) {
        super( sConnect );
    }
}