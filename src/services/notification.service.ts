import * as request from 'request-promise';
import { Endpoint } from "../models/endpoint.model";
import {Transporter} from 'nodemailer';
import { SessionService } from './session.service';
import { EndpointService } from './endpoint.service';
import { Subscriber } from '../entities/subscriber.entity';

export class NotificationService{
    
    constructor(private _transporter: Transporter,
        private _url: string,
        private _sessionService: SessionService,
        private _endpointService: EndpointService
        ){}


    private findDiff(oldContent: string, currentContent: string): string {
        if(oldContent.length == currentContent.length){
            return "";
        }
    
        let i = 0;
        while(oldContent.charAt(i) == currentContent.charAt(i)){
            i++;
        }
        let diff = currentContent.slice(i, i + (currentContent.length - oldContent.length));
        return diff;
    }
    
    private async checkNewNotif(endpoint: Endpoint): Promise<void> {
        let currentHtml: string = await (await request.get(this._url + endpoint.id, {headers: {'Cookie': this._sessionService.cookies}}));
        let currentContent: string = this._endpointService.stripHtml(currentHtml);
        let diff: string = this.findDiff(endpoint.content, currentContent);

        if(diff != ""){
            endpoint.content = currentContent;
            const subscribers: Subscriber[] = (await this._endpointService.getEndpointWithSubscribers(endpoint.id)).subscribers;
            if(subscribers){
                this.sendMail(endpoint.title, diff, subscribers);
            } 
        }
        
    }

    private sendMail(subject: string, text: string, subscribers: Subscriber[]): void{
        this._transporter.sendMail({
            to: subscribers.map((subscriber: Subscriber): string => subscriber.email ),
            subject,
            text
        },
        (err, info) => {
            if(err){
                console.log(err);
            }
        })
    }

    async init(reloadTime: number): Promise<void>{
        this._endpointService.endpoints.forEach(async endpoint => {
            let currentHtml = await (await request.get(this._url + endpoint.id, {headers: {'Cookie': this._sessionService.cookies}}));
            endpoint.content = this._endpointService.stripHtml(currentHtml);
        });

        setInterval(() => {
            this._endpointService.endpoints.forEach(endpoint => this.checkNewNotif(endpoint));
        }, reloadTime);
    }

}