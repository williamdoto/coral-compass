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
    speciesCounts: "/api/species-counts",
    taxon:"/api/taxon/:name",
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