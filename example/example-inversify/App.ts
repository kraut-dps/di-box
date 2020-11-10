import {decorate, inject, injectable} from "inversify";
import {IApp, IDate, IStorage} from "../classesBase/interfaces";
import {App as AppOrigin} from "../classesTs/App";
decorate(injectable(), AppOrigin);

@injectable()
export class App extends AppOrigin implements IApp {
    public constructor(
        @inject("newDate") public newDate: ( iDate: number ) => IDate,
        @inject("oneStorage") public oneStorage: () => IStorage
    ) {
        super( oneStorage, newDate );
    }
}