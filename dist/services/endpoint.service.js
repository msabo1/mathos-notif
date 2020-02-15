"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endpoint_entity_1 = require("../entities/endpoint.entity");
const request = require("request-promise");
const node_config_ts_1 = require("node-config-ts");
class EndpointService {
    constructor() {
        this.endpoints = [];
    }
    stripHtml(html) {
        return html.replace(/(<script.*?>(.|\n)*?<\/script>)|(<div id="ccomment.*?>(.|\n)*?<\/div>)|(<[^>]*>?)/gm, '');
    }
    async createEndpoint(id) {
        const content = await request.get(node_config_ts_1.config.baseUrl + id);
        const title = content.match(/<title>(.*?)<\/title>/)[1];
        let endpointModel = {
            id,
            title,
            content: this.stripHtml(content)
        };
        this.endpoints = [...this.endpoints, endpointModel];
        let endpoint = new endpoint_entity_1.Endpoint();
        endpoint.id = id;
        endpoint.title = title;
        return await endpoint.save();
    }
    async getEndpoint(id) {
        let endpoint = await endpoint_entity_1.Endpoint.findOne({ where: { id } });
        if (!endpoint) {
            endpoint = await this.createEndpoint(id);
        }
        return endpoint;
    }
    async getEndpointWithSubscribers(id) {
        let endpoint = await endpoint_entity_1.Endpoint.findOne({ where: { id }, relations: ['subscribers'] });
        if (!endpoint) {
            endpoint = await this.createEndpoint(id);
        }
        return endpoint;
    }
    async getEndpoints() {
        const endpoints = await endpoint_entity_1.Endpoint.find();
        return endpoints.map((endpoint) => ({ id: endpoint.id, title: endpoint.title }));
    }
    async init() {
        this.endpoints = await this.getEndpoints();
    }
}
exports.EndpointService = EndpointService;
//# sourceMappingURL=endpoint.service.js.map