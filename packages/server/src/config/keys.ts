declare const process: {
    env: {
        NODE_ENV: string;
        PORT: string;
        MONGO_URI: string;
        TOKEN_KEY: string;
        TOKEN_EXP: string | number;
    };
};

export const { NODE_ENV, PORT, MONGO_URI, TOKEN_KEY, TOKEN_EXP } = process.env;

export const isDev = NODE_ENV === "development";
export const isProd = NODE_ENV === "production";
