/** userId 로 카운팅해서 Map을 반환하는 함수 */
const countByUserId = (dataList: { userId: number }[]): Map<number, number> => {
  return dataList.reduce((acc, reservation) => {
    const { userId } = reservation;

    acc.set(userId, (acc.get(userId) || 0) + 1);

    return acc;
  }, new Map<number, number>());
};

const selectRandomItem = <T>(list: T[]): T => {
  return list[Math.floor(Math.random() * list.length)];
};

export { countByUserId, selectRandomItem };
