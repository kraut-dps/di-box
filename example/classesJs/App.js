import {AppBase} from "../classesBase/AppBase.js";

export class App extends AppBase {
	constructor( oneStorage, newDate ) {
		super();
		this.oneStorage = oneStorage;
		this.newDate = newDate;
	}
}