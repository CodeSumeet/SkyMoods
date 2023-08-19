import React, { createContext, useEffect, useState } from "react";
import { fetchFromAPI } from "../fetchFromAPI";
import { useParams } from "react-router-dom";
import Left from "./Left";
import { Grid, Stack } from "@mui/material";
import Main from "./Main";
import { currentDate } from "../Constants";

const Data = createContext({
  toggleDrawer: () => {},
  setTemperature: () => {},
  tempCelsius: 0,
  tempFahrenheit: 0,
});

const Home = () => {
  const { city } = useParams();
  const [weatherData, setWeatherData] = useState([]);
  const [Temperature, setTemperature] = useState(null);
  const [tempCelsius, setTempCelcius] = useState(0);
  const [tempFahrenheit, setTempFahrenheit] = useState(0);
  const [firstDigit, setFirstDigit] = useState(0);
  const [tempUnit, setTempUnit] = useState(true);
  const [todayDate, setTodayDate] = useState("");
  const [userClickedDayIndex, setUserClickedDayIndex] = useState(null);
  const [userClickedDate, setUserClickedDate] = useState(null);

  const [nextFiveDaysData, setNextFiveDaysData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFromAPI(city);
        setWeatherData(data);
        const filteredData = getUniqueDaysData(data);
        setNextFiveDaysData(filteredData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [city]);

  const getUniqueDaysData = (data) => {
    const uniqueDays = new Set();

    const nextFiveDaysUniqueData = data.list.slice(5);

    const filteredData = nextFiveDaysUniqueData.filter((item) => {
      const day = item.dt_txt.split(" ")[0];

      if (
        !uniqueDays.has(day) &&
        !uniqueDays.has(currentDate) &&
        uniqueDays.size < 5
      ) {
        uniqueDays.add(day);
        return true;
      }

      return false;
    });

    return filteredData;
  };

  return (
    <Data.Provider
      value={{
        cityName: city,
        weatherData,
        Temperature,
        setTemperature,
        tempCelsius,
        setTempCelcius,
        tempFahrenheit,
        setTempFahrenheit,
        nextFiveDaysData,
        firstDigit,
        setFirstDigit,
        tempUnit,
        setTempUnit,
        todayDate,
        setTodayDate,
        userClickedDayIndex,
        setUserClickedDayIndex,
        userClickedDate,
        setUserClickedDate,
      }}
    >
      <Stack
        width={"100%"}
        height={"100%"}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            md={3}
            xl={3}
          >
            <Left />
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
          >
            <Main />
          </Grid>
        </Grid>
      </Stack>
    </Data.Provider>
  );
};

export default Home;
export { Data };
