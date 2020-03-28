import { genSalt, hash, compare } from "bcrypt";

class PasswordUtil$ {
    // For hashing a password
    async hash(password: string): Promise<string> {
        const salt = await genSalt(10);

        return hash(password, salt);
    }

    // For verifying password
    verify(password: string, hashed: string): Promise<boolean> {
        return compare(password, hashed);
    }
}

export const PasswordUtil = new PasswordUtil$();
