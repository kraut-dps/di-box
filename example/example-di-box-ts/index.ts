import {Box} from "di-box";

import {IAppConstructor, IDateConstructor, IStorageConstructor, IConfig, ICase} from "../classesBase/interfaces";

import {App} from "../classesTs/App";

import {Date} from "../classesTs/Date";
import {DateCustom} from "../classesTs/DateCustom";

import {Storage} from "../classesTs/Storage";
import {StorageCustom} from "../classesTs/StorageCustom";

import oConfig from "../classesBase/configBase.js";
import oConfigCustom from "../classesBase/configCustom.js";

import {fnCases} from "../cases.js";

const fnBuildApp = ( { oConfig, App, Date, Storage }: ICase ) => {

	class AppBox extends Box {
		constructor(
			public App: IAppConstructor,
			public Date: IDateConstructor,
			public Storage: IStorageConstructor,
			public oConfig: IConfig
		) {
			super();
		}

		newApp() {
			return new this.App(
				this.oneStorage,
				this.newDate
			);
		}

		newStorage() {
			return new this.Storage(
				this.oConfig.sStorageConnect
			);
		}

		oneStorage() {
			return this.one( this.newStorage );
		}

		newDate( iDate: number ) {
			const oDate = new this.Date( iDate );
			oDate.sLocale = this.oConfig.sDateLocale;
			oDate.oOptions = this.oConfig.oDateOptions;
			return oDate;
		}
	}

	const oBox = new AppBox(
		App, Date, Storage, oConfig
	);
	return oBox.newApp();
}

fnCases( fnBuildApp, { oConfig, oConfigCustom, App, Date, DateCustom, Storage, StorageCustom } );