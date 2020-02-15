import { Endpoint } from "../entities/endpoint.entity";
import { Endpoint as EndpointModel} from '../models/endpoint.model'
import * as request from 'request-promise';
import {config} from 'node-config-ts';

export class EndpointService {

    endpoints: EndpointModel[] = [];

    constructor(){}

    stripHtml(html: string): string{
        //removes whole scripts, some load specific random tokens and all html tags

        return html.replace(/(<script.*?>(.|\n)*?<\/script>)|(<div id="ccomment.*?>(.|\n)*?<\/div>)|(<[^>]*>?)/gm, '');
    }

    async createEndpoint(id: number): Promise<Endpoint>{
        const content: string = await request.get(config.baseUrl + id);
        
        const title = content.match(/<title>(.*?)<\/title>/)[1];

        let endpointModel: EndpointModel = {
            id,
            title,
            content: this.stripHtml(content)
        };
        this.endpoints = [...this.endpoints, endpointModel];

        let endpoint: Endpoint = new Endpoint();
        endpoint.id = id;
        endpoint.title = title;
        return await endpoint.save();
    }

    async getEndpoint(id: number): Promise<Endpoint>{
        let endpoint: Endpoint = await Endpoint.findOne({where: {id}});

        if(!endpoint){
            endpoint = await this.createEndpoint(id);
        }

        return endpoint;
    }

    async getEndpointWithSubscribers(id: number): Promise<Endpoint>{
        let endpoint: Endpoint = await Endpoint.findOne({where: {id}, relations: ['subscribers']});

        if(!endpoint){
            endpoint = await this.createEndpoint(id);
        }

        return endpoint;
    }

    async getEndpoints(): Promise<EndpointModel[]>{
        const endpoints: Endpoint[] = await Endpoint.find();
        return endpoints.map((endpoint: Endpoint): EndpointModel => ({id: endpoint.id, title: endpoint.title}));
    }

    async init(){
        this.endpoints = await this.getEndpoints();
    }
}