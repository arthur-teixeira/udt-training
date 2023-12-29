import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Todo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    completed: string;

    public initialize(name: string, completed: string) {
        this.name = name;
        this.completed = completed
    }
}

