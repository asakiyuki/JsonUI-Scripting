import { RangeVector3, RangeVector4 } from "./RangeVector";
import { Var } from "./Variable";

export type ColorHeximal = `#${string}`;
export type ColorVector3 = Var | [ColorHeximal] | RangeVector3;
export type ColorVector4 = Var | [ColorHeximal] | RangeVector4;

export type ColorVector = ColorVector3 | ColorVector4;
