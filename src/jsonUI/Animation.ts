import { AnimTypes, AnimationValue, CachedManager, Config, CurrentLine, generateRandomName, getRandomNamespace } from "..";
import { AnimationInterface } from "../jsonUITypes/AnimationInterface";

/**
 * Animation class to handle animation creation and registration.
 */
export class Animation {
    /**
     * Constructor for Animation class.
     * @param animate - The AnimationInterface object containing animation data.
     */
    constructor(private animate: AnimationInterface) {
        // Obfuscate element name if enabled in config
        if (Config.data.obfuscator_element_name) {
            animate.name = generateRandomName();
            animate.namespace = `anims-${getRandomNamespace()}`;
        } else {
            // If name is not provided, generate a random name
            animate.name = animate.name ?? CurrentLine();
            // If namespace is not provided, generate a random namespace
            animate.namespace = `anims-${animate.namespace ?? getRandomNamespace()}`;
        }

        const animateLength = animate.keys.length;
        let index = 0,
            from: any = animate.from;

        // Loop through animation keys
        while (index++ < animateLength) {
            const key = animate.keys[index - 1];
            const next: any = animate.loop ? (`${this.getPath()}${(index === animateLength) ? '' : `-${index}`}`) : ((index !== animateLength) ? `${this.getPath()}-${index}` : undefined);

            // If key is a number, create a wait animation
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
                // If key is an object, create an animation with provided properties
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

    /**
     * Private method to build animation object.
     * @param from - The starting value of the animation.
     * @param animKey - The animation properties.
     * @param next - The next animation to be played.
     * @returns The built animation object.
     */
    private buildAnimation(from: any, animKey: AnimationValue, next?: string) {
        return {
            from,
            next,
            ...animKey
        };
    }

    /**
     * Method to get the animation path.
     * @returns The animation path in the format '@namespace.name'.
     */
    getPath() {
        return `@${this.animate.namespace}.${this.animate.name}`;
    }
}