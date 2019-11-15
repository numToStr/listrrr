class AppError extends Error {
    constructor(
        message = "Oops! Something went wrong",
        status = 500,
        name = "ValidationError",
        code
    ) {
        /* For accessing this */
        super();

        /* Custom Properties */
        this.name = name;
        this.message = message;
        this.status = status;
        this.code = code;

        /* For capturing stack tree */
        Error.captureStackTrace(this, AppError);
    }
}

module.exports = AppError;
