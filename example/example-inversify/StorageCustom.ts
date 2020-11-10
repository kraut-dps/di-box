import {decorate, injectable} from "inversify";
import {StorageCustom as StorageCustomOrigin} from "../classesTs/StorageCustom";

decorate(injectable(), StorageCustomOrigin);
export class StorageCustom extends StorageCustomOrigin{}