import { Float } from "./Number";
import { Var } from "./Variable";

export type StringVector2 = Var | [Float | string, Float | string];
export type StringVector3 = Var | [Float | string, Float | string, Float | string];
export type StringVector4 = Var | [Float | string, Float | string, Float | string, Float | string];

export type StringVector = StringVector2 | StringVector3 | StringVector4;