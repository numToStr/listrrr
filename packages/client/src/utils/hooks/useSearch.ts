import { useLocation, useHistory } from "react-router-dom";
import { parse, stringify } from "query-string";

export const useMergeSearch = () => {
    const { search } = useLocation();

    const p = parse(search);

    return (values: Record<string, string>) => {
        return stringify({
            ...p,
            ...values,
        });
    };
};

export const usePushSearch = () => {
    const { push } = useHistory();
    const merge = useMergeSearch();

    return (values: Record<string, string>) => {
        const s = merge(values);

        return push(`?${s}`);
    };
};

// const filters = {
//     // entity: ["is:issue", "is:project"],
//     status: [
//         { title: "Close", type: "is:closed" },
//         { title: "Open", type: "is:open" },
//     ],
//     sort: [
//         {
//             title: "Newest",
//             type: "sort:created-desc",
//         },
//         {
//             title: "Oldest",
//             type: "sort:created-asc",
//         },
//         {
//             title: "Recently updated",
//             type: "sort:updated-desc",
//         },
//     ],
// };
