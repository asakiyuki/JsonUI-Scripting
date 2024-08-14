import { Class } from "../compoments/Class";

type CallbackObject = (key: string, value: any) => void;
export class Obj extends Class {
    static forEach(data: object, callback: CallbackObject) {
        for (const key in data) {
            const element = (<any>data)[key];
            callback(key, element);
        }
    }
};