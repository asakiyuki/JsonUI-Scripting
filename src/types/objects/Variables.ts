import { Any } from "../values/Any";

export interface VariablesInterface {
    [key: `$${string}` | `(${string})`]: {
        [key: `$${string}`]: any;
    };
}
