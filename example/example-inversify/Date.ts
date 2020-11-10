import {decorate, injectable} from "inversify";
import {Date as DateOrigin} from "../classesTs/Date";

decorate(injectable(), DateOrigin);
export class Date extends DateOrigin{}