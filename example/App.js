export class App {

	oneOutput;
	newDate;

	main( iDate ) {
		const oDate = this.newDate( iDate );
		this.oneOutput().echo( JSON.stringify( iDate ) + ' = ' + oDate.format() );
	}
}