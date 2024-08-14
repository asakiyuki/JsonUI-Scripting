import { Binding } from "../values/Binding";
import { Var } from "../values/Variable";

export interface PropertyBag {
    [key: `#${string}`]: number | boolean | string | Var;
}