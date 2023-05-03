/** urls.ts
 * A list of urls used.
 */
export const urls = {
    account: {
        create: "/api/create-account",
        login: "/api/login",
        find: "/api/account"
    },
    general: "/api/general",
    genusCounts: "/api/genus-counts",
    taxon: {name: "/api/taxon/:name", 
            insert: "/api/taxon"},
    catalog: "/api/catalog",
    institution: "/api/institution",
    location: "/api/location",
    occurence: "/api/occurence",
    record: "/api/record",
    temperatures: {
        regions: "/api/temperatures/regions",
        temperatures: "/api/temperatures/temperatures"
    }
};