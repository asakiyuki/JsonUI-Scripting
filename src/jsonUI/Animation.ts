import { AnimTypes, AnimationValue, CachedManager, Config, generateRandomName, getRandomNamespace } from "..";
import { AnimationInterface } from "../jsonUITypes/AnimationInterface";

export class Animation {
    constructor(private animate: AnimationInterface) {
        if (Config.data.obfuscator_element_name) {
            animate.name = generateRandomName();
            animate.namespace = `anims-${getRandomNamespace()}`;
        } else {
            animate.name = animate.name ?? generateRandomName();
            animate.namespace = `anims-${animate.namespace ?? getRandomNamespace()}`;
        }

        const animateLength = animate.keys.length;
        let index = 0,
            from: any = animate.from;
        while (index++ < animateLength) {
            const key = animate.keys[index - 1];
            const next: any = animate.loop ? (`${this.getPath()}${(index === animateLength) ? '' : `-${index}`}`) : ((index !== animateLength) ? `${this.getPath()}-${index}` : undefined);

            if (typeof key === 'number') {
                const animBuild = {
                    anim_type: AnimTypes.Wait,
                    duration: key
                }
                CachedManager.register(
                    `${animate.name}${(index === 1) ? '' : `-${index - 1}`}`,
                    animate.namespace,
                    this.buildAnimation(undefined as any, animBuild as any, next)
                );
            } else {
                const animBuild = {
                    from,
                    anim_type: animate.type,
                    ...key
                }
                CachedManager.register(
                    `${animate.name}${(index === 1) ? '' : `-${index - 1}`}`,
                    animate.namespace,
                    this.buildAnimation(undefined as any, animBuild as any, next)
                );
                from = animBuild.to;
            }
        }
    }
    private buildAnimation(from: any, animKey: AnimationValue, next?: string) {
        return {
            from,
            next,
            ...animKey
        };
    }
    getPath() {
        return `@${this.animate.namespace}.${this.animate.name}`;
    }
}