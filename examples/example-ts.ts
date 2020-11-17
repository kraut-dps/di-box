import {Box} from "di-box";
import {IService, IServiceConstructor, IApp, IAppConstructor} from "./interfaces";

class Service implements IService {
	work() {
		console.log( 'call service work method' );
	}
}

class App implements IApp {
	constructor( public oneService: () => IService ) {
	}

	main() {
		this.oneService().work();
	}
}

class AppBox extends Box {
	constructor(
		public Service: IServiceConstructor,
		public App: IAppConstructor
	) {
		super( { bNeedSelfCheck: false, sNeedCheckPrefix: null } );
	}

	newService() {
		return new this.Service();
	}

	oneService() {
		return this.one( this.newService );
	}

	newApp() {
		return new this.App( this.oneService );
	}
}

const oBox = new AppBox( Service, App );
const oApp = oBox.newApp();
oApp.main();