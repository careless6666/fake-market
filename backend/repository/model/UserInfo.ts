import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user")
export class UserInfo {

    @PrimaryGeneratedColumn()
    public id: string | undefined;

    @Column()
    public email: string | undefined;

    @Column('first_name')
    public firstName: string| undefined;

    @Column('last_name')
    public lastName: string| undefined;

    @Column()
    public password: string| undefined;
}