import {decorate, injectable} from "inversify";
import {Storage as StorageOrigin} from "../classesTypeScript/Storage";

decorate(injectable(), StorageOrigin);
export class Storage extends StorageOrigin{}