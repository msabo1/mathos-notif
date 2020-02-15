import { Response } from 'request'
import * as request from 'request-promise';
import { User } from 'src/models/user.model';

export class SessionService{
    public cookies: string;

    constructor(private _user: User, private _url: string){}

    async login(): Promise<void>{

        // Method loads(get) base url to retrieve session cookie and login form token,
        // sends post request to base url with provided user credentials and retrieved
        // data to retrieve user remember cookie and stores it.
        

        const getResponse: Response = await request.get(this._url, {resolveWithFullResponse: true});
        const cookie: string = getResponse.headers['set-cookie'][0].split(';')[0]; //strip cookie
        const token: string = getResponse.body.match(/<div class="userdata">.*?<input type="hidden" name="([^"]*?)" value="1" \/>/)[1] //regex finds login form token and stores it in group1
        const data: string = `username=${this._user.username}&password=${this._user.password}&${token}=1&remember=yes&task=user.login&option=com_users`;

        const loginResponse: Response = await request({
            method: 'POST',
            url: this._url,
            body: data,
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Cookie': cookie,
                connection: 'keep-alive',
            },
            simple: false,
            resolveWithFullResponse: true
        });

        this.cookies = '';
        loginResponse.headers['set-cookie'].forEach((cookie: string) => {
            this.cookies += cookie.split(';')[0] + '; ';
        });
    }
}