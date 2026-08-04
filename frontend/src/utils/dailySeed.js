export const getDailySeed = () => {
  const today = new Date();

  return (
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate()
  );
};

