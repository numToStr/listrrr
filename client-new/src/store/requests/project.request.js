import apiInterface from "../axios.interface";

export const projectAdd = async data => {
    const { data: response } = await apiInterface.post("/project", data);

    return response;
};

export const projectUpdate = async (projectId, data) => {
    const { data: response } = await apiInterface.patch(
        `/project/${projectId}`,
        data
    );

    return response;
};
