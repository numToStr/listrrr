import { LoginInput, AuthResponse, SignupInput } from "./auth.resolver";
import PasswordUtil from "../../utils/fns/password.util";
import { deleteProps } from "../../utils/fns/object.util";
import TokenUtil from "../../utils/fns/token.util";
import { UserDAL } from "../user/user.dal";
import { AuthRolesEnum } from "../user/user.schema";

export class AuthService {
    static async login(data: LoginInput): Promise<AuthResponse> {
        const { email, password } = data;

        const isUserExists = await new UserDAL({ email }).findOne({
            select: "-__v -createdAt -updatedAt",
        });

        if (!isUserExists) {
            throw new Error("Invalid email or password");
        }

        const isPwMatched = await new PasswordUtil(password).verify(
            isUserExists.password
        );

        if (!isPwMatched) {
            throw new Error("Invalid email or password");
        }

        deleteProps(isUserExists, ["password"]);

        const role = AuthRolesEnum.USER;

        const token = new TokenUtil({
            ID: isUserExists._id.toHexString(),
            ROLE: role,
        }).generate();

        return {
            user: isUserExists,
            auth: {
                token,
                role,
            },
        };
    }

    static async signup(data: SignupInput): Promise<AuthResponse> {
        const { username, email, password } = data;

        const isUserExists = await new UserDAL({
            $or: [{ username }, { email }],
        }).findOne({
            select: "username email",
        });

        if (isUserExists) {
            const msg = (type: string) => {
                return `User already exists with this ${type}`;
            };

            if (isUserExists.email === email) {
                throw new Error(msg("email"));
            }

            throw new Error(msg("username"));
        }

        const hashed = await new PasswordUtil(password).hash();

        const role = AuthRolesEnum.USER;

        const user = await new UserDAL().create({
            username,
            email,
            password: hashed,
            role,
        });

        const token = new TokenUtil({
            ID: user._id.toHexString(),
            ROLE: role,
        }).generate();

        return {
            user,
            auth: {
                token,
                role,
            },
        };
    }
}
