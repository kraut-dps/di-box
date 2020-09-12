import {Box} from "di-box";

export class OtherBox extends Box {

	Output;

	newOutput() {
		return new this.Output();
	}

	oneOutput() {
		return this.one( this.newOutput );
	}
}