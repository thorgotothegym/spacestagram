export const extractDate = () => {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  return today.toISOString().slice(0, 10)
};
