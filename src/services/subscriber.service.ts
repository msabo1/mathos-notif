import { Subscriber } from "../entities/subscriber.entity";
import { EndpointService } from "./endpoint.service";

export class SubscriberService {

    constructor(private _endpointService: EndpointService){}

    async getSubscriber(email: string): Promise<Subscriber>{
        let subscriber: Subscriber = await Subscriber.findOne({where: {email}, relations: ['endpoints']});
        if(!subscriber){
            subscriber = new Subscriber();
            subscriber.email = email;
            await subscriber.save();
        }

        return subscriber;
    }

    async subscribeToEndpoint(email: string, endpointId: number): Promise<Subscriber>{
        let subscriber: Subscriber = await this.getSubscriber(email);
        let endpoint = await this._endpointService.getEndpoint(endpointId);
        if(subscriber.endpoints){
            subscriber.endpoints = [...subscriber.endpoints, endpoint];
        }else{
            subscriber.endpoints = [endpoint];
        }
        
        await subscriber.save();
        return subscriber;
    }
}