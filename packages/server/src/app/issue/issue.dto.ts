import { Types } from "mongoose";
import { InputType, Field } from "type-graphql";
import { TitleAndDescSchema } from "../shared/shared.schema";

@InputType()
export class CreateIssueInput extends TitleAndDescSchema {
    @Field(() => [Types.ObjectId], {
        nullable: "items",
        description: `Project IDs for the issue which it belongs`,
    })
    projectIDs: Types.ObjectId[];
}

@InputType()
export class UpdateIssueProjectInput {
    @Field(() => [Types.ObjectId], {
        nullable: "items",
    })
    projectIDs: Types.ObjectId[];
}
