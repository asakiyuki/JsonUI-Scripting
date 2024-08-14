import { RangeFloat } from "./Number";
import { Var } from "./Variable";

export type RangeVector3 = Var | [RangeFloat, RangeFloat, RangeFloat];
export type RangeVector4 = Var | [RangeFloat, RangeFloat, RangeFloat, RangeFloat];

export type RangeVector = RangeVector3 | RangeVector4;