"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const notification_service_1 = require("./services/notification.service");
const node_config_ts_1 = require("node-config-ts");
const session_service_1 = require("./services/session.service");
const typeorm_1 = require("typeorm");
const endpoint_entity_1 = require("./entities/endpoint.entity");
const subscriber_entity_1 = require("./entities/subscriber.entity");
const endpoint_service_1 = require("./services/endpoint.service");
const subscriber_service_1 = require("./services/subscriber.service");
const subscribers_controller_1 = require("./api/controllers/subscribers.controller");
const express_1 = require("./api/express");
(async () => {
    await typeorm_1.createConnection(Object.assign(Object.assign({}, node_config_ts_1.config.database.connection), { entities: [endpoint_entity_1.Endpoint, subscriber_entity_1.Subscriber] }));
    const sessionService = new session_service_1.SessionService(node_config_ts_1.config.mathosUser.credentials, node_config_ts_1.config.baseUrl);
    const endpointService = new endpoint_service_1.EndpointService();
    const notificationService = new notification_service_1.NotificationService(nodemailer.createTransport(node_config_ts_1.config.mail), node_config_ts_1.config.baseUrl, sessionService, endpointService);
    const subscriberService = new subscriber_service_1.SubscriberService(endpointService);
    const subscribersController = new subscribers_controller_1.SubscribersController(subscriberService);
    const express = new express_1.ExpressApi(subscribersController);
    express.init();
    await sessionService.login();
    await endpointService.init();
    notificationService.init(node_config_ts_1.config.reloadTime);
})();
//# sourceMappingURL=index.js.map