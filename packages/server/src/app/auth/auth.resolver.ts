import { Resolver, Mutation, Arg } from "type-graphql";
import { AuthService } from "./auth.service";
import { AuthResponse, LoginInput, SignupInput } from "./auth.dto";
@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Mutation(() => AuthResponse, {
        description: "For logging in user",
    })
    async login(@Arg("data") data: LoginInput): Promise<AuthResponse> {
        return this.authService.login(data);
    }

    @Mutation(() => AuthResponse, {
        description: "For signing up new users",
    })
    async signup(@Arg("data") data: SignupInput): Promise<AuthResponse> {
        return this.authService.signup(data);
    }
}
