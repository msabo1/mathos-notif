import { Entity, BaseEntity, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Subscriber } from './subscriber.entity';

@Entity('endpoints')
export class Endpoint extends BaseEntity {
    @PrimaryColumn()
    id: number;
    
    @Column()
    title: string;

    @ManyToMany(type => Subscriber, subscriber => subscriber.endpoints)
    @JoinTable()
    subscribers: Subscriber[];
}