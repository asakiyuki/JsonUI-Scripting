import { Configs } from "../";
import { Identifier } from "../types/compoments/Identifier";
import { AnimationTypes } from "../types/enums/AnimTypes";
import { AnimationInterface } from "../types/objects/Animation";
import { AnimationKeyFrame } from "./AnimationKeyFrame";
import { Random } from "./Random";

export class Animation {
	private keyFrames: Array<string>;

	static register(animation: AnimationInterface, identifier?: Identifier) {
		return new Animation(animation, identifier);
	}

	constructor(animation: AnimationInterface, identifier?: Identifier) {
		const config = Configs.getConfig();

		this.keyFrames = [];
		if (!(identifier && !config.obfuscateElementNames))
			identifier = {
				name: Random.getName(),
				namespace: Random.getNamespace(),
			};
		else {
			if (!identifier.name) identifier.name = Random.getName();
			if (!identifier.namespace) identifier.namespace = Random.getName();
		}

		this.buildAnimation(animation, identifier);
	}

	getKeyIndex(index: number) {
		let i = index < 0 ? 0 : Math.min(index, this.keyFrames.length);
		return `@${this.keyFrames[index]}`;
	}

	private buildAnimation(
		{ from, keyFrames, loop, type }: AnimationInterface,
		identifier: Identifier
	) {
		const frameLength = keyFrames.length - 1;

		keyFrames.forEach((keyFrame, index) => {
			this.keyFrames.push(`${identifier.namespace}.${identifier.name}`);
			const currentIdentifier = identifier;

			let next;

			if (index === frameLength) {
				if (loop) next = this.getKeyIndex(0);
			} else {
				identifier = this.generateIdentifier();
				next = this.getFrameKeyByIdentifier(identifier);
			}

			if (["number"].includes(typeof keyFrame)) {
				new AnimationKeyFrame(
					<any>{
						next,
						anim_type: AnimationTypes.Wait,
						duration: keyFrame,
					},
					currentIdentifier
				);
			} else {
				new AnimationKeyFrame(
					<any>{
						next,
						anim_type: type,
						from,
						duration: (<any>keyFrame).duration ?? 1,
						...(<any>keyFrame),
					},
					currentIdentifier
				);
			}

			if (typeof keyFrame === "object") from = (<any>keyFrame).to;
		});
	}

	private generateIdentifier() {
		return {
			name: Random.getName(),
			namespace: Random.getNamespace(),
		};
	}

	private getFrameKeyByIdentifier(identifier: Identifier) {
		return `@${identifier.namespace}.${identifier.name}`;
	}
}
