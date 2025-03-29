/**
 * Interface representing a user in the system.
 * Contains the essential properties for user management.
 */
export interface IUser {
    /**
     * Unique identifier for the user.
     */
    id: string;

    /**
     * The username chosen by the user.
     */
    username: string;

    /**
     * The email address of the user.
     */
    email: string;

    /**
     * The password for the user’s account.
     */
    password: string;

    /**
     * The role of the user, either 'admin' or 'user'.
     */
    role: 'admin' | 'user';
}

/**
 * Class representing a user in the system.
 * Used to create user objects with default properties.
 */
export class User implements IUser {
    id: string;
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'user';

    /**
     * Creates an instance of the User class.
     * Initializes user properties with default values.
     */
    constructor() {
        this.id = "";
        this.username = "";
        this.email = "";
        this.password = "";
        this.role = "user";  // Default role set to 'user'
    }
}
