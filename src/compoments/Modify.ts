import { JsonBuilder } from "../compilers/generator/JsonBuilder";
import { Obj } from "../compilers/reader/Object";
import { ReadBinding } from "../compilers/reader/ReadBinding";
import { ReadProperties, ReadValue } from "../compilers/reader/ReadProperties";
import {
	ChildIdentifier,
	ChildElement,
} from "../types/compoments/ChildIdentifier";
import { UIChildNameCallback } from "../types/compoments/NameCallback";
import { BindingName } from "../types/enums/BindingName";
import { BindingInterface } from "../types/objects/BindingInterface";
import { Properties } from "../types/objects/properties/Properties";
import { VariablesInterface } from "../types/objects/Variables";
import { Binding } from "../types/values/Binding";
import { Var } from "../types/values/Variable";
import { Random } from "./Random";
import { UI } from "./UI";

export interface OverrideInterface {
	setProperties(properties: Properties): OverrideInterface;
	addChild(
		child: string | ChildIdentifier | UI,
		callback?: UIChildNameCallback
	): OverrideInterface;
	addBindings(
		binding:
			| BindingInterface
			| Binding
			| Var
			| Array<BindingInterface | Binding | Var>
	): OverrideInterface;
	addVariables(variables: VariablesInterface): OverrideInterface;
	searchBinding(bindingName: BindingName, controlName: string): any;
}

export interface ModificationBindingsInterface {
	remove(
		binding: BindingInterface | BindingInterface[]
	): ModificationBindingsInterface;
	addBindings(
		binding:
			| BindingInterface
			| Binding
			| Var
			| Array<BindingInterface | Binding | Var>
	): ModificationBindingsInterface;
}

export interface ModificationControlsInterface {
	remove: (
		childName: string | Array<string>
	) => ModificationControlsInterface;
	moveBack: (
		childName: string | Array<string>
	) => ModificationControlsInterface;
	moveFront: (
		childName: string | Array<string>
	) => ModificationControlsInterface;
	moveAfter: (
		childName: string | Array<string>
	) => ModificationControlsInterface;
	moveBefore: (
		childName: string | Array<string>
	) => ModificationControlsInterface;
	replace: (
		childName: string,
		element: UI,
		properties?: Properties,
		elementName?: string
	) => ModificationControlsInterface;
	insertBack: (
		element: UI,
		properties?: Properties,
		elementName?: string
	) => ModificationControlsInterface;
	insertFront: (
		element: UI,
		properties?: Properties,
		elementName?: string
	) => ModificationControlsInterface;
	insertAfter: (
		childName: string,
		element: UI,
		properties?: Properties,
		elementName?: string
	) => ModificationControlsInterface;
	insertBefore: (
		childName: string,
		element: UI,
		properties?: Properties,
		elementName?: string
	) => ModificationControlsInterface;
}

export interface ModificationInterface {
	bindings: ModificationBindingsInterface;
	controls: ModificationControlsInterface;
}

export interface ModificationControls {
	remove: Array<string>;
	replace: Array<[string, ChildElement]>;
	insertBack: Array<ChildElement>;
	insertFront: Array<ChildElement>;
	insertAfter: Array<[string, ChildElement]>;
	insertBefore: Array<[string, ChildElement]>;
	moveBack: Array<string>;
	moveFront: Array<string>;
	moveAfter: Array<string>;
	moveBefore: Array<string>;
}

/**
 * Represents a class used to modify the properties, controls, bindings, and variables of a Minecraft UI element.
 * This class provides various methods to manipulate UI elements dynamically and compile them into JSON format.
 *
 * @class Modify
 */
export class Modify {
	/** Holds the properties for the modification. */
	private properties: Properties = {};
	/** Holds the controls for the modification. */
	private controls?: Array<ChildElement>;
	/** Holds the bindings for the modification. */
	private bindings?: Array<BindingInterface>;
	/** Holds the variables for the modification. */
	private variables?: VariablesInterface;

	/** Holds the modification bindings. */
	private modifyBindings?: Array<BindingInterface>;
	/** Holds the bindings to be removed. */
	private removeModifyBindings?: Array<BindingInterface>;

	/** Contains control modifications like move, replace, remove, etc. */
	private modifyControls: ModificationControls = {
		remove: [],
		replace: [],
		insertBack: [],
		insertFront: [],
		insertAfter: [],
		insertBefore: [],
		moveAfter: [],
		moveBack: [],
		moveBefore: [],
		moveFront: [],
	};

