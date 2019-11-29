import { gql, useQuery } from "@apollo/client";
import { Template } from "../generated/graphql";

const TEMPLATES = gql`
    query Templates {
        templates {
            _id
            title
        }
    }
`;

type TemplateFragment = Pick<Template, "_id" | "title">;

type TemplateQuery = {
    templates: TemplateFragment[];
};

export const useTemplatesQuery = () => {
    return useQuery<TemplateQuery, {}>(TEMPLATES);
};
