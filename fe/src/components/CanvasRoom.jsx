import Circle from "@mui/icons-material/Circle";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Tooltip,
  Avatar,
  Divider,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import "../App.css";
import CanvasBox from "./CanvasBox";
import Navbar from "./Navbar";
import { useState } from "react";

export default function CanvasRoom(props) {
  const [canvasDetails, setCanvasDetails] = useState({
    title: "Lets Rock the Party",
    desc: "Ubiq is a business intelligence & reporting tool for small & medium businesses. Build business dashboards, charts & reports in minutes. Get insights from data quickly. Try it for free!",
    endTime: 1698333356,
    startTime: 1698323356,
    participants: 23,
    bids: 23,
    creatorAddress: "5Gs5gfzHkBsRt97qgmvBW2qX6M7FPXP8cJkAj7T7kNFbGVvG",
    isDynamic: false,
  });
  return (
    <Box component="div">
      <Navbar />
      <Box component="div" id="canvasBoxContainer">
        <Typography
          variant="h4"
          id="roomTitle"
          sx={{
            fontFamily: "'Fredoka One', cursive",
            width: "500px",
            margin: "0 auto",
          }}
        >
          {canvasDetails.title}
        </Typography>
        <Typography
          variant="body1"
          id="canvasDesc"
          align="center"
          sx={{
            fontFamily: "'Ubuntu Condensed', sans-serif",
            width: "500px",
            margin: "0 auto",
          }}
        >
          {canvasDetails.desc}
        </Typography>
        <Box
          component="div"
          sx={{
            width: "100%",
            paddingTop: "20px",
            margin: "auto",
            marginBottom: "20px",
            maxWidth: "800px",
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          <Strip
            Icon={
              <Circle
                sx={{
                  color: "#02be01",
                  fontSize: "16px",
                  margin: "0px 8px -3px 0px",
                }}
              />
            }
            Text={"10 days : 14 hrs : 36 mins : 50 sec"}
            tooltip={"Countdown till bidding ends"}
          />

          <Strip Text={"Canvas Id: " + props.Id} tooltip={"Canvas Id"} />
          <Strip
            Icon={
              <PeopleAltIcon
                sx={{ fontSize: "16px", margin: "0px 8px -3px 0px" }}
              />
            }
            tooltip={"Total Unique Bidders"}
            Text={"Participants: " + canvasDetails.participants}
          />
          <Strip
            Icon={
              <HowToVoteIcon
                sx={{ fontSize: "16px", margin: "0px 8px -3px 0px" }}
              />
            }
            Text={"Bids: " + canvasDetails.bids}
            tooltip={"Total Bids"}
          />
          <Strip
            Text={"5Gs5gfzHkBsRt97qgmvBW2qX6M7FPXP8cJkAj7T7kNFbGVvG"}
            tooltip={"Creator Address"}
          />
          <Strip
            Icon={
              canvasDetails.isDynamic ? <CheckBoxIcon
                sx={{
                  fontSize: "16px",
                  margin: "0px 8px -3px 0px",
                  color: "#02be01",
                }}
              />
              :
              <CancelIcon sx={{
                fontSize: "16px",
                margin: "0px 8px -3px 0px",
                color: "#f57c00",
              }}/>

            }
            Text={"Dynamic"}
            tooltip={
              "Canvas cell owners can change cell color of NFT even after canvas expires"
            }
          />
        </Box>
        <CanvasBox />
      </Box>
    </Box>
  );
}

const Strip = (props) => {
  return (
    <Tooltip title={props.tooltip} arrow>
      <Paper
        elevation="1"
        sx={{
          borderRadius: "10px",
          width: "fit-content",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          padding: "0 10px",
          margin: "0 0px 10px 0",
        }}
      >
        <Typography variant="body2" align="center" sx={{ fontWeight: "500" }}>
          {props.Icon}
          {props.Text}
        </Typography>
      </Paper>
    </Tooltip>
  );
};
