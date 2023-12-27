class Command {
    #emailAddress: string
    #password: string
    #lastName: string
    #firstName: string

    constructor(emailAddress: string, password: string, lastName: string, firstName: string) {
        this.#emailAddress = emailAddress
        this.#password = password
        this.#lastName = lastName
        this.#firstName = firstName
    }

    get emailAddress() {
        return this.#emailAddress
    }

    get password() {
        return this.#password
    }

    get lastName() {
        return this.#lastName
    }

    get firstName() {
        return this.#firstName
    }
}

export interface SignupCommand extends Command { }

// Predicate as a type guard
const isCommand = (entries: unknown): entries is Command => (
    typeof entries === 'object' &&
    entries !== null &&
    "emailAddress" in entries &&
    "password" in entries &&
    "lastName" in entries &&
    "firstName" in entries
);


export const fromEntries = (entries: unknown): SignupCommand => {
    if (isCommand(entries)) {
        const { emailAddress, password, lastName, firstName } = entries;
        return new Command(emailAddress, password, lastName, firstName)
    }
    throw new TypeError("Invalid signup command");
};
