import { BaseEntity } from 'typeorm';
import { Subscriber } from './subscriber.entity';
export declare class Endpoint extends BaseEntity {
    id: number;
    title: string;
    subscribers: Subscriber[];
}
