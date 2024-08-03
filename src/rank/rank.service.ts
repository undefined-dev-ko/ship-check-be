import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, Like } from "typeorm";
import { GetRankResponse } from "./dto";
import { Rank } from "./rank.entity";
import { Reservation } from "../reservation/reservation.entity";

@Injectable()
export class RankService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async getRankList(): Promise<GetRankResponse> {
    // 1. 예약 정보 중에 이번 달 (YYYY-MM) 예약 정보만 가져온다.

    // YYYY-MM 형식으로 지난 달을 가져온다.
    const currentMonth = new Date().toISOString().slice(0, 7);

    const reservationList = await this.dataSource.manager.find(Reservation, {
      where: { reservedAt: Like(`${currentMonth}%`) },
      relations: ["user"],
    });

    const top3AttendanceList = (() => {
      const attendanceList = reservationList.reduce((acc, reservation) => {
        const userId = reservation.user.id;
        acc.set(userId, (acc.get(userId) || 0) + 1);
        return acc;
      }, new Map<number, number>());

      const attendanceUserList = Array.from(attendanceList).map(
        ([userId, count], i) => ({
          id: i,
          user: reservationList.find(
            (reservation) => reservation.user.id === userId
          ).user,
          count,
        })
      );

      return attendanceUserList.sort((a, b) => b.count - a.count).slice(0, 3);
    })();

    return {
      attendance: top3AttendanceList,
      ghost: undefined,
      cancel: undefined,
    };
  }
}
