import { Transporter } from 'nodemailer';
export declare class Notifier {
    private _transporter;
    private _url;
    constructor(_transporter: Transporter);
    private stripHtml;
    private getDiff;
    private checkNewNotif;
    init(): void;
}
