import { Types } from "mongoose";
import { InputType, Field } from "type-graphql";
import { TitleAndDescSchema, ColumnIDInput } from "../shared/shared.schema";

@InputType()
export class CreateProjectInput extends TitleAndDescSchema {
    @Field({
        description: `Template ID for the project`,
    })
    templateID: Types.ObjectId;
}

@InputType()
export class RearrangeColumnFindInput extends ColumnIDInput {
    @Field()
    projectID: Types.ObjectId;
}
