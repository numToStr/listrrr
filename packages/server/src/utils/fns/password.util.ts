import { genSaltSync, hashSync, compare } from "bcryptjs";

export default class PasswordUtil {
    constructor(private password: string) {}

    // For hashing a password
    hash(): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                const salt = genSaltSync(10);
                const hash = hashSync(this.password, salt);

                resolve(hash);
            } catch (err) {
                reject(err);
            }
        });
    }

    // For verifying password
    verify(hash: string) {
        return compare(this.password, hash);
    }
}
