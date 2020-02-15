import * as express from 'express';
import { SubscribersController } from './controllers/subscribers.controller';
export declare class ExpressApi {
    private _subscribersController;
    app: express.Application;
    constructor(_subscribersController: SubscribersController);
    init(): void;
}
