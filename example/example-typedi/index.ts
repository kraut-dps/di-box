import {Container, Inject, Service} from "typedi";
import "reflect-metadata";
import {IDate, IStorage, IApp, IConfig, ICase} from '../classesBase/interfaces.ts';

import {fnCases} from "../cases.js";

import {App} from "../classesTypeScript/App.ts";
import oConfig from "../classesBase/configBase.js";
import oConfigCustom from "../classesBase/configCustom.js";
import {Date} from "../classesTypeScript/Date.ts";
import {DateCustom} from "../classesTypeScript/DateCustom.ts";
import {Storage} from "../classesTypeScript/Storage.ts";
import {StorageCustom} from "../classesTypeScript/StorageCustom.ts";
import {interfaces} from "inversify/dts/interfaces/interfaces";


const fnBuildApp = ( { oConfig, App, Date, Storage } : ICase ) => {

    interface INewDate {
        ( iDate: number): IDate;
    }

    /*const INewDate = Service(( iDate: number ) => {
        const oDate = new Date( iDate );
        oDate.sLocale = oConfig.sDateLocale;
        oDate.oOptions = { timeZone: 'Australia/Sydney' };//oConfig.oDateOptions;
        return oDate;
    });*/

    let fnNewDate: INewDate = ( iDate: number ) => {
        const oDate = new Date( iDate );
        oDate.sLocale = oConfig.sDateLocale;
        oDate.oOptions = { timeZone: 'Australia/Sydney' };//oConfig.oDateOptions;
        return oDate;
    };

    const newStorage = () => {
        return new Storage( oConfig.sStorageConnect );
    }
    @Service({ factory: newStorage })
    class StorageEnd extends Storage {}

    @Service()
    class AppEnd extends App {
        constructor( @Inject() newDate: INewDate, @Inject() oStorageEnd: StorageEnd ) {
            super( () => oStorageEnd, newDate );
        }
    }
    return Container.get(AppEnd);
}


fnCases( fnBuildApp, { oConfig, oConfigCustom, App, Date, DateCustom, Storage, StorageCustom } );

