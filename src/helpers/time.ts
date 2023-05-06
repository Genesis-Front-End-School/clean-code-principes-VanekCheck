export const getMinutes = (durationInSeconds: number): string => {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds - minutes * 60;

  return `${minutes}.${seconds}`;
};

export const convertToLocalDateString = (date: string): string => {
  return new Date(date).toLocaleDateString();
};
