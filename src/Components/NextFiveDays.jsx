import React from "react";
import { Card, CardActionArea, CardMedia, Grid, Stack } from "@mui/material";
import { Data } from "./Home";
import { useContext } from "react";
import theme from "../theme";
import { convertDate, imageURL } from "../Constants";

const NextFiveDays = (props) => {
  const { nextFiveDaysData, setUserClickedDayIndex, tempUnit } =
    useContext(Data);

  const getFirstDigit = (number) => {
    return parseInt(String(number)[0], 10);
  };

  return (
    <Grid
      container
      direction={"row"}
      gap={5}
      width={"100%"}
      justifyContent={"center"}
    >
      {nextFiveDaysData.map((data, idx) => {
        return (
          <Grid
            item
            key={idx}
            width={"120px"}
          >
            <Card
              key={data.dt}
              style={{
                backgroundColor: theme.palette.main,
                borderRadius: "0",
                height: "auto",
              }}
            >
              <CardActionArea
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1vh",
                  padding: "16px",
                  fontWeight: "500",
                  fontSize: "16px",
                }}
              >
                <p
                  style={{
                    whiteSpace: "nowrap",
                  }}
                >
                  {idx === 0 ? "Tomorrow" : convertDate(data.dt_txt)}
                </p>
                <CardMedia
                  component="img"
                  image={imageURL(getFirstDigit(data.weather[0].id))}
                  alt={props.date}
                  height={70}
                  style={{
                    width: "80px",
                    objectFit: "cover",
                    marginBottom: "15px",
                    userSelect: "none",
                  }}
                  onClick={() => {
                    setUserClickedDayIndex(idx);
                  }}
                />

                <Stack width={"100%"}>
                  {tempUnit ? (
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <p>{Math.floor(data.main.temp_max - 273.15)}&deg;C</p>
                      <p style={{ color: theme.palette.lightGray }}>
                        {Math.floor(data.main.temp_min - 273.15)}&deg;C
                      </p>
                    </Stack>
                  ) : (
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <p>
                        {Math.floor(1.8 * (data.main.temp_max - 273.15) + 32)}
                        &deg;F
                      </p>
                      <p style={{ color: theme.palette.lightGray }}>
                        {Math.floor(1.8 * (data.main.temp_min - 273.15) + 32)}
                        &deg;F
                      </p>
                    </Stack>
                  )}
                </Stack>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default NextFiveDays;
