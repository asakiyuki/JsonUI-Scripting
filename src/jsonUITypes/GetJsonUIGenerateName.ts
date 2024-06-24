import { JsonUIElement } from "../jsonUI/JsonUIElement";
import { JsonUIObject } from "../vanillaModification/_ScreenCommon";

export type GetJsonUIGenerateName = (thisArg: JsonUIElement, name: string) => void;
export type GetJsonUIInitGenerateName = (thisArg: JsonUIObject, name: string) => void;
export type GetJsonUIGenerateNameJsonUIObject = (thisArg: JsonUIObject, name: string) => void;
export type GetJsonUIGenerateNames = (thisArg: JsonUIElement, name: string[]) => void;