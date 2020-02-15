"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise");
class SessionService {
    constructor(_user, _url) {
        this._user = _user;
        this._url = _url;
    }
    async login() {
        const getResponse = await request.get(this._url, { resolveWithFullResponse: true });
        const cookie = getResponse.headers['set-cookie'][0].split(';')[0];
        const token = getResponse.body.match(/<div class="userdata">.*?<input type="hidden" name="([^"]*?)" value="1" \/>/)[1];
        const data = `username=${this._user.username}&password=${this._user.password}&${token}=1&remember=yes&task=user.login&option=com_users`;
        const loginResponse = await request({
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
        loginResponse.headers['set-cookie'].forEach((cookie) => {
            this.cookies += cookie.split(';')[0] + '; ';
        });
    }
}
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map