import {
    Resolver,
    Mutation,
    InputType,
    Field,
    Arg,
    ObjectType,
} from "type-graphql";
import { User, AuthRolesEnum } from "../user/user.schema";
import { AuthService } from "./auth.service";

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

@ObjectType()
class AuthInfo {
    @Field()
    token: string;

    @Field(() => AuthRolesEnum)
    role: AuthRolesEnum;
}

@ObjectType()
export class AuthResponse {
    @Field()
    user: User;

    @Field()
    auth: AuthInfo;
}

@Resolver()
export class AuthResolver {
    @Mutation(() => AuthResponse, {
        description: "For logging in user",
    })
    login(@Arg("data") data: LoginInput) {
        return AuthService.login(data);
    }

    @Mutation(() => AuthResponse, {
        description: "For signing up new users",
    })
    signup(@Arg("data") data: SignupInput) {
        return AuthService.signup(data);
    }
}
