import { Entity, BaseEntity, PrimaryColumn, ManyToMany } from 'typeorm';
import { Endpoint } from './endpoint.entity';

@Entity('subscribers')
export class Subscriber extends BaseEntity {
    @PrimaryColumn()
    email: string;

    @ManyToMany(type => Endpoint, endpoint => endpoint.subscribers)
    endpoints: Endpoint[];
}