class DomainError extends Error {
    constructor(message, code = "DOMAIN_ERROR") {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }
}

class ValidationError extends DomainError {
    constructor(message) {
        super(message, "VALIDATION_ERROR");
    }
}

class NotFoundError extends DomainError {
    constructor(message) {
        super(message, "NOT_FOUND_ERROR");
    }
}

class ConflictError extends DomainError {
    constructor(message, fields = {}) {
        super(message, "CONFLICT_ERROR");
        this.fields = fields;
    }
}

module.exports = {
    DomainError,
    ValidationError,
    NotFoundError,
    ConflictError,
};
