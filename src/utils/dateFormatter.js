export const dateFormatter = (stringDate) => {
  const date = new Date(stringDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return day + "/" + month + "/" + year;
};
