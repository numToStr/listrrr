import { normalize, schema } from "normalizr";

const issueSchema = new schema.Entity("issues", {}, { idAttribute: "_id" });
const mySchema = { issues: [issueSchema] };

export default issues => normalize(issues, mySchema).entities;
