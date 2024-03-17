import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
} from "typeorm";

@Entity()
@Unique(["email"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  team: "backend" | "frontend" | "design" | "etc";

  @Column()
  name: string; // google 에서 풀네임을 줌.

  @Column()
  photo: string;
}
