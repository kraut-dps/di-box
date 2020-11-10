import {decorate, injectable} from "inversify";
import {Storage as StorageOrigin} from "../classesTs/Storage";

decorate(injectable(), StorageOrigin);
export class Storage extends StorageOrigin{}