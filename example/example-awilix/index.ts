import {createContainer, InjectionMode, asFunction} from "awilix";
import "reflect-metadata";
import {IDate, IStorage, IApp, IConfig, ICase, IAppConstructor} from '../classesBase/interfaces.ts';

import {fnCases} from "../cases.js";

import {App} from "../classesTypeScript/App.ts";
import oConfig from "../classesBase/configBase.js";
import oConfigCustom from "../classesBase/configCustom.js";
import {Date} from "../classesTypeScript/Date.ts";
import {DateCustom} from "../classesTypeScript/DateCustom.ts";
import {Storage} from "../classesTypeScript/Storage.ts";
import {StorageCustom} from "../classesTypeScript/StorageCustom.ts";

const fnBuildApp = ( { oConfig, App, Date, Storage } : ICase ) => {

    const oContainer = createContainer({
        injectionMode: InjectionMode.PROXY
    } );
    const t = Date;
    oContainer.register({
        newApp: asFunction( ( { oneStorage, newDate } ) => {
            return new App( oneStorage, newDate );
        } ),
        newDate: asFunction( ( iDate: number ) => {
            const oDate = new t( iDate );
            oDate.sLocale = oConfig.sDateLocale;
            oDate.oOptions = oConfig.oDateOptions;
            return oDate;
        } ),
        oneStorage: asFunction( () => {
            return new Storage( oConfig.sStorageConnect );
        } ).singleton()
    } );

    const fnNewApp: () => IApp = oContainer.resolve( 'newApp' );
    return fnNewApp();
}


fnCases( fnBuildApp, { oConfig, oConfigCustom, App, Date, DateCustom, Storage, StorageCustom } );
