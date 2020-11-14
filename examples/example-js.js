/**
 * @typedef {import('./interfaces').IService} IService
 * @typedef {import('./interfaces').IServiceConstructor} IServiceConstructor
 * @typedef {import('./interfaces').IApp} IApp
 * @typedef {import('./interfaces').IAppConstructor} IAppConstructor
 */
import {Box} from "di-box";

/**
 * @implements IService
 */
class Service {
  work() {
    console.log( 'call service work method' );
  }
}

/**
 * @implements IApp
 */
class App {

  /**
   * @type {function():IService}
   */
  oneService;

  main() {
    this.oneService().work();
  }
}

class AppBox extends Box {

  /**
   * @type IAppConstructor
   */
  App;

  /**
   * @type IServiceConstructor
   */
  Service;

  newService() {
    return new this.Service();
  }

  /**
   * @return {IService}
   */
  oneService() {
    return this.one( this.newService );
  }

  newApp() {
    const oApp = new this.App();
    oApp.oneService = this.oneService;
    return oApp;
  }
}

const oBox = new AppBox();
oBox.Service = Service;
oBox.App = App;

const oApp = oBox.newApp();
oApp.main();