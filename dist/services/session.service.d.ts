import { User } from 'src/models/user.model';
export declare class SessionService {
    private _user;
    private _url;
    cookies: string;
    constructor(_user: User, _url: string);
    login(): Promise<void>;
}
