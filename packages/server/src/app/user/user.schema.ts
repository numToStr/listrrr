import { ObjectType, Field } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { IDSchema } from "../shared/shared.schema";

@ObjectType({
    simpleResolvers: true,
})
export class User extends IDSchema {
    @Field()
    @prop({
        unique: true,
        required: true,
        trim: true,
        minlength: 3,
    })
    username: string;

    @Field()
    @prop({
        unique: true,
        required: true,
        trim: true,
    })
    email: string;

    @prop({
        required: true,
        trim: true,
    })
    password: string;
}

export const UserModel = getModelForClass(User);
