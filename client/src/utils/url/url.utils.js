import qs from "query-string";

export const parseQuery = query => qs.parse(query);

export const encodeQuery = query => qs.stringify(query);

export const appendQuery = (query, prevQuery = "") => {
    const parsed = parseQuery(prevQuery);
    const encode = encodeQuery({ ...parsed, ...query });

    return encode;
};
