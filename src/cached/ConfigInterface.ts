/**
 * Interface representing the configuration settings for the application.
 *
 * @interface ConfigInterface
 */
export interface ConfigInterface {
    /**
     * Name of the folder where the application is located.
     *
     * @type {string}
     * @memberof ConfigInterface
     */
    folder_name?: string,

    /**
     * Indicates whether the application is in development mode.
     *
     * @type {boolean}
     * @memberof ConfigInterface
     */
    development?: boolean,

    /**
     * Indicates whether the application is in preview mode.
     *
     * @type {boolean}
     * @memberof ConfigInterface
     */
    preview?: boolean,

    /**
     * Indicates whether to obfuscate element names in the application.
     *
     * @type {boolean}
     * @memberof ConfigInterface
     */
    obfuscator_element_name?: boolean,

    /**
     * Contains manifest information for the application.
     *
     * @type {{
     *     name?: string,
     *     description?: string,
     *     version?: [number, number, number],
     *     uuid?: string
     * }}
     * @memberof ConfigInterface
     */
    manifest?: {
        name?: string,
        description?: string,
        version?: [number, number, number],
        uuid?: string
    }
}