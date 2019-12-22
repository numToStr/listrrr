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

@Resolver()
export class AuthResolver {
    @Mutation(() => AuthResponse, {
        description: "For logging in user",
    })
    async login(@Arg("data") data: LoginInput): Promise<AuthResponse> {
        return AuthService.login(data);
    }

    @Mutation(() => AuthResponse, {
        description: "For signing up new users",
    })
    async signup(@Arg("data") data: SignupInput): Promise<AuthResponse> {
        return AuthService.signup(data);
    }
}
