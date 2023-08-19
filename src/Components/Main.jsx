import { IconButton, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import theme from "../theme";
import { TbTemperatureCelsius } from "react-icons/tb";
import { TbTemperatureFahrenheit } from "react-icons/tb";
import { Data } from "./Home";
import NextFiveDays from "./NextFiveDays";
import Highlights from "./Highlights";

const Main = () => {
  const {
    weatherData,
    setTemperature,
    tempCelcius,
    tempFahrenheit,
    setTempUnit,
    userClickedDayIndex,
  } = useContext(Data);

  return (
    <Stack
      height={"100%"}
      style={{ backgroundColor: theme.palette.darkBlue }}
      padding={["8vh 3vw", "3vh 12vw"]}
      gap={8}
    >
      <Stack
        width={"100%"}
        direction={"row"}
        justifyContent={"end"}
        alignItems={"center"}
        gap={2}
        paddingRight={"0.5vw"}
        display={["none", "flex"]}
      >
        <IconButton
          style={{
            borderRadius: "100%",
            border: "none",
            width: "40px",
            height: "40px",
            color: theme.palette.darkBlue,
            backgroundColor: "white",
          }}
          onClick={() => {
            if (typeof tempCelcius !== "undefined") {
              setTemperature(tempCelcius);
              setTempUnit(true);
            } else {
              setTemperature(
                Math.floor(weatherData.list[0].main.temp - 273.15)
              );
              setTempUnit(true);
            }
          }}
        >
          <TbTemperatureCelsius style={{ filter: "invert(100%)" }} />
        </IconButton>
        <IconButton
          style={{
            borderRadius: "100%",
            border: "none",
            width: "40px",
            height: "40px",
            color: "white",
            backgroundColor: theme.palette.gray,
          }}
          onClick={() => {
            setTemperature(tempFahrenheit);
            setTempUnit(false);
          }}
        >
          <TbTemperatureFahrenheit />
        </IconButton>
      </Stack>

      <NextFiveDays />

      <Typography
        variant="h4"
        display={["none", "block"]}
        fontWeight={"700"}
        marginInline={"10px"}
        style={{ fontFamily: "Raleway" }}
      >
        {userClickedDayIndex === null ? "Today's Highlights" : "Highlights"}
      </Typography>
      <Typography
        variant="h5"
        display={["block", "none"]}
        fontWeight={"700"}
        marginInline={"12px"}
        style={{ fontFamily: "Raleway" }}
      >
        {userClickedDayIndex === null ? "Today's Highlights" : "Highlights"}
      </Typography>

      {weatherData.list ? <Highlights /> : <></>}

      <h4 style={{ textAlign: "center", color: theme.palette.lightGray }}>
        Created By{" "}
        <b style={{ textDecoration: "underline" }}>
          <a
            href="https://github.com/CodeSumeet"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: theme.palette.lightGray }}
          >
            Sumeet
          </a>
        </b>
        &nbsp; - &nbsp;
        <a
          href="https://devchallenges.io/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: theme.palette.lightGray, textDecoration: "none" }}
        >
          devChallenges.io
        </a>
      </h4>
    </Stack>
  );
};

export default Main;
