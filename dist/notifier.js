"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require("node-fetch");
const endpoints_1 = require("./endpoints");
class Notifier {
    constructor(_transporter) {
        this._transporter = _transporter;
        this._url = 'https://www.mathos.unios.hr/index.php/';
    }
    stripHtml(html) {
        return html.replace(/(<script.*?>(.|\n)*?<\/script>)|(<div id="ccomment.*?>(.|\n)*?<\/div>)|(<[^>]*>?)/gm, '');
    }
    getDiff(oldContent, currentContent) {
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
        let currentHtml = await (await fetch(this._url + endpoint.id)).text();
        let currentContent = this.stripHtml(currentHtml);
        let diff = this.getDiff(endpoint.content, currentContent);
        if (diff != "") {
            endpoint.content = currentContent;
            const mailOptions = {
                from: 'mathos.obavijesti@gmail.com',
                to: 'mariosabo2@gmail.com',
                subject: endpoint.title,
                text: diff
            };
            this._transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
        else {
            console.log('no change');
        }
    }
    init() {
        endpoints_1.endpoints.forEach(async (endpoint) => {
            let currentHtml = await (await fetch(this._url + endpoint.id, { headers: { 'Cookie': 'b331aae052f2273eac4b1756cf804cc7=m491s1s4d9io6vov0b9qvvub33; joomla_user_state=logged_in; joomla_remember_me_cfbc1644ca094593328a354bb7318fbc=8LPrQpEyYwpTVfW7.Tgv87pqlkqbFkgCe0t3f;' } })).text();
            console.log(currentHtml);
            endpoint.content = this.stripHtml(currentHtml);
        });
        setInterval(() => {
            endpoints_1.endpoints.forEach(endpoint => this.checkNewNotif(endpoint));
        }, 20000);
    }
}
exports.Notifier = Notifier;
//# sourceMappingURL=notifier.js.map