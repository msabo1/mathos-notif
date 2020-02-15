import { Subscriber } from "../entities/subscriber.entity";
import { EndpointService } from "./endpoint.service";
export declare class SubscriberService {
    private _endpointService;
    constructor(_endpointService: EndpointService);
    getSubscriber(email: string): Promise<Subscriber>;
    subscribeToEndpoint(email: string, endpointId: number): Promise<Subscriber>;
}
