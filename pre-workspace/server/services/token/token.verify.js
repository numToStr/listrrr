const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_KEY } = require("../../config/keys");

class TokenVerifier {
    constructor(token) {
        this.token = token;
    }
}

// For verifying access token
TokenVerifier.prototype.access = function access() {
    try {
        const decoded = this.verify(ACCESS_TOKEN_KEY, this.token);

        this.accessDecoded = decoded;

        return this;
    } catch (error) {
        throw new $Error("Unauthorized Access! Please login", 401);
    }
};

// Common function for verifying token [Don't use outside from Class]
TokenVerifier.prototype.verify = function verify(key, token) {
    const secret = Buffer.from(key, "base64");

    return jwt.verify(token, secret, {
        algorithms: ["HS256"]
    });
};

module.exports = TokenVerifier;
