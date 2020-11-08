import {decorate, injectable} from "inversify";
import {StorageCustom as StorageCustomOrigin} from "../classesTypeScript/StorageCustom";

decorate(injectable(), StorageCustomOrigin);
export class StorageCustom extends StorageCustomOrigin{}