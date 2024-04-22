export const changeDatetoTZ = (date: Date) => {
  const dt = new Date(
    date.toLocaleString('en-US', {
      timeZone: 'Asia/Kuala_Lumpur',
    }),
  );

  return dt;
};
