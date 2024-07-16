import { Collection } from "../Collection";
import CollectionInterface from "../properties/Collection";
import StackPanelInterface from "../properties/StackPanel";
import { ElementPanelInterface } from "./panel";

export interface ElementCollectionPanelInterface extends
    ElementPanelInterface,
    CollectionInterface { }