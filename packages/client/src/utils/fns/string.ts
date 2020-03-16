export const upperToSentence = (t: string): string => {
    return t
        .split("")
        .map((v, i) => (i !== 0 ? v.toLowerCase() : v))
        .join("");
};
