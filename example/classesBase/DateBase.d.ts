import {IDateInit, IDateOptions} from "./interfaces";

export class DateBase implements IDateInit{
	constructor(iDate: number);

	sLocale: string;
	oOptions: IDateOptions;

	format(): string;
}