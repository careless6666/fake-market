import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user")
export class UserInfo {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    public id: string;

    @Column({ type: 'text', nullable: false })
    public email: string | undefined;

    @Column({name: 'first_name', type: 'text', nullable: true})
    public firstName: string| undefined;

    @Column({name: 'last_name', type: 'text', nullable: true})
    public lastName: string| undefined;

    @Column({name: "password", type: 'text', nullable: false})
    public password: string| undefined;
}