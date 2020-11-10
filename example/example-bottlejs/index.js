import Bottle from "bottlejs";

import {App} from "../classesJs/App.js";

import {Date} from "../classesJs/Date.js";
import {DateCustom} from "../classesJs/DateCustom.js";

import {Storage} from "../classesJs/Storage.js";
import {StorageCustom} from "../classesJs/StorageCustom.js";

import oConfig from "../classesBase/configBase.js";
import oConfigCustom from "../classesBase/configCustom.js";

import {fnCases} from "../cases.js";

const fnBuildApp = ( { oConfig, App, Date, Storage } ) => {

	const oBottle = new Bottle();

	// непонятно, как вызывать bottle.container.App.newDate.instance() с аргументом
	//oBottle.instanceFactory('App.newDate', ( iDate ) => {
	//	const oDate = new Date( iDate );
	//	oDate.sLocale = oConfig.sDateLocale;
	//	oDate.oOptions = oConfig.oDateOptions;
	//	return oDate;
	//} );


	oBottle.constant('newDate', ( iDate ) => {
		const oDate = new Date( iDate );
		oDate.sLocale = oConfig.sDateLocale;
		oDate.oOptions = oConfig.oDateOptions;
		return oDate;
	} );

	oBottle.constant('oneStorage', () => {
		return new Storage( oConfig.sStorageConnect );
	} );

	oBottle.service( 'App', App, 'oneStorage', 'newDate' );
	return oBottle.container.App;
}

fnCases( fnBuildApp, { oConfig, oConfigCustom, App, Date, DateCustom, Storage, StorageCustom } );