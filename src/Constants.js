const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthsOfYear = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.getMonth();
const year = currentDate.getFullYear();

const currentDay = daysOfWeek[currentDate.getDay()];
const currentMonth = monthsOfYear[month];

function convertDate(dateString) {
  const dateInString = dateString;
  const dateObj = new Date(dateInString);

  const day = dateObj.toLocaleString("default", { weekday: "short" });
  const dateNum = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "short" });

  const formattedDate = `${day}, ${dateNum} ${month}`;

  return formattedDate;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function imageURL(id) {
  switch (id) {
    case 2:
      return "images/Thunderstorm.png";

    case 3:
      return "images/LightRain.png";

    case 5:
      return "images/HeavyRain.png";

    case 6:
      return "images/Snow.pngg";

    case 7:
      return "images/Hail.png";

    case 8:
      return "images/Clear.png";

    default:
      return "images/LightCloud.png";
  }
}

export {
  daysOfWeek,
  monthsOfYear,
  day,
  currentDate,
  currentDay,
  currentMonth,
  year,
  capitalizeFirstLetter,
  imageURL,
  convertDate,
};
