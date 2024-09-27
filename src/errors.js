export class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = "ConflictError";
    }
}

export class GameConflictError extends ConflictError {
    constructor(name) {
        super(`A game named "${name}" already exists`);
        this.name = "GameConflictError";
    }
}
