import {RelType} from "./RelType.js";

export function fnRel( sBox, sMethod = null ) {
	const oRel = new RelType();
	oRel.sBox = sBox;
	oRel.sMethod = sMethod
	return oRel;
}