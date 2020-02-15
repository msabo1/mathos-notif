import { BaseEntity } from 'typeorm';
import { Endpoint } from './endpoint.entity';
export declare class Subscriber extends BaseEntity {
    email: string;
    endpoints: Endpoint[];
}
