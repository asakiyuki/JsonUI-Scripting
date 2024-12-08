import { Var } from "./Variable";

export type Vector2 = Var | [number | string, number | string];
export type Vector3 = Var | [number | string, number | string, number | string];
export type Vector4 =
	| Var
	| [number | string, number | string, number | string, number | string];

export type Vector = Vector2 | Vector3 | Vector4;
