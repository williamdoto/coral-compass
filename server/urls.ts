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
    speciesCounts: "/api/species-counts",
    temperatures: {
        regions: "/api/temperatures/regions",
        temperatures: "/api/temperatures/temperatures"
    }
};

export const pages = {
    login: "login",
    map: "map",
    about: "about",
    signup: "signup", 
    graph: "graph",
    import: "import"
};