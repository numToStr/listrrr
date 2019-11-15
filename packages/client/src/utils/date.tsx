import formatDistance from "date-fns/formatDistance";

export const formatDate = (date: string) => {
    return formatDistance(new Date(date), new Date(), {
        addSuffix: true
    });
};
