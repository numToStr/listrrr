import { InputType, Field, ID } from "type-graphql";
import { Types } from "mongoose";

@InputType()
export class FindInput {
    @Field(() => ID)
    _id: Types.ObjectId;
}
