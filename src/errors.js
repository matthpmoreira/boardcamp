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

export class CustomerConflictError extends ConflictError {
    constructor(cpf) {
        super(`CPF "${cpf}" has already been registered`);
        this.name = "CustomerConflictError";
    }
}

export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }
}

export class GameNotFoundError extends NotFoundError {
    constructor(id) {
        super(`No game with id ${id} found`);
        this.name = "GameNotFoundError";
    }
}

export class CustomerNotFoundError extends NotFoundError {
    constructor(id) {
        super(`No customer with id ${id} found`);
        this.name = "CustomerNotFoundError";
    }
}

export class RentalNotFoundError extends NotFoundError {
    constructor(id) {
        super(`No rental with id ${id} found`);
        this.name = "RentalNotFoundError";
    }
}

export class NoStockAvailableError extends Error {
    constructor(id) {
        super(`There's no stock available for game with id ${id}`);
        this.name = "NoStockAvailableError";
    }
}

export class RentalReturnedError extends Error {
    constructor(id) {
        super(`Rental with id ${id} has already been finished`);
        this.name = "RentalReturnedError";
    }
}
