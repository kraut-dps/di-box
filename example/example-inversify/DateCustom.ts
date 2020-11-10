import {decorate, injectable} from "inversify";
import {DateCustom as DateCustomOrigin} from "../classesTs/DateCustom";

decorate(injectable(), DateCustomOrigin);
export class DateCustom extends DateCustomOrigin{}