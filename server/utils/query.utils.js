const parseSort = query => {
    const aliases = {
        created: "createdAt",
        updated: "updatedAt",
        asc: 1,
        desc: -1
    };

    if (!query) {
        return { createdAt: -1 };
    }

    const [key, value] = query.split(":");

    return { [aliases[key]]: aliases[value] };
};

const parseQ = (query = "is:open") => {
    const aliases = {
        "is:open": true,
        "is:closed": false
    };

    return aliases[query];
};

module.exports = { parseQ, parseSort };
