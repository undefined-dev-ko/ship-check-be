import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Desk {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  position: string;

  @Column()
  fixed_user_name: string;
}
