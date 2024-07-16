import { JsonUIElement } from "../..";
import { ArrayProperty } from "../LanguageInterface";

export default interface AnyPropertyInterface {
    [key: string]: string | JsonUIElement | ArrayProperty | any
}