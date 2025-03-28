export interface IUser {
    id: number;
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
}

export class User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;

    constructor () {
        this.id = 0;
        this.username = "";
        this.email = "";
        this.password = "";
        this.role = "user";
    }
}