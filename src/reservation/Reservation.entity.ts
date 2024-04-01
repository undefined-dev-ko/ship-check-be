import { User } from "src/auth/user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => User)
  @Column()
  user: User;

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

  @OneToOne((type) => User)
  @Column()
  fixedUser?: User;

  @OneToMany((type) => Item, (item) => item.seat)
  @Column()
  items: Item[];

  // itemIds: number[]; mapping table 로 고려

  // @OneToOne((type) => Reservation) one to many 로 수정
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

  @ManyToOne(() => Seat, (seat) => seat.items)
  @Column()
  seat?: Seat;
}
