export const formatTimeLeft = (timeString: string) => {
  const [hours, minutes, seconds] = timeString.split(":");
  return { hours, minutes, seconds };
};