	/**
	 * Provides methods for overriding properties, controls, bindings, and variables.
	 * These methods allow you to modify the Minecraft UI element in different ways.
	 */
	override: OverrideInterface = {
		/**
		 * Override properties for the Modify UI Element.
		 *
		 * @param {Properties} properties - The properties to set for the UI element.
		 * @returns {OverrideInterface} The override interface to allow method chaining.
		 */
		setProperties: (properties: Properties) => {
			this.properties = {
				...this.properties,
				...properties,
			};
			return this.override;
		},

		/**
		 * Override properties for the Modify UI Element.
		 *
		 * @param {Properties} properties - The properties to set for the UI element.
		 * @returns {OverrideInterface} The override interface to allow method chaining.
		 */
		addChild: (
			child: string | ChildIdentifier | UI,
			callback?: UIChildNameCallback
		) => {
			if (!this.controls) this.controls = [];
			if (typeof child === "string")
				this.controls.push({ [`${child}`]: {} });
			else if (child instanceof UI) {
				const name = Random.getName();
				this.controls.push({ [`${name}${child.getElement()}`]: {} });
				callback?.(this, name);
			} else {
				child.name ??= Random.getName();
				if (child.extend instanceof UI)
					child.extend = child.extend.getPath();
				else if (typeof child.extend === "object")
					child.extend = `${child.extend.namespace}.${child.extend.name}`;
				this.controls.push({
					[`${child.name}@${child.extend}`]: ReadProperties(
						child.properties || {}
					),
				});
				callback?.(this, child.name);
			}
			return this.override;
		},

		/**
		 * Override properties for the Modify UI Element.
		 *
		 * @param {Properties} properties - The properties to set for the UI element.
		 * @returns {OverrideInterface} The override interface to allow method chaining.
		 */
		addBindings: (
			bindings:
				| BindingInterface
				| Binding
				| Var
				| (BindingInterface | Binding | Var)[]
		) => {
			if (Array.isArray(bindings))
				for (const binding of bindings)
					this.override.addBindings(binding);
			else
				(this.bindings ||= []).push(
					ReadBinding(<any>bindings, this.override)
				);
			return this.override;
		},

		/**
		 * Override properties for the Modify UI Element.
		 *
		 * @param {Properties} properties - The properties to set for the UI element.
		 * @returns {OverrideInterface} The override interface to allow method chaining.
		 */
		addVariables: (variables: VariablesInterface) => {
			this.variables ||= {};

			Obj.forEach(variables, (key, value) => {
				(<any>this.variables)[key] = {
					...this.variables,
					...Obj.map(value, (k, v) => {
						return { key: k, value: ReadValue(v) };
					}),
				};
			});

			return this.override;
		},

		/**
		 * Override properties for the Modify UI Element.
		 *
		 * @param {Properties} properties - The properties to set for the UI element.
		 * @returns {OverrideInterface} The override interface to allow method chaining.
		 */
		searchBinding: (
			bindingName: Binding,
			controlName?: string,
			targetBindingName?: Binding
		) => {
			for (let index = 0; index < (this.bindings?.length || 0); index++) {
				const binding = this.bindings?.[index];
				if (controlName) {
					if (
						binding?.source_control_name === controlName &&
						binding.source_property_name === bindingName
					) {
						if (targetBindingName) {
							if (
								binding.target_property_name ===
								targetBindingName
							) {
								return targetBindingName;
							} else return undefined;
						} else return binding.target_property_name;
					}
				} else {
					if (binding?.source_property_name === bindingName) {
						if (targetBindingName) {
							if (
								binding.target_property_name ===
								targetBindingName
							) {
								return targetBindingName;
							} else return undefined;
						} else return binding.target_property_name;
					}
				}
			}
			return undefined;
		},
	};

