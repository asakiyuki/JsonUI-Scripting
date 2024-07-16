import TextEditInterface from "../properties/TextEdit";
import { ElementButtonInterface } from "./Button";

export interface ElementEditBoxInterface extends
    ElementButtonInterface,
    TextEditInterface { }