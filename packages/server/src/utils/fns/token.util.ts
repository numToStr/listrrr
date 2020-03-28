import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-errors";
import { TokenPayload } from "../../@types/types";
import { TOKEN_KEY, TOKEN_EXP } from "../../config/keys";

const secretBuffer = (): Buffer => {
    return Buffer.from(TOKEN_KEY, "base64");
};

class TokenUtil$ {
    // For generating access token
    generate(ctx: TokenPayload): string {
        const $secret = secretBuffer();

        return jwt.sign(ctx, $secret, {
            expiresIn: TOKEN_EXP,
        });
    }

    verify(token: string): TokenPayload {
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

export const TokenUtil = new TokenUtil$();
