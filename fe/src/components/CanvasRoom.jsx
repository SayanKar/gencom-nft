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
import dayjs from "dayjs";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import "../App.css";
import CanvasBox from "./CanvasBox";
import Navbar from "./Navbar";
import { useState } from "react";
import { useEffect } from "react";

export default function CanvasRoom(props) {
  const [canvasDetails, setCanvasDetails] = useState({
    title: "Lets Rock the Party",
    desc: "Ubiq is a business intelligence & reporting tool for small & medium businesses. Build business dashboards, charts & reports in minutes. Get insights from data quickly. Try it for free!",
    endTime: 1666862999,
    startTime: 1666825989,
    participants: 23,
    bids: 23,
    creatorAddress: "5Gs5gfzHkBsRt97qgmvBW2qX6M7FPXP8cJkAj7T7kNFbGVvG",
    isDynamic: false,
    premiumPercentage: "0",
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
          <RenderTimer
            start={canvasDetails.startTime}
            end={canvasDetails.endTime}
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
              canvasDetails.isDynamic ? (
                <CheckBoxIcon
                  sx={{
                    fontSize: "16px",
                    margin: "0px 8px -3px 0px",
                    color: "#02be01",
                  }}
                />
              ) : (
                <CancelIcon
                  sx={{
                    fontSize: "16px",
                    margin: "0px 8px -3px 0px",
                    color: "#f57c00",
                  }}
                />
              )
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

const RenderTimer = (props) => {
  const now = dayjs().unix()
  const [time, setTime] = useState(props.end - now)
  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(time - 1)
    }, 1000);
    return () => clearTimeout(timer);
  });
  return (
    <Strip
      Icon={
        <Circle
          sx={{
            color: now >= props.start ? time > 0 ? "#02be01": "#f57c00" : "#42a5f5",
            fontSize: "16px",
            margin: "0px 8px -3px 0px",
          }}
        />
      }
      Text={now >= props.start ? time > 0 ? `${Math.floor(time/86400)} days : ${Math.floor((time%86400)/3600)} hrs : ${Math.floor(((time%86400)%3600)/60)} mins : ${Math.floor(time%60)} sec`: "Canvas expired" : "Opening Soon"}
      tooltip={"Countdown till bidding ends"}
    />
  );
};
