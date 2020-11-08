import {StorageBase} from "../classesBase/StorageBase.js";

export class Storage extends StorageBase {
    constructor( protected sConnect: string ) {
        super();
    }
}