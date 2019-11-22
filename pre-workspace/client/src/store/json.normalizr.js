import { normalize, schema } from "normalizr";

export const normalizeLevel1 = (data, { entity }) => {
    const entitySchema = new schema.Entity(entity, {}, { idAttribute: "_id" });

    const { entities, result } = normalize(
        { [entity]: data },
        { [entity]: [entitySchema] }
    );

    return {
        entities: entities[entity],
        result: result[entity]
    };
};
