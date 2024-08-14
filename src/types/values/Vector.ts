import { Var } from "./Variable";

export type Vector2 = Var | [number, number];
export type Vector3 = Var | [number, number, number];
export type Vector4 = Var | [number, number, number, number];

export type Vector = Vector2 | Vector3 | Vector4;