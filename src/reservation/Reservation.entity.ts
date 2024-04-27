import { User } from "src/user/user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  BaseEntity,
  JoinColumn,
} from "typeorm";

@Entity()
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User)
  user: User;

  @JoinColumn()
  userId: number;

  @Column()
  seatId: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;
}

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deskNo: number;

  reservation?: Reservation;
}

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: "monitor" | "arm" | "charger";

  @Column()
  memo?: string;
}
