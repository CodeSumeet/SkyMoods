import { Box, Card, CardContent, Grid } from "@mui/material";
import React from "react";
import theme from "../theme";
import NearMeRoundedIcon from "@mui/icons-material/NearMeRounded";
import { useContext } from "react";
import { Data } from "./Home";

const Highlights = () => {
  const { weatherData, nextFiveDaysData, userClickedDayIndex } =
    useContext(Data);

  const cardStyles = {
    backgroundColor: theme.palette.main,
    borderRadius: "0",
    height: "100%",
  };

  const cardContent = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "3vh",
  };

  const getWindSpeed = () => {
    const windSpeed =
      userClickedDayIndex === null
        ? weatherData?.list[0]?.wind?.speed
        : nextFiveDaysData[userClickedDayIndex]?.wind?.speed;

    return windSpeed;
  };

  const getHumidity = () => {
    const humidity =
      userClickedDayIndex === null
        ? weatherData.list[0]?.main?.humidity
        : nextFiveDaysData[userClickedDayIndex]?.main?.humidity;

    return humidity;
  };

  const getVisibility = () => {
    const visibility =
      userClickedDayIndex === null
        ? Math.round(weatherData.list[0]?.visibility * 0.000621371 * 10) / 10
        : Math.round(
            nextFiveDaysData[userClickedDayIndex]?.visibility * 0.000621371 * 10
          ) / 10;

    return visibility;
  };

  const getAirPressure = () => {
    const airPressure =
      userClickedDayIndex === null
        ? weatherData.list[0]?.main?.pressure
        : nextFiveDaysData[userClickedDayIndex]?.main?.pressure;

    return airPressure;
  };

  const windSpeed = getWindSpeed();
  const humidity = getHumidity();
  const visibility = getVisibility();
  const airPressure = getAirPressure();

  const middleStyles = { display: "flex", alignItems: "end", gap: "5px" };

  return (
    <Grid
      container
      gap={5}
      justifyContent={"center"}
    >
      <Grid
        item
        xs={12}
        md={5.6}
      >
        <Card
          width={"100%"}
          style={{ ...cardStyles }}
        >
          <CardContent style={{ ...cardContent }}>
            <h4 style={{ fontWeight: "500" }}>Wind Status</h4>

            <div style={{ ...middleStyles }}>
              <h1 style={{ fontSize: "64px" }}>{Math.floor(windSpeed)}</h1>
              <h3 style={{ fontSize: "36px", marginBottom: "12px" }}>mph</h3>
            </div>

            <h4
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontWeight: "500",
                marginTop: "15px",
              }}
            >
              <div
                style={{
                  borderRadius: "100%",
                  width: "30px",
                  height: "30px",
                  backgroundColor: theme.palette.gray,
                  display: "grid",
                  placeContent: "Center",
                }}
              >
                <NearMeRoundedIcon
                  style={{
                    rotate: "160deg",
                    fontSize: "18px",
                  }}
                />
              </div>
              WSW
            </h4>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        xs={12}
        md={5.6}
      >
        <Card
          width={"100%"}
          style={{
            ...cardStyles,
          }}
        >
          <CardContent style={{ ...cardContent }}>
            <h4 style={{ fontWeight: "500" }}>Humidity</h4>

            <div style={{ ...middleStyles }}>
              <h1 style={{ fontSize: "64px" }}>{humidity}</h1>
              <h3 style={{ fontSize: "36px", marginBottom: "12px" }}>%</h3>
            </div>

            <Box
              sx={{
                width: "100%",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "space-between",
                marginTop: ["0", "10px"],
                marginBottom: "-15px",
              }}
            >
              <span style={{ color: theme.palette.gray, fontWeight: "600" }}>
                0
              </span>
              <span style={{ color: theme.palette.gray, fontWeight: "600" }}>
                50
              </span>
              <span style={{ color: theme.palette.gray, fontWeight: "600" }}>
                100
              </span>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "1.5vh",
                backgroundColor: theme.palette.gray,
                borderRadius: "5px",
              }}
            >
              <Box
                sx={{
                  width: weatherData?.list[0]?.main?.humidity + "%",
                  height: "100%",
                  backgroundColor: theme.palette.yellow,
                  borderRadius: "5px",
                }}
              ></Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "-15px",
                fontWeight: "900",
                color: theme.palette.gray,
              }}
            >
              %
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        xs={12}
        md={5.6}
      >
        <Card
          width={"100%"}
          style={{
            ...cardStyles,
          }}
        >
          <CardContent style={{ ...cardContent }}>
            <h4 style={{ fontWeight: "500" }}>Visibility</h4>

            <div style={{ ...middleStyles }}>
              <h1 style={{ fontSize: "64px" }}>{visibility}</h1>
              <h3
                style={{
                  fontSize: "36px",
                  marginBottom: "12px",
                  marginLeft: "5px",
                  fontWeight: "500",
                }}
              >
                miles
              </h3>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        xs={12}
        md={5.6}
      >
        <Card
          width={"100%"}
          style={{
            ...cardStyles,
          }}
        >
          <CardContent style={{ ...cardContent }}>
            <h4 style={{ fontWeight: "500" }}>Air Pressure</h4>

            <div style={{ ...middleStyles }}>
              <h1 style={{ fontSize: "64px" }}>{airPressure}</h1>
              <h3
                style={{
                  fontSize: "36px",
                  marginBottom: "12px",
                  marginLeft: "5px",
                  fontWeight: "500",
                }}
              >
                mb
              </h3>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Highlights;
