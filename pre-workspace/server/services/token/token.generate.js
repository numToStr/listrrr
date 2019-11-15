const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_KEY, ACCESS_TOKEN_EXP } = require("../../config/keys");

class Token {
    constructor(context) {
        this.context = context;
        this.cookieConfig = {
            path: "/",
            secure: false,
            sameSite: true,
            httpOnly: true
        };
    }
}

// For generating access token
Token.prototype.access = function access() {
    try {
        const accessToken = this.generate(ACCESS_TOKEN_KEY, ACCESS_TOKEN_EXP);

        this.accessToken = accessToken;

        return this;
    } catch (error) {
        throw error;
    }
};

// Common function for generating token [Don't use outside from Class]
Token.prototype.generate = function generate(key, exp) {
    const secret = Buffer.from(key, "base64");

    return jwt.sign(this.context, secret, {
        expiresIn: exp
    });
};

module.exports = Token;
