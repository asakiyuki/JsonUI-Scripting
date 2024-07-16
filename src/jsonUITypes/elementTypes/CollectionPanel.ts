import { Collection } from "../Collection";
import CollectionInterface from "../properties/Collection";
import StackPanelInterface from "../properties/StackPanel";
import ElementPanelInterface from "./panel";

export default interface ElementCollectionPanelInterface extends
    ElementPanelInterface,
    CollectionInterface { }