import {RootBox} from "di-box";
import {AppBox} from "./AppBox.js";
import {OtherBox} from "./OtherBox.js";
import {DateBase} from "./DateBase.js";
import {OutputConsole} from "./OutputConsole.js";
import {App} from "./App.js";
import {Config} from "./Config.js";

const fnCase = function( sCaseName, oDeps ) {
	console.log( '___' + sCaseName + '___' );
	const oRootBox = new RootBox( oDeps );
	const oApp = oRootBox.box( 'main' ).newApp();
	oApp.main( 0 );
	oApp.main( Date.now() );
}

fnCase( 'base deps', {
	main: {
		_Box: AppBox,
		App: App,
		Config: Config,
		Date: DateBase,
		Output: OutputConsole
	}
} );


class DateCustom extends DateBase {
	format() {
		return '42';
	}
}
fnCase( "DateCustom", {
	main: {
		_Box: AppBox,
		App: App,
		Config: Config,
		Date: DateCustom,
		Output: OutputConsole
	}
} );

class ConfigCustom extends Config {
	sDateLocale = 'ru';
	oDateOptions = {
		timezone: 'Europe/Moscow'
	};
}
fnCase( 'ConfigCustom', {
	main: {
		_Box: AppBox,
		App: App,
		Config: ConfigCustom,
		Date: DateBase,
		Output: OutputConsole
	}
} );

class OutputCustom {
	echo( sMessage ) {
		console.log( "#".repeat( sMessage.length + 2 ) );
		console.log( "#" + sMessage + '#' );
		console.log( "#".repeat( sMessage.length + 2 ) );
	}
}
fnCase( "OutputCustom from OtherBox", {
	main: {
		_Box: AppBox,
		App: App,
		Config: Config,
		Date: DateBase,
		Output: OutputConsole,
		_fnRel: ( oRootBox, oBox ) => {
			oBox.oneOutput = oRootBox.box( 'other' ).oneOutput;
		}
	},
	other: {
		_Box: OtherBox,
		Output: OutputCustom
	}
} );