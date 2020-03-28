import { InputType, Field, ObjectType } from "type-graphql";
import { User, AuthRolesEnum } from "../user/user.schema";

// Input Types

@InputType()
export class LoginInput implements Partial<User> {
    @Field()
    email: string;

    @Field()
    password: string;
}

@InputType()
export class SignupInput extends LoginInput implements Partial<User> {
    @Field()
    username: string;
}

// Response Types

@ObjectType({
    simpleResolvers: true,
})
class AuthInfo {
    @Field()
    token: string;

    @Field(() => AuthRolesEnum)
    role: AuthRolesEnum;
}

@ObjectType({
    simpleResolvers: true,
})
export class AuthResponse {
    @Field()
    user: User;

    @Field()
    auth: AuthInfo;
}
