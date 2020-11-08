export const fnCases = (
	fnBuildApp,
	{
		oConfig,
		oConfigCustom,
		App,
		Date,
		DateCustom,
		Storage,
		StorageCustom
	} ) => {
	const aCases = [
		{
			sName: 'base deps',
			oConfig: oConfig,
			App: App,
			Date: Date,
			Storage: Storage
		},
		{
			sName: 'DateCustom',
			oConfig: oConfig,
			App: App,
			Date: DateCustom,
			Storage: Storage
		},
		{
			sName: 'StorageCustom',
			oConfig: oConfig,
			App: App,
			Date: Date,
			Storage: StorageCustom
		},
		{
			sName: 'ConfigCustom',
			oConfig: oConfigCustom,
			App: App,
			Date: Date,
			Storage: Storage
		},
	];

	aCases.forEach( ( {
		sName,
		oConfig,
		App,
		Date,
		Storage
	} ) => {
		console.log( '___' + sName + '___' );
		const oApp = fnBuildApp( { oConfig, App, Date, Storage } );
		oApp.main( 0, Date.now() );
	} );
}

