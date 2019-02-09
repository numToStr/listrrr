const bcrypt = require("bcryptjs");

class Password {
    constructor(password) {
        this.password = password;
    }
}

// For hashing a password
Password.prototype.hash = function hash() {
    return new Promise((resolve, reject) => {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(this.password, salt);

            resolve(hash);
        } catch (err) {
            err = new $Error("Unable to hash password", 400);

            reject(err);
        }
    });
};

// For verifying password
Password.prototype.verify = function verify(hash) {
    return bcrypt.compare(this.password, hash);
};

module.exports = Password;