	/**
	 * Provides methods to modify bindings and controls.
	 * These methods allow you to add, remove, or manipulate bindings and controls dynamically.
	 */
	modify: ModificationInterface = {
		bindings: {
			/**
			 * Remove specified bindings.
			 *
			 * @param {BindingInterface | BindingInterface[]} bindings - The binding(s) to remove.
			 * @returns {ModificationBindingsInterface} The bindings interface to allow further modifications.
			 */
			remove: (bindings) => {
				if (Array.isArray(bindings)) {
					(this.removeModifyBindings ||= [])?.push(...bindings);
				} else (this.removeModifyBindings ||= [])?.push(bindings);
				return this.modify.bindings;
			},

			/**
			 * Add new bindings.
			 *
			 * @param {BindingInterface | Binding | Var | Array<BindingInterface | Binding | Var>} bindings - The bindings to add.
			 * @returns {ModificationBindingsInterface} The bindings interface to allow further modifications.
			 */
			addBindings: (bindings) => {
				if (Array.isArray(bindings))
					bindings.forEach((binding) =>
						this.modify.bindings.addBindings(binding)
					);
				else {
					(this.modifyBindings ||= []).push(
						ReadBinding(<any>bindings, <any>this.modify.bindings)
					);
				}
				return this.modify.bindings;
			},
		},
		controls: {
			/**
			 * Remove specified child controls.
			 *
			 * @param {string | Array<string>} childName - The child control name(s) to remove.
			 * @returns {ModificationControlsInterface} The controls interface to allow further modifications.
			 */
			remove: (childName) => {
				if (Array.isArray(childName))
					this.modifyControls.remove.push(...childName);
				else this.modifyControls.remove.push(childName);
				return this.modify.controls;
			},

			/**
			 * Move child controls after specified child.
			 *
			 * @param {string | Array<string>} childName - The child control name(s) to move.
			 * @returns {ModificationControlsInterface} The controls interface to allow further modifications.
			 */
			moveAfter: (childName) => {
				if (Array.isArray(childName))
					this.modifyControls.moveAfter.push(...childName);
				else this.modifyControls.moveAfter.push(childName);
				return this.modify.controls;
			},

			moveBack: (childName) => {
				if (Array.isArray(childName))
					this.modifyControls.moveBack.push(...childName);
				else this.modifyControls.moveBack.push(childName);
				return this.modify.controls;
			},
			moveFront: (childName) => {
				if (Array.isArray(childName))
					this.modifyControls.moveFront.push(...childName);
				else this.modifyControls.moveFront.push(childName);
				return this.modify.controls;
			},
			moveBefore: (childName) => {
				if (Array.isArray(childName))
					this.modifyControls.moveBefore.push(...childName);
				else this.modifyControls.moveBefore.push(childName);
				return this.modify.controls;
			},

			/**
			 * Replace specified child control with a new UI element.
			 *
			 * @param {string} childName - The name of the child control to replace.
			 * @param {UI} ui - The new UI element to replace the existing one.
			 * @param {Properties} [properties] - Optional properties for the new UI element.
			 * @param {string} [elementName] - Optional name for the new UI element.
			 * @returns {ModificationControlsInterface} The controls interface to allow further modifications.
			 */
			replace: (childName, ui, properties, elementName) => {
				this.modifyControls.replace.push([
					childName,
					{
						[`${elementName || Random.getName()}@${ui.getPath()}`]:
							ReadProperties(properties || {}),
					},
				]);
				return this.modify.controls;
			},
			insertAfter: (childName, ui, properties, elementName) => {
				this.modifyControls.insertAfter.push([
					childName,
					{
						[`${elementName || Random.getName()}@${ui.getPath()}`]:
							ReadProperties(properties || {}),
					},
				]);
				return this.modify.controls;
			},
			insertBefore: (childName, ui, properties, elementName) => {
				this.modifyControls.insertBefore.push([
					childName,
					{
						[`${elementName || Random.getName()}@${ui.getPath()}`]:
							ReadProperties(properties || {}),
					},
				]);
				return this.modify.controls;
			},

			/**
			 * Insert a new child element at the back.
			 *
			 * @param {UI} ui - The UI element to insert.
			 * @param {Properties} [properties] - Optional properties for the new UI element.
			 * @param {string} [elementName] - Optional name for the new UI element.
			 * @returns {ModificationControlsInterface} The controls interface to allow further modifications.
			 */
			insertBack: (ui, properties, elementName) => {
				this.modifyControls.insertBack.push({
					[`${elementName || Random.getName()}@${ui.getPath()}`]:
						ReadProperties(properties || {}),
				});
				return this.modify.controls;
			},

			/**
			 * Insert a new child element at the front.
			 *
			 * @param {UI} ui - The UI element to insert.
			 * @param {Properties} [properties] - Optional properties for the new UI element.
			 * @param {string} [elementName] - Optional name for the new UI element.
			 * @returns {ModificationControlsInterface} The controls interface to allow further modifications.
			 */
			insertFront: (ui, properties, elementName) => {
				this.modifyControls.insertFront.push({
					[`${elementName || Random.getName()}@${ui.getPath()}`]:
						ReadProperties(properties || {}),
				});
				return this.modify.controls;
			},
		},
	};

