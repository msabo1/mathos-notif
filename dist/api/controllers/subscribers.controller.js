"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SubscribersController {
    constructor(_subscriberService) {
        this._subscriberService = _subscriberService;
    }
    async getSubscriber(req, res) {
        const email = req.params.email;
        const subscriber = await this._subscriberService.getSubscriber(email);
        res.json(subscriber);
    }
    async subsribeToEndpoint(req, res) {
        const email = req.params.email;
        const endpointId = req.body.endpoint;
        const subscriber = await this._subscriberService.subscribeToEndpoint(email, endpointId);
        res.json(subscriber);
    }
}
exports.SubscribersController = SubscribersController;
//# sourceMappingURL=subscribers.controller.js.map