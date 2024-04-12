import { Reservation } from "src/reservation/Reservation.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

@Entity()
// @Unique(["email"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // TODO: unique 에러나는 부분 물어보기.
  @Column({ unique: true })
  // @Column()
  email: string;

  @Column()
  team: "backend" | "frontend" | "design" | "etc";

  @Column()
  name: string; // google 에서 풀네임을 줌.

  @Column()
  photo: string;

  @OneToMany((type) => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}
