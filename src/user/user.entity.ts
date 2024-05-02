import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity("user")
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  team: string;
}
