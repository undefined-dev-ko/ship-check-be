import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Desnpmk {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  position: string;

  @Column()
  fixed_user_name: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  deleted_at: Date;
}
