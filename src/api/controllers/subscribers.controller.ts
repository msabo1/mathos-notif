import { SubscriberService } from "../../services/subscriber.service";
import { Request, Response } from "express";
import { Subscriber } from "../../entities/subscriber.entity";

export class SubscribersController {
    constructor(private _subscriberService: SubscriberService){
    }

    async getSubscriber(req: Request, res: Response) {
        const email: string = req.params.email;
        const subscriber: Subscriber = await this._subscriberService.getSubscriber(email);
        res.json(subscriber);
    }

    async subsribeToEndpoint(req: Request, res: Response){

        console.log(req.headers)
        const email: string = req.params.email;
        const endpointId = req.body.endpoint;
        const subscriber: Subscriber = await this._subscriberService.subscribeToEndpoint(email, endpointId);
        res.json(subscriber);
    }
}