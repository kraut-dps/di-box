import {IApp,ICase, IVars} from "./classesBase/interfaces";

//declare var oVars: IVars;

export function fnCases(
    fnBuildApp: ( oCase: ICase ) => IApp,
    oVars: IVars
): void;