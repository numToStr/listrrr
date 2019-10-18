import apiInterface from "../axios.interface";

export const issueUpdate = async (issueId, data) => {
    const { data: response } = await apiInterface.patch(
        `/issue/${issueId}`,
        data
    );

    return response;
};
