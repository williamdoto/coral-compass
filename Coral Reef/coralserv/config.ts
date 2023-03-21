/** config.ts
 * Configuration file structure for the coral reef server.
 * Put the actual data in config.json
 */
export interface Config
{
    mongoDb: {
        connectionStr: string;
        dbName: string;
    };
}