interface IDate {
    sLocale: string;
    oOptions: object;
    format(): string;
}
interface IDateConstructor {
    new( iDate: number ): IDate;
}

interface IStorage {
    insert( sData: string ): void;
}
interface IStorageConstructor {
    new( sConnect: string ): IStorage;
}

interface IApp {
   main( iDate1: number, iDate2: number ): void;
}
interface IAppConstructor {
    new( ...args: any[] ): IApp;
}

interface IDateOptions {
    timeZone: string;
}
interface IConfig {
    sStorageConnect: string,
    sDateLocale: string,
    oDateOptions: IDateOptions
}

interface ICase {
    oConfig: IConfig,
    App: IAppConstructor,
    Date: IDateConstructor,
    Storage: IStorageConstructor
}
interface IVars {
    oConfig: IConfig,
    oConfigCustom: IConfig,
    App: IAppConstructor,
    Date: IDateConstructor,
    DateCustom: IDateConstructor,
    Storage: IStorageConstructor,
    StorageCustom: IStorageConstructor
}

export { IApp, IAppConstructor, IDate, IDateConstructor, IConfig, IDateOptions, IStorage, IStorageConstructor, ICase, IVars };
export type Newable<T> = { new (...args: any[]): T; };