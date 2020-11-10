import {IStorage} from "./interfaces";

export class StorageBase implements IStorage{
	insert( sData: string ): void;
}