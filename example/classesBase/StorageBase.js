export class StorageBase {
	sConnect;

	insert( sData ) {
		console.log( `StorageBase: insert into ${this.sConnect}: ${sData}` );
	}
}