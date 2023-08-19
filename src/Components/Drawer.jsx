import { Box, Button, IconButton, Stack } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { PiCaretRightBold } from "react-icons/pi";
import theme from "../theme";
import { Data } from "./Home";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../Constants";
import Cookies from "js-cookie";

const Drawer = () => {
  const { toggleDrawer } = useContext(Data);
  const navigate = useNavigate();

  const [place, setPlace] = useState("");
  const [searchedPlaces, setSearchedPlaces] = useState(() => {
    const savedPlaces = Cookies.get("searchedPlaces");
    return savedPlaces ? JSON.parse(savedPlaces) : [];
  });

  const handleInputChange = (e) => {
    setPlace(e.target.value);
  };

  const handleButtonClick = () => {
    toggleDrawer();
    if (place.trim() !== "" && !searchedPlaces.includes(place)) {
      setSearchedPlaces((prevPlaces) => [...prevPlaces, place]);
    }

    navigate("/" + place);
  };

  useEffect(() => {
    Cookies.set("searchedPlaces", JSON.stringify(searchedPlaces));
  }, [searchedPlaces]);

  return (
    <Stack
      paddingX={{ xs: "5vw", sm: "1vw" }}
      paddingY={{ xs: "2vh", sm: "4vh" }}
      style={{
        width: ["100%", "auto"],
        height: "auto",
        minHeight: "100vh",
        overflow: "scroll",
        backgroundColor: theme.palette.main,
      }}
    >
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"end"}
      >
        <IconButton
          onClick={() => {
            toggleDrawer();
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Stack marginBottom={5}>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <input
            placeholder="Search location"
            style={{
              border: "2px solid white",
              background: "none",
              color: theme.palette.gray,
              width: "100%",
              height: "48px",
              fontWeight: "600",
              paddingLeft: "60px",
            }}
            onChange={handleInputChange}
          />

          <SearchRoundedIcon
            fontSize="medium"
            sx={{
              position: "absolute",
              left: "5%",
              top: "28%",
              fill: theme.palette.gray,
            }}
          />

          <Button
            style={{
              width: "120px",
              height: "48px",
              backgroundColor: theme.palette.blue,
              textTransform: "none",
              borderRadius: "0",
            }}
            onClick={handleButtonClick}
          >
            Search
          </Button>
        </div>
      </Stack>

      <Stack gap={2}>
        {searchedPlaces.map((placeName, idx) => {
          return (
            <Box key={idx}>
              <Button
                style={{
                  color: theme.palette.lightGray,
                  border: `2px solid ${theme.palette.gray}`,
                  borderRadius: "0",
                  padding: "10px 5px",
                  width: "100%",
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textTransform: "none",
                }}
                onClick={() => {
                  toggleDrawer();
                  setTimeout(() => {
                    navigate("/" + placeName);
                  }, 1000);
                }}
              >
                {capitalizeFirstLetter(placeName)}

                <PiCaretRightBold color={theme.palette.gray} />
              </Button>
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Drawer;
