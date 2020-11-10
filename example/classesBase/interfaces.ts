export interface IDate {
    format(): string;
}
export interface IDateOptions {
    timeZone: string;
}
export interface IDateInit extends IDate{
    sLocale: string;
    oOptions: IDateOptions;
}
export interface IDateConstructor {
    new( iDate: number ): IDateInit;
}

export interface IStorage {
    insert( sData: string ): void;
}
export interface IStorageConstructor {
    new( sConnect: string ): IStorage;
}

export interface IApp {
   main( iDate1: number, iDate2: number ): void;
}

export interface IAppConstructor {
    new( ...args: any[] ): IApp;
}

export interface IConfig {
    sStorageConnect: string,
    sDateLocale: string,
    oDateOptions: IDateOptions
}

export interface ICase {
    oConfig: IConfig,
    App: IAppConstructor,
    Date: IDateConstructor,
    Storage: IStorageConstructor
}
export interface IVars {
    oConfig: IConfig,
    oConfigCustom: IConfig,
    App: IAppConstructor,
    Date: IDateConstructor,
    DateCustom: IDateConstructor,
    Storage: IStorageConstructor,
    StorageCustom: IStorageConstructor
}

export type Newable<T> = { new (...args: any[]): T; };