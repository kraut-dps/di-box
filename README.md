# di-box
Легкий вариант реализации [внедрения зависимости](https://ru.wikipedia.org/wiki/%D0%92%D0%BD%D0%B5%D0%B4%D1%80%D0%B5%D0%BD%D0%B8%D0%B5_%D0%B7%D0%B0%D0%B2%D0%B8%D1%81%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D0%B8) ( Dependency injection ).

Пример использования:

```javascript
import {Box} from "di-box";

class Service {
	method() {}
}

class App {
	oneService;
	main() {
		this.oneService().method();
	}
}

class AppBox extends Box {

	App;
	Service;

	newService() {
		return new this.Service();
	}

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
```