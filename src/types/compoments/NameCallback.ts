import { Modify } from "../../compoments/Modify";
import { UI } from "../../compoments/UI";

export type UIChildNameCallback = (arg: UI<any> | Modify, name: string) => void;
