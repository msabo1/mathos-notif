"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
class ExpressApi {
    constructor(_subscribersController) {
        this._subscribersController = _subscribersController;
    }
    init() {
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
exports.ExpressApi = ExpressApi;
//# sourceMappingURL=express.js.map