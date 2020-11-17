/**
 * @typedef {{ bNeedSelfCheck?: boolean, sNeedCheckPrefix?: string?, sProtectedPrefix?: string? }} IOpts
 */
/**
 * коробка конструкторов
 * при инициализации автоматически делает bind( this ) всех свойств-функций
 * если свойство начинается на "new*", дополнительно вызывает проверку результата, все свойства должны быть !== undefined
 * имеет вспомогательный метод one() для организации singleton/service экземпляров
 * для работы метода one, требуется WeakMap
 */
export class Box {
    /**
     * oOpts.bNeedSelfCheck - нужно ли проверять сам Box на свойства undefined
     * oOpts.sNeedCheckPrefix - возвращаемые значения методов с этим префиксом будут проверяться на undefined
     * oOpts.sProtectedPrefix - особый префикс, при его наличии проверка на undefined пропускается
     * @param {IOpts|null} oOpts
     */
    constructor(oOpts?: IOpts | null);
    /**
     * @type {string|null}
     */
    _sNeedCheckPrefix: string | null;
    /**
     * @type {string|null}
     */
    _sProtectedPrefix: string | null;
    /**
     * @type {boolean} была уже проверка самого Box?
     */
    _bNeedSelfCheck: boolean;
    /**
     * @type {boolean} один раз пропустить проверку
     */
    _bSkipCheck: boolean;
    /**
     * @type {WeakMap} синглетонов
     */
    _oOne: WeakMap<any, any>;
    /**
     * метод по функции создания нового объекта, создает его и кеширует
     * @param {function} fnNew
     * @return {any}
     */
    one(fnNew: Function): any;
    /**
     * пройтись по публичным свойствам объекта, Error если хоть один undefined
     * @param {object} oObj
     * @param {string|null} sProtectedPrefix
     */
    initCheck(oObj: object, sProtectedPrefix?: string | null): void;
    /**
     * возможность пропустить следующую проверку initCheck
     */
    skipCheck(): void;
    /**
     * сбросить все уже созданные синглетоны
     */
    reset(): void;
    /**
     * автоустановка this контекста во все методы объекта
     * для методов new*, проверяет чтобы ни одно публичное свойство не содержало undefined
     */
    _autoBind(): void;
    /**
     * привязка к методу контекста this
     * @param {function} fnMethod
     * @param {boolean} bWithInitCheck true означает с результатом выполнить еще initCheck
     * @return {function}
     */
    _bind(fnMethod: Function, bWithInitCheck: boolean): Function;
    /**
     * проверка самого Box
     * @return void
     */
    _selfCheck(): void;
    /**
     * по названию свойства понять, нужно ли делать check
     * @param {string} sPropName
     * @return {boolean}
     */
    _isNeedCheck(sPropName: string): boolean;
    /**
     * по названию свойства понять, функция это или нет
     * @param {string} sPropName
     * @return {boolean}
     */
    _isFn(sPropName: string): boolean;
}
export type IOpts = {
    bNeedSelfCheck?: boolean;
    sNeedCheckPrefix?: string | null;
    sProtectedPrefix?: string | null;
};
