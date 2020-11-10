import "reflect-metadata";
import {container, inject, injectable, registry} from 'tsyringe';
import {IDate, IStorage, IApp, IConfig, ICase, IAppConstructor} from '../classesBase/interfaces.ts';

import {fnCases} from "../cases.js";

import {App} from "../classesTs/App.ts";
import oConfig from "../classesBase/configBase.js";
import oConfigCustom from "../classesBase/configCustom.js";
import {Date} from "../classesTs/Date.ts";
import {DateCustom} from "../classesTs/DateCustom.ts";
import {Storage} from "../classesTs/Storage.ts";
import {StorageCustom} from "../classesTs/StorageCustom.ts";

const fnBuildApp = ( { oConfig, App, Date, Storage } : ICase ) => {

    @injectable()
    @registry([
        { token: "oConfig", useValue: oConfig },
        { token: "newDate", useValue: () => {
                const oConfig = container.resolve<IConfig>( 'oConfig' );
                const oDate = new Date( 4 );
                oDate.sLocale = oConfig.sDateLocale;
                oDate.oOptions = oConfig.oDateOptions;
                return oDate;
            } },
        { token: "oneStorage", useValue: () => {
                const oConfig = container.resolve<IConfig>( 'oConfig' );
                return new Storage( oConfig.sStorageConnect );
            } },
        { token: "App", useClass: AppYo },
    ] )
    class AppYo extends App{
        constructor(
            @inject("oneStorage") private oneStorage: () => IStorage,
            @inject("newDate") private newDate: ( iDate: number ) => IDate
       ) {
            super( oneStorage, newDate );
        }
    }

    return container.resolve( AppYo );

}

fnCases( fnBuildApp, { oConfig, oConfigCustom, App, Date, DateCustom, Storage, StorageCustom } );

