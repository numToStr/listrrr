import { Types } from "mongoose";
import { InputType, Field } from "type-graphql";
import { ColumnIDInput, RearrangeColumnInput } from "../shared/shared.schema";

@InputType()
export class RearrangeIssueFindInput extends ColumnIDInput {
    @Field()
    issueID: Types.ObjectId;
}

@InputType()
export class RearrangeIssueInput extends RearrangeColumnInput {
    @Field()
    destinationColumnID: Types.ObjectId;
}
