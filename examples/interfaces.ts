export interface IService {
	work(): void;
}
export interface IServiceConstructor {
	// тут any, потому что используется и в js и ts версии
	new(...args: any[]): IService;
}
export interface IApp {
	main(): void;
}
export interface IAppInit extends IApp{
	oneService(): IService;
}
export interface IAppConstructor {
	// тут any, потому что используется и в js и ts версии
	new(...args: any[]): IAppInit;
}