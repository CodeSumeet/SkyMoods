import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Stack, SwipeableDrawer } from "@mui/material";
import MyLocationRoundedIcon from "@mui/icons-material/MyLocationRounded";
import { MdLocationOn } from "react-icons/md";
import theme from "../theme";
import { capitalizeFirstLetter, imageURL, convertDate } from "../Constants";
import { useContext } from "react";
import { Data } from "./Home";
import Drawer from "./Drawer";

const Left = () => {
  const {
    cityName,
    weatherData,
    Temperature,
    setTemperature,
    tempCelcius,
    setTempCelcius,
    tempFahrenheit,
    setTempFahrenheit,
    firstDigit,
    setFirstDigit,
    tempUnit,
    todayDate,
    setTodayDate,
    nextFiveDaysData,
    userClickedDayIndex,
    userClickedDate,
    setUserClickedDate,
  } = useContext(Data);

  const [city, setCity] = useState("");
  const [weatherDesc, setWeatherDesc] = useState("");
  const [drawerState, setDrawerState] = useState(false);

  const url = `https://www.google.com/maps/place/${cityName}`;

  useEffect(() => {
    if (weatherData && weatherData.list) {
      let displayedTemp =
        userClickedDayIndex === null
          ? weatherData.list[0].main.temp
          : nextFiveDaysData[userClickedDayIndex].main.temp;
      const calculatedTempCelcius = Math.floor(displayedTemp - 273.15);

      setTempCelcius(calculatedTempCelcius);

      const calculatedTempFahrenheit = Math.floor(
        1.8 * calculatedTempCelcius + 32
      );
      setTempFahrenheit(calculatedTempFahrenheit);
      setTemperature(calculatedTempCelcius);

      const IdFirstDigit = parseInt(
        String(weatherData.list[0].weather[0].id)[0],
        10
      );

      setFirstDigit(IdFirstDigit);

      setCity(weatherData.city.name);
      setWeatherDesc(weatherData.list[0].weather[0].description);

      const convertedDate = convertDate(weatherData.list[0].dt_txt);
      const userConvertedDate = convertDate(
        userClickedDayIndex === null
          ? null
          : nextFiveDaysData[userClickedDayIndex].dt_txt
      );

      setTodayDate(convertedDate);
      setUserClickedDate(userConvertedDate);
    }
  }, [
    weatherData,
    firstDigit,
    userClickedDayIndex,
    nextFiveDaysData,
    setFirstDigit,
    setTempCelcius,
    setTempFahrenheit,
    setTemperature,
    setTodayDate,
    setUserClickedDate,
  ]);

  function toggleDrawer() {
    setDrawerState((prevState) => !prevState);
  }

  return (
    <Data.Provider
      value={{
        toggleDrawer,
        setTemperature,
        tempCelcius,
        tempFahrenheit,
      }}
    >
      <Stack
        padding={["3vh 3vw", "3vh 1vw"]}
        style={{ backgroundColor: theme.palette.main }}
        position={"relative"}
        height={"100%"}
        gap={4}
      >
        <Stack
          height={"40px"}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Button
            variant="contained"
            style={{
              backgroundColor: theme.palette.gray,
              textTransform: "none",
              color: "white",
              borderRadius: "0px",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
            onClick={() => {
              toggleDrawer();
            }}
          >
            Search for places
          </Button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton
              size={"medium"}
              style={{
                backgroundColor: theme.palette.gray,
                color: "white",
                boxShadow:
                  "0 4px 6px 0 rgba(0, 0, 0, 0.2), 0 6px 5px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <MyLocationRoundedIcon style={{ fontSize: "20px" }} />
            </IconButton>
          </a>
        </Stack>
        {/*  */}
        <Box
          position="relative"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          width="calc(100% + 3vw)"
          height="300px"
          marginLeft={"-2vw"}
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            style={{
              backgroundImage: "url('images/Cloud-background.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "opacity(0.1) drop-shadow(0 0 #A09FB1)",
              zIndex: 1,
            }}
          />

          <img
            src={imageURL(firstDigit)}
            alt=""
            width={"150px"}
          />
        </Box>

        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"end"}
          marginY={"50px"}
        >
          <div style={{ fontSize: "150px" }}>{Temperature}</div>
          <div
            style={{
              fontSize: "50px",
              color: "#A09FB1",
              marginBottom: "20px",
            }}
          >
            &deg;{tempUnit ? "C" : "F"}
          </div>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"50px"}
        >
          <h1 style={{ color: "#A09FB1", marginBottom: "30px" }}>
            {capitalizeFirstLetter(weatherDesc)}
          </h1>
          <p style={{ color: "#A09FB1", fontWeight: "500" }}>
            &nbsp;{" "}
            {userClickedDayIndex === null ? (
              <>
                {" "}
                Today &nbsp;
                <span style={{ fontWeight: "900" }}>&middot;</span> {todayDate}
              </>
            ) : (
              userClickedDate
            )}
          </p>
          <p
            style={{
              color: theme.palette.lightGray,
              marginTop: "-30px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontWeight: "700",
            }}
          >
            <MdLocationOn
              color="#6E707A"
              style={{ fill: theme.palette.lightGray, fontSize: "1.5rem" }}
            />
            {city}
          </p>
        </Box>
        <SwipeableDrawer
          open={drawerState}
          onClose={() => {
            toggleDrawer();
          }}
          onOpen={() => {
            toggleDrawer();
          }}
          style={{ width: "300px" }}
        >
          <Drawer />
        </SwipeableDrawer>
      </Stack>
    </Data.Provider>
  );
};

export default Left;
