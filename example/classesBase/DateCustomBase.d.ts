import {IDateInit, IDateOptions} from "./interfaces";

export class DateCustomBase implements IDateInit{
	constructor(iDate: number);

	sLocale: string;
	oOptions: IDateOptions;

	format(): string;
}