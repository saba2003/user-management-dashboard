export interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
}

export class User {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;

    constructor () {
        this.id = "";
        this.username = "";
        this.email = "";
        this.password = "";
        this.role = "user";
    }
}