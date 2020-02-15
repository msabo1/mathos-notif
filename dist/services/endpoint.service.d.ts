import { Endpoint } from "../entities/endpoint.entity";
import { Endpoint as EndpointModel } from '../models/endpoint.model';
export declare class EndpointService {
    endpoints: EndpointModel[];
    constructor();
    stripHtml(html: string): string;
    createEndpoint(id: number): Promise<Endpoint>;
    getEndpoint(id: number): Promise<Endpoint>;
    getEndpointWithSubscribers(id: number): Promise<Endpoint>;
    getEndpoints(): Promise<EndpointModel[]>;
    init(): Promise<void>;
}
