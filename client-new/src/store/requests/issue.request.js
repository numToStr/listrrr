import apiInterface from "../axios.interface";

export const issueAdd = async data => {
    const { data: response } = await apiInterface.post(`/issue`, data);

    return response;
};

export const issueUpdate = async (issueId, data) => {
    const { data: response } = await apiInterface.patch(
        `/issue/${issueId}`,
        data
    );

    return response;
};
