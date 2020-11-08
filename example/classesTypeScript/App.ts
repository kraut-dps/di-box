import {AppBase} from "../classesBase/AppBase.js";
import {IStorage, IDate} from '../classesBase/interfaces';

export class App extends AppBase {
    constructor( protected oneStorage: () => IStorage, protected newDate: (iDate: number) => IDate ) {
        super();
    }
}