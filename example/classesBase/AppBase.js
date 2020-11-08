export class AppBase {

	/**
	 * @type {function():IStorage}
	 */
	oneStorage;

	/**
	 * @type {function( number ):IDate}
	 */
	newDate;

	main( iDate1, iDate2 ) {

		const oDate1 = this.newDate( iDate1 );
		this.oneStorage().insert( oDate1.format() );

		const oDate2 = this.newDate( iDate2 );
		this.oneStorage().insert( oDate2.format() );

	}
}