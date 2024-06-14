import { JsonUIElement } from "../../jsonUI/JsonUIElement";
import { BindingInterface } from "../../jsonUITypes/BindingInterface";
import { ButtonMapping } from "../../jsonUITypes/ButtonMapping";
import { GetJsonUIGenerateNameScreenCommon } from "../../jsonUITypes/GetJsonUIGenerateName";
import { JsonUIArrayName } from "../../jsonUITypes/JsonUIArrayName";
import { JsonUIProperty } from "../../jsonUITypes/JsonUIProperty";

export class ScreenCommon {
    private screenJson: any;
    private insertPos: string[] = [];
    constructor(
        private modifyElement: string,
        private screenFiles: string
    ) {

    }
    modifyExtend(
        extentElement: string | JsonUIElement) {
        return this;
    }

    insertBack(
        data: JsonUIElement | JsonUIProperty | ButtonMapping | BindingInterface | string,
        insertArray: JsonUIArrayName, elementProperty?: JsonUIProperty | null,
        elementName?: string | null,
        callback?: GetJsonUIGenerateNameScreenCommon
    ) {
        return this.modifyInsert(
            data,
            insertArray,
            'insert_back',
            elementProperty,
            elementName,
            callback
        );
    }
    insertFront(
        data: JsonUIElement | JsonUIProperty | ButtonMapping | BindingInterface | string,
        insertArray: JsonUIArrayName, elementProperty?: JsonUIProperty | null,
        elementName?: string | null,
        callback?: GetJsonUIGenerateNameScreenCommon
    ) {
        return this.modifyInsert(
            data,
            insertArray,
            'insert_front',
            elementProperty,
            elementName,
            callback
        );
    }
    insertAfter(
        data: JsonUIElement | JsonUIProperty | ButtonMapping | BindingInterface | string,
        insertArray: JsonUIArrayName, elementProperty?: JsonUIProperty | null,
        elementName?: string | null,
        callback?: GetJsonUIGenerateNameScreenCommon
    ) {
        return this.modifyInsert(
            data,
            insertArray,
            'insert_after',
            elementProperty,
            elementName,
            callback
        );
    }
    insertBefore(
        data: JsonUIElement | JsonUIProperty | ButtonMapping | BindingInterface | string,
        insertArray: JsonUIArrayName, elementProperty?: JsonUIProperty | null,
        elementName?: string | null,
        callback?: GetJsonUIGenerateNameScreenCommon
    ) {
        return this.modifyInsert(
            data,
            insertArray,
            'insert_before',
            elementProperty,
            elementName,
            callback
        );
    }

    setProperty(property: JsonUIProperty) {
        return this
    }

    private modifyInsert(
        data: any,
        insertArray: JsonUIArrayName,
        insertType: string,
        elementProperty?: JsonUIProperty | any,
        elementName?: string | null,
        callback?: GetJsonUIGenerateNameScreenCommon
    ) {
        return this;
    }
}