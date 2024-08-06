import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, Like } from "typeorm";
import { GetRankRequest, GetRankResponse } from "./dto";
import { Reservation } from "../reservation/reservation.entity";
import { User } from "../user/user.entity";

@Injectable()
export class RankService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async getRankList({
    reservedMonth,
  }: GetRankRequest): Promise<GetRankResponse> {
    if (!reservedMonth) return;

    const reservationList = await this.dataSource.manager.find(Reservation, {
      where: { reservedAt: Like(`${reservedMonth}%`) },
      relations: ["user"],
    });

    const reservationCountMap = reservationList.reduce((acc, reservation) => {
      const userId = reservation.user.id;

      acc.set(userId, (acc.get(userId) || 0) + 1);

      return acc;
    }, new Map<number, number>());

    // 예약횟수가 카운팅 된 랭킹 리스트
    const reservationRankList = Array.from(reservationCountMap).map(
      ([userId, count], i) => ({
        id: i,
        user: reservationList.find(
          (reservation) => reservation.user.id === userId
        ).user,
        count,
      })
    );

    const top3AttendanceList = reservationRankList
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    const mostCancelUser = reservationList
      .filter(({ deletedAt }) => deletedAt)
      .reduce((acc, reservation) => {
        const userId = reservation.user.id;

        acc.set(userId, (acc.get(userId) || 0) + 1);

        return acc;
      }, new Map<number, number>());

    const mostCancelRank = Array.from(mostCancelUser)
      .map(([userId, count], i) => ({
        id: i,
        user: reservationList.find(
          (reservation) => reservation.user.id === userId
        ).user,
        count,
      }))
      .sort((a, b) => b.count - a.count);

    const userList = await this.dataSource.manager.find(User);

    const reservationUserIdList = reservationList.map(
      (reservation) => reservation.userId
    );

    // 한 번도 출석하지 않은 유저 리스트
    const ghostUserList = userList.filter(
      ({ id }) => !reservationUserIdList.includes(id)
    );

    // 예약횟수가 가장 적은 유저를 reservationList 에서 추출
    const leastReservationRank = reservationRankList.sort(
      (a, b) => a.count - b.count
    );

    const ghostRank = (() => {
      // 한 번도 출석하지 않은 유저가 있다면 랜덤으로 선정
      if (ghostUserList.length) {
        const ghostUser =
          ghostUserList[Math.floor(Math.random() * ghostUserList.length)];

        return {
          id: 5,
          user: ghostUser,
          count: 0,
        };
      }

      // 모두 출석했다면 예약횟수가 가장 적은 유저를 선정
      return leastReservationRank[0];
    })();

    return {
      attendance: top3AttendanceList,
      cancel: mostCancelRank[0],
      ghost: ghostRank,
    };
  }
}
