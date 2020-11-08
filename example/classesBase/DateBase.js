export class DateBase extends Date{

	sLocale = 'en';
	oOptions = {
		timeZone: 'UTC'
	};

	format() {
		return this.toLocaleString( this.sLocale, this.oOptions );
	}
}