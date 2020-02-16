import * as nodemailer from 'nodemailer';
import * as request from 'request-promise';
import { NotificationService } from './services/notification.service';
import {config} from 'node-config-ts';
import { SessionService } from './services/session.service';
import { createConnection } from 'typeorm';
import { Endpoint } from './entities/endpoint.entity';
import { Subscriber } from './entities/subscriber.entity';
import { EndpointService } from './services/endpoint.service';
import { SubscriberService } from './services/subscriber.service';
import { SubscribersController } from './api/controllers/subscribers.controller';
import { ExpressApi } from './api/express';

(async () => {
  await createConnection({
    ...config.database.connection,
    entities: [Endpoint, Subscriber]
  });
  
  const sessionService: SessionService = new SessionService(config.mathosUser.credentials, config.baseUrl);
  const endpointService: EndpointService = new EndpointService();
  const notificationService: NotificationService = new NotificationService(nodemailer.createTransport(config.mail), config.baseUrl, sessionService, endpointService);
  const subscriberService: SubscriberService = new SubscriberService(endpointService);

  const subscribersController: SubscribersController = new SubscribersController(subscriberService);

  const express: ExpressApi = new ExpressApi(subscribersController);
  express.init();
  
  await sessionService.login();

  await endpointService.init();
  
  notificationService.init(config.reloadTime);

  //
  setInterval(async () => {
    await request('https://mathos-notif.herokuapp.com/');
  }, 600000)
  
})();



