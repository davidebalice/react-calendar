const numberOfEvents = 40;
const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
const minutes = [0, 10, 15, 20, 30, 40, 45];
const words = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "est",
];

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFromArray = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createTitleEvent(words) {
  const shuffledWords = shuffleArray(words.slice());
  const numberOfWords = getRandomNumber(7, shuffledWords.length);
  const sentenceWords = shuffledWords.slice(0, numberOfWords);
  const sentence = sentenceWords.join(" ");

  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
}

const currentDate = new Date();

const events = [];

for (let i = 1; i <= numberOfEvents; i++) {
  const randomDay = getRandomNumber(1, 30);
  const day = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    randomDay
  );

  const randomHour = getRandomFromArray(hours);
  const randomMinute = getRandomFromArray(minutes);

  day.setHours(randomHour);
  day.setMinutes(randomMinute);

  const formattedDay = formatDate(day);

  const randomTitle = createTitleEvent(words);

  const event = {
    title: randomTitle,
    start: formattedDay,
  };

  events.push(event);
}

export const eventList = events;
