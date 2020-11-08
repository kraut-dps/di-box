import {interfaces, Container} from "inversify";
import "reflect-metadata";

import {fnCases} from "../cases.js";

import {IDate, IStorage, IApp, ICase, IConfig} from '../classesBase/interfaces';
import oConfig from "../classesBase/configBase.js";
import oConfigCustom from "../classesBase/configCustom.js";
import {Date} from "./Date";
import {DateCustom} from "./DateCustom";
import {Storage} from "./Storage";
import {StorageCustom} from "./StorageCustom";
import {App} from "./App";

const fnBuildApp = ( {oConfig, App, Date, Storage}: ICase ) => {

	const oContainer = new Container();
	oContainer.bind<IConfig>( "oConfig" ).toConstantValue( oConfig );

	oContainer.bind<interfaces.Newable<IDate>>( "Newable<IDate>" )
		.toConstructor<IDate>( Date );

	oContainer.bind<interfaces.Factory<IDate>>( "newDate" )
		.toFactory<IDate>( ( context: interfaces.Context ) => {
			return ( iDate ) => {
				const Date = context.container.get<interfaces.Newable<IDate>>( "Newable<IDate>" );
				const oDateBase = new Date( iDate );
				const oConfig = context.container.get<IConfig>( "oConfig" );
				oDateBase.sLocale = oConfig.sDateLocale;
				oDateBase.oOptions = oConfig.oDateOptions;
				return oDateBase;
			};
		} );

	oContainer.bind<interfaces.Factory<IStorage>>( "oneStorage" )
		.toFactory<IStorage>( ( oContext: interfaces.Context ) => {
			return () => {
				return oContext.container.get<IStorage>( "Storage" );
			};
		} );

	oContainer.bind<IStorage>( "Storage" )
		.toDynamicValue( ( context: interfaces.Context ) => {
			const oConfig = context.container.get<IConfig>( "oConfig" );
			return new Storage( oConfig.sStorageConnect );
		} );

	oContainer.bind<IApp>( "App" ).to( App );

	return oContainer.get<IApp>( "App" );
}

fnCases( fnBuildApp, {oConfig, oConfigCustom, App, Date, DateCustom, Storage, StorageCustom} );