import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("auth_info")
export class AuthInfo {

    @PrimaryGeneratedColumn()
    public id: string | undefined;

    @Column()
    public uid: string | undefined;

    @Column()
    public payload: string| undefined;

    @Column()
    public grantId: string| undefined;
}