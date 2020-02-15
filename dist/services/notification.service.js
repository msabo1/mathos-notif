"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise");
class NotificationService {
    constructor(_transporter, _url, _sessionService, _endpointService) {
        this._transporter = _transporter;
        this._url = _url;
        this._sessionService = _sessionService;
        this._endpointService = _endpointService;
    }
    findDiff(oldContent, currentContent) {
        if (oldContent.length == currentContent.length) {
            return "";
        }
        let i = 0;
        while (oldContent.charAt(i) == currentContent.charAt(i)) {
            i++;
        }
        let diff = currentContent.slice(i, i + (currentContent.length - oldContent.length));
        return diff;
    }
    async checkNewNotif(endpoint) {
        let currentHtml = await (await request.get(this._url + endpoint.id, { headers: { 'Cookie': this._sessionService.cookies } }));
        let currentContent = this._endpointService.stripHtml(currentHtml);
        let diff = this.findDiff(endpoint.content, currentContent);
        if (diff != "") {
            endpoint.content = currentContent;
            const subscribers = (await this._endpointService.getEndpointWithSubscribers(endpoint.id)).subscribers;
            if (subscribers) {
                this.sendMail(endpoint.title, diff, subscribers);
            }
        }
    }
    sendMail(subject, text, subscribers) {
        this._transporter.sendMail({
            to: subscribers.map((subscriber) => subscriber.email),
            subject,
            text
        }, (err, info) => {
            if (err) {
                console.log(err);
            }
        });
    }
    async init(reloadTime) {
        this._endpointService.endpoints.forEach(async (endpoint) => {
            let currentHtml = await (await request.get(this._url + endpoint.id, { headers: { 'Cookie': this._sessionService.cookies } }));
            endpoint.content = this._endpointService.stripHtml(currentHtml);
        });
        setInterval(() => {
            this._endpointService.endpoints.forEach(endpoint => this.checkNewNotif(endpoint));
        }, reloadTime);
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map