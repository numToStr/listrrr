import { Service } from "typedi";
import { PasswordUtil } from "../../utils/fns/password.util";
import { deleteProps } from "../../utils/fns/object.util";
import { TokenUtil } from "../../utils/fns/token.util";
import { UserDAL } from "../user/user.dal";
import { LoginInput, AuthResponse, SignupInput } from "./auth.dto";

@Service()
export class AuthService {
    async login(data: LoginInput): Promise<AuthResponse> {
        const { email, password } = data;

        const isUserExists = await new UserDAL({ email }).findOne({
            select: "-__v -createdAt -updatedAt",
        });

        if (!isUserExists) {
            throw new Error("Invalid email or password");
        }

        const isPwMatched = await PasswordUtil.verify(
            password,
            isUserExists.password
        );

        if (!isPwMatched) {
            throw new Error("Invalid email or password");
        }

        deleteProps(isUserExists, ["password"]);

        const token = TokenUtil.generate({
            ID: isUserExists._id.toHexString(),
        });

        return {
            user: isUserExists,
            auth: {
                token,
            },
        };
    }

    async signup(data: SignupInput): Promise<AuthResponse> {
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

        const hashed = await PasswordUtil.hash(password);

        const user = await new UserDAL().create({
            username,
            email,
            password: hashed,
        });

        const token = TokenUtil.generate({
            ID: user._id.toHexString(),
        });

        return {
            user,
            auth: {
                token,
            },
        };
    }
}