	/**
	 * Constructor for the Modify class, optionally accepting properties to initialize.
	 *
	 * @param {Properties} [properties] - Optional properties to initialize the Modify object with.
	 */
	private constructor(properties?: Properties) {
		if (properties) this.override.setProperties(properties);
	}

	/**
	 * Compiles the current modifications into a JSON UI code.
	 *
	 * @returns {any} The compiled JSON code representing the UI element modifications.
	 */
	getUI() {
		const code: any = ReadProperties(this.properties);
		const modifications: Array<any> = [];

		for (const key of ["type", "controls", "bindings", "button_mappings"])
			if ((<any>this)[key]) code[key] = (<any>this)[key];

		if (this.variables)
			Obj.forEach(this.variables, (k, v) => {
				(code.variables ||= []).push({
					requires: k,
					...v,
				});
			});

		{
			if (this.modifyBindings) {
				modifications.push({
					array_name: "bindings",
					operation: "insert_front",
					value: this.modifyBindings,
				});
			}
			if (this.removeModifyBindings) {
				modifications.push(
					...this.removeModifyBindings.map((v) => ({
						array_name: "bindings",
						operation: "remove",
						where: v,
					}))
				);
			}
		}
		{
			modifications.push(
				...this.modifyControls.remove.map((controlName) => ({
					array_name: "controls",
					operation: "remove",
					control_name: controlName,
				}))
			);
			modifications.push(
				...this.modifyControls.moveAfter.map((controlName) => ({
					array_name: "controls",
					operation: "move_after",
					control_name: controlName,
				}))
			);
			modifications.push(
				...this.modifyControls.moveBack.map((controlName) => ({
					array_name: "controls",
					operation: "move_back",
					control_name: controlName,
				}))
			);
			modifications.push(
				...this.modifyControls.moveBefore.map((controlName) => ({
					array_name: "controls",
					operation: "move_before",
					control_name: controlName,
				}))
			);
			modifications.push(
				...this.modifyControls.moveFront.map((controlName) => ({
					array_name: "controls",
					operation: "move_front",
					control_name: controlName,
				}))
			);
			modifications.push(
				...this.modifyControls.replace.map(([childName, element]) => ({
					array_name: "controls",
					operation: "replace",
					control_name: childName,
					value: element,
				}))
			);
			modifications.push(
				...this.modifyControls.insertAfter.map(
					([childName, element]) => ({
						array_name: "controls",
						operation: "insert_after",
						control_name: childName,
						value: [element],
					})
				)
			);
			modifications.push(
				...this.modifyControls.insertBefore.map(
					([childName, element]) => ({
						array_name: "controls",
						operation: "insert_before",
						control_name: childName,
						value: [element],
					})
				)
			);
			if (this.modifyControls.insertBack.length)
				modifications.push({
					array_name: "controls",
					operation: "insert_back",
					value: this.modifyControls.insertBack,
				});
			if (this.modifyControls.insertFront.length)
				modifications.push({
					array_name: "controls",
					operation: "insert_front",
					value: this.modifyControls.insertFront,
				});
		}

		if (modifications.length > 0) code["modifications"] = modifications;

		return code;
	}

	addChild(element: UI, properties?: Properties, elementName?: string) {
		this.modify.controls.insertFront(element, properties, elementName);
		return this;
	}

	/**
	 * Registers a Modify UI element with the specified file and element path.
	 * Optionally accepts properties for initialization.
	 *
	 * @param {string} filePath - The path of the file to register the UI element in.
	 * @param {string} elementPath - The path of the UI element to register.
	 * @param {Properties} [properties] - Optional properties to initialize the Modify object with.
	 * @returns {Modify} The registered Modify object.
	 */
	static register(
		filePath: string,
		elementPath: string,
		properties?: Properties
	) {
		const modify = JsonBuilder.getModify(filePath, elementPath);
		modify?.override?.setProperties(properties || {});
		return (
			modify ||
			JsonBuilder.registerModify(
				filePath,
				elementPath,
				new Modify(properties)
			)
		);
	}

	private static apply() {}
	private static arguments = "";
	private static bind() {}
	private static call() {}
	private static caller = "";
	private static length = "";
	private static name = "";
	private static toString() {}
}
