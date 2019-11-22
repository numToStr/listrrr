/* eslint camelcase: ["error", { properties: "never" }] */
const { get } = require("../../utils/request.utils");

class GithubAuth {
    constructor({ clientID, clientSecret, scope = ["user"] }) {
        this._clientID = clientID;
        this._clientSecret = clientSecret;
        this._scope = scope;
        this._urls = {
            authorize: "https://github.com/login/oauth/authorize",
            accessToken: "https://github.com/login/oauth/access_token",
            user: "https://api.github.com/user"
        };
    }

    get clientID() {
        return this._clientID;
    }

    get clientSecret() {
        return this._clientSecret;
    }

    get redirectURI() {
        return this._redirectURI;
    }

    get urls() {
        return this._urls;
    }
}

GithubAuth.prototype.initiate = function initiate() {
    const qs = new URLSearchParams({
        client_id: this.clientID,
        scope: this._scope.join(" ")
    }).toString();

    return (__, res) => res.redirect(`${this.urls.authorize}?${qs}`);
};

GithubAuth.prototype.authenticate = function authenticate({ failureRedirect }) {
    return async (req, res, next) => {
        try {
            const { code } = req.query;

            const qs = new URLSearchParams({
                client_id: this.clientID,
                client_secret: this.clientSecret,
                code
            }).toString();

            const data = await get(`${this.urls.accessToken}?${qs}`, {
                headers: { Accept: "application/json" }
            });

            if (data.error) {
                throw new Error(data.error_description);
            }

            const user = await get(this.urls.user, {
                headers: {
                    Authorization: `token ${data.access_token}`,
                    "User-Agent": "listrrr"
                }
            });

            req.$github = user;

            return next();
        } catch (error) {
            if (failureRedirect) {
                return res.redirect(failureRedirect);
            }

            next(error);
        }
    };
};

module.exports = { GithubAuth };
