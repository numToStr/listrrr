import apiInterface from "../axios.interface";

export const projectAdd = async data => {
    const { data: response } = await apiInterface.post("/project", data);

    return response;
};
