import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { SubscribersController } from './controllers/subscribers.controller';

export class ExpressApi {

    app: express.Application;

    constructor(private _subscribersController: SubscribersController){
    }

    init(){
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());

        this.app.use(express.static(path.join(__dirname, '../../static')));

        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../../static/index.html'));
        });

        this.app.get('/api/subscribers/:email', this._subscribersController.getSubscriber.bind(this._subscribersController));
        this.app.post('/api/subscribers/:email/subscription', this._subscribersController.subsribeToEndpoint.bind(this._subscribersController));

        this.app.listen(process.env.PORT || 3000);
    }
}

