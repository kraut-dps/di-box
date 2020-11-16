# di-box
Легкий вариант реализации [внедрения зависимости](https://ru.wikipedia.org/wiki/%D0%92%D0%BD%D0%B5%D0%B4%D1%80%D0%B5%D0%BD%D0%B8%D0%B5_%D0%B7%D0%B0%D0%B2%D0%B8%D1%81%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D0%B8) ( Dependency injection ).

Пример использования:

```javascript
import {Box} from "di-box";

class Service {
    work() {}
}

class App {
    oneService;
    main() {
        this.oneService().work();
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

[Запустить в Codesandbox](https://codesandbox.io/s/github/kraut-dps/di-box/tree/0.2.0/examples/?file=/example-js.js)
( версии js и ts с интерфейсами )

По умолчанию автоматически проходит по всем свойствам объекта Box и
вызывает ошибку, если хоть одно свойство undefined, предыдущий пример:

```javascript
...

    const oBox = new AppBox();
    oBox.Service = Service;
    //oBox.App = App;
    const oApp = oBox.newApp(); // будет ошибка di-box App is undefined
...
```

Можно убрать эту проверку:
```javascript
...
    const oBox = new AppBox( { bNeedSelfCheck: false } );
...
```

Таким же образом по умолчанию проверяет все объекты, возвращаемые функциями с префиксом "new":

```javascript
...
    newApp() {
        const oApp = new this.App();
        //oApp.oneService = this.oneService;
        return oApp; // будет ошибка di-box oneService is undefined 
    }
...
```

Можно убрать эту проверку:
```javascript
...
const oBox = new AppBox( { sNeedCheckPrefix: null } );
...
```

Пропуск проверки в конкретном случае:
```javascript
...
	newXhr() {
		this.skipCheck();
		return new XMLHttpRequest();
	}
...
```

Сброс созданных синглетонов/сервисов:
```javascript
...
oBox.reset();
...
```

## Blackboxing
При отладке, может очень мешать заход в библиотеку.
Поможет специальный инструмент blackbox.

[Для Chrome](https://developer.chrome.com/devtools/docs/blackboxing)

[Для Firefox](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Ignore_a_source)   

## Сделано с душой ❤️

Буду рад, если пакет будет полезен.

Поставьте github ⭐ - добавьте энергии автору для развития и поддержки.

