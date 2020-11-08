import {Container, createResolve} from "@owja/ioc";

import {fnCases} from "../cases.js";

import {IDate, IStorage, IApp, ICase, IConfig, Newable} from '../classesBase/interfaces';


import {TYPE} from "./types";

import oConfig from "../classesBase/configBase.js";
import oConfigCustom from "../classesBase/configCustom.js";
import {Date} from "../classesTypeScript/Date";
import {DateCustom} from "../classesTypeScript/DateCustom";
import {Storage} from "../classesTypeScript/Storage";
import {StorageCustom} from "../classesTypeScript/StorageCustom";
import {App} from "../classesTypeScript/App";

const fnBuildApp = ( {oConfig, App, Date, Storage}: ICase ) => {

	const oContainer = new Container();

	oContainer.bind<IConfig>( TYPE.oConfig ).toValue( oConfig );
	oContainer.bind<Newable<IDate>>( TYPE.Date ).toValue( Date );
	oContainer.bind<Newable<IStorage>>( TYPE.Storage ).toValue( Storage );


	// странный момент, ожидаешь что это надо писать где то в App.ts,
	// но тогда в нем нужна ссылка на oContainer, как это сделать не очень понятно
	const resolve = createResolve( oContainer );
	class AppInjected extends App {
		newDate = resolve<(iDate: number) => IDate>(TYPE.newDate);
		oneStorage = resolve<() => IStorage>(TYPE.oneStorage);
	}

	oContainer.bind<IApp>( TYPE.App ).to( AppInjected );

	oContainer.bind<(iDate: number) => IDate>( TYPE.newDate ).toFactory( () => {
		return ( iDate ) => {
			const Date = oContainer.get<Newable<IDate>>( TYPE.Date );
			const oDate = new Date( iDate );
			const oConfig = oContainer.get<IConfig>( TYPE.oConfig );
			oDate.sLocale = oConfig.sDateLocale;
			oDate.oOptions = oConfig.oDateOptions;
			return oDate;
		};
	} );

	oContainer.bind<() => IStorage>( TYPE.oneStorage ).toFactory(
		() => {
			return () => {
				const oConfig = oContainer.get<IConfig>( TYPE.oConfig );
				const Storage = oContainer.get<Newable<IStorage>>( TYPE.Storage );
				return new Storage( oConfig.sStorageConnect );
			};
		} );


	return oContainer.get<IApp>( TYPE.App );
}

fnCases( fnBuildApp, {oConfig, oConfigCustom, App, Date, DateCustom, Storage, StorageCustom} );