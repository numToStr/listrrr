const TokenVerifier = require("../services/token/token.verify");

/**
 * Middleware for verifying token and protecting routes
 * Token should be sended along with http request
 * Token should be in authorization header
 *
 * Token Format ====
 * authorization: Basic <token>
 */
const verifyToken = (req, res, next) => {
    try {
        // Getting the Authorization header
        const tokenCookie = req.cookies["x-access-token"];

        // Check if any value is present in Authorization header or not
        if (!tokenCookie) {
            return res.sendStatus(403);
        }

        // Verifying the token, if error => return
        const { accessDecoded } = new TokenVerifier(tokenCookie).access();

        // Forwarding the decoded token to next middleware
        req.$user = accessDecoded;
        next();
    } catch (error) {
        // If any error comes while verifying the token sending unauthorized
        next(error);
    }
};

module.exports = verifyToken;
