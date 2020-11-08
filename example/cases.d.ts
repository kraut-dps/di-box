import {IApp,ICase, IVars} from "./classesBase/interfaces.ts";

//declare var oVars: IVars;

export function fnCases(
    fnBuildApp: ( oCase: ICase ) => IApp,
    oVars: IVars
): void;