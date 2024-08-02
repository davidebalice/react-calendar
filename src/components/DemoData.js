export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const currentDate = new Date();
const today = new Date(currentDate.getTime());
today.setHours(8);
today.setMinutes(45);
const formattedToday = formatDate(today);
export const newEvent1 = {
  title: "today",
  start: formattedToday,
};

const nextDay = new Date(currentDate.getTime() + 48 * 60 * 60 * 1000);
nextDay.setHours(10);
nextDay.setMinutes(30);
const formattedNextDay = formatDate(nextDay);
export const newEvent2 = {
  title: "aaaaaaaaaaaa",
  start: formattedNextDay,
};

const previousDay = new Date(currentDate.getTime() - 48 * 60 * 60 * 1000);
previousDay.setHours(9);
previousDay.setMinutes(0);
const formattedPreviousDay = formatDate(previousDay);
export const newEvent3 = {
  title: "bbbbbbbbbbbbbb",
  start: formattedPreviousDay,
};

const anotherDay = new Date(currentDate.getTime() - 64 * 60 * 60 * 1000);
anotherDay.setHours(13);
anotherDay.setMinutes(0);
const formattedAnotherDay = formatDate(anotherDay);
export const newEvent4 = {
  title: "ccccccccccccccccc",
  start: formattedAnotherDay,
};
