import { SubscriberService } from "../../services/subscriber.service";
import { Request, Response } from "express";
export declare class SubscribersController {
    private _subscriberService;
    constructor(_subscriberService: SubscriberService);
    getSubscriber(req: Request, res: Response): Promise<void>;
    subsribeToEndpoint(req: Request, res: Response): Promise<void>;
}
