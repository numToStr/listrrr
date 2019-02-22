import { normalize, schema } from "normalizr";

export default (data, { entity }) => {
    const entitySchema = new schema.Entity(entity, {}, { idAttribute: "_id" });

    const dataSchema = {
        [entity]: [entitySchema]
    };

    return normalize(data, dataSchema).entities;
};
