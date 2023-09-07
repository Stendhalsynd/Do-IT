function dateConverter(dateString) {
  const inputDate = new Date(dateString);

  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based, so add 1
  const day = inputDate.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}.${month}.${day}`;

  return formattedDate;
}

module.exports = dateConverter;
