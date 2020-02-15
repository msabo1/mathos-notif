"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const subscriber_entity_1 = require("./subscriber.entity");
let Endpoint = class Endpoint extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], Endpoint.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Endpoint.prototype, "title", void 0);
__decorate([
    typeorm_1.ManyToMany(type => subscriber_entity_1.Subscriber, subscriber => subscriber.endpoints),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Endpoint.prototype, "subscribers", void 0);
Endpoint = __decorate([
    typeorm_1.Entity('endpoints')
], Endpoint);
exports.Endpoint = Endpoint;
//# sourceMappingURL=endpoint.entity.js.map