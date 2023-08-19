import axios from "axios";

export const fetchFromAPI = async (city) => {
  const apiKey = process.env.REACT_APP_API_KEY;

  const options = {
    method: "GET",
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
