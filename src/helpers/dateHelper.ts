const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};

export const getGameTimeString = (value: number) => {
  const date = new Date(value * 1000);
  return (
    [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("-") +
    " " +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(":")
  );
};

export const getRealTimeLeftString = (value: number) => {
  const totalMinutes = Math.floor(value / 60);
  return [
    padTo2Digits(Math.floor(totalMinutes / 60)),
    padTo2Digits(totalMinutes % 60),
    padTo2Digits(value % 60),
  ].join(":");
};
