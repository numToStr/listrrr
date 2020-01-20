import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-errors";
import { TokenPayload } from "../../@types/types";
import { TOKEN_KEY, TOKEN_EXP } from "../../config/keys";

const secretBuffer = (): Buffer => {
    return Buffer.from(TOKEN_KEY, "base64");
};

export default class TokenUtil {
    constructor(private ctx: TokenPayload) {}

    // For generating access token
    generate(): string {
        const $secret = secretBuffer();

        return jwt.sign(this.ctx, $secret, {
            expiresIn: TOKEN_EXP,
        });
    }

    static verify(token: string): TokenPayload {
        try {
            const $secret = secretBuffer();

            return jwt.verify(token, $secret, {
                algorithms: ["HS256"],
            }) as TokenPayload;
        } catch (error) {
            throw new AuthenticationError("Unauthorized Access! Please login");
        }
    }
}
