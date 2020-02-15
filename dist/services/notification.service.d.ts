import { Transporter } from 'nodemailer';
import { SessionService } from './session.service';
import { EndpointService } from './endpoint.service';
export declare class NotificationService {
    private _transporter;
    private _url;
    private _sessionService;
    private _endpointService;
    constructor(_transporter: Transporter, _url: string, _sessionService: SessionService, _endpointService: EndpointService);
    private findDiff;
    private checkNewNotif;
    private sendMail;
    init(reloadTime: number): Promise<void>;
}
