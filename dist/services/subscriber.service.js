"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscriber_entity_1 = require("../entities/subscriber.entity");
class SubscriberService {
    constructor(_endpointService) {
        this._endpointService = _endpointService;
    }
    async getSubscriber(email) {
        let subscriber = await subscriber_entity_1.Subscriber.findOne({ where: { email }, relations: ['endpoints'] });
        if (!subscriber) {
            subscriber = new subscriber_entity_1.Subscriber();
            subscriber.email = email;
            await subscriber.save();
        }
        return subscriber;
    }
    async subscribeToEndpoint(email, endpointId) {
        let subscriber = await this.getSubscriber(email);
        let endpoint = await this._endpointService.getEndpoint(endpointId);
        if (subscriber.endpoints) {
            subscriber.endpoints = [...subscriber.endpoints, endpoint];
        }
        else {
            subscriber.endpoints = [endpoint];
        }
        await subscriber.save();
        return subscriber;
    }
}
exports.SubscriberService = SubscriberService;
//# sourceMappingURL=subscriber.service.js.map