/** urls.ts
 * A list of urls used.
 */
export const urls = {
    account: {
        create: "/api/create-account",
        login: "/api/login",
        find: "/api/account",
        isLogged: "/api/islogged"
    },
    general: {
        list: "/api/general",
        import: "/api/general/import"
    },
    taxon: {
        genusCounts: "/api/genus-counts",
        name: "/api/taxon/:name",
        insert: "/api/taxon",
        species: "/api/species-names",
        speciesCounts: "/api/species-counts"
    },
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

export const pages = {
    login: "login",
    map: "map",
    about: "about",
    signup: "signup",
    graph: "graph",
    import: "import",
    reference: "reference"
};