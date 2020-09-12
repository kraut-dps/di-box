import {Box} from "di-box";

export class AppBox extends Box {

	App;
	Date;
	Output;
	Config;

	newApp() {
		const oApp = new this.App();
		oApp.newDate = this.newDate;
		oApp.oneOutput = this.oneOutput;
		return oApp;
	}

	newConfig() {
		return new this.Config();
	}

	oneConfig() {
		return this.one( this.newConfig );
	}

	newOutput() {
		return new this.Output();
	}

	oneOutput() {
		return this.one( this.newOutput );
	}

	newDate( iDate ) {
		const oDate = new this.Date( iDate );
		const oConfig = this.oneConfig();
		oDate.sLocale = oConfig.sDateLocale;
		oDate.oOptions = oConfig.oDateOptions;
		return oDate;
	}
}