import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Stack,
  Paper,
  Skeleton,
  Badge,
  Tooltip,
} from "@mui/material";
import Circle from "@mui/icons-material/Circle";
import { colors } from "../constants";
import GridSVG from "./GridSVG";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { promisify } from "@polkadot/util";

export default function DisplayCard(props) {
  const { width = "352px", height = "300px" } = props;
  const bottomStripColor = {
    0: {
      text: "#42a5f5",
      background: "#cce8ff",
      tag: "Room opening soon",
    },
    1: {
      text: "#388e3c",
      background: "#dffce1",
      tag: "Room live",
    },
    2: {
      text: "#f57c00",
      background: "#ffddab",
      tag: "Room expired",
    },
  };

  const getColor = () => {
    return colors[Math.floor(Math.random() * 16)];
  };

  const makeColor = () => {
    let color = Array.from({ length: 32 }, () =>
      Array.from({ length: 32 }, () => [getColor()])
    );
    return color;
  };

  // Fetch canvasDetails and grid details
  const [canvasDetails, setCanvasDetails] = useState(null);
  const [roomStatus, setRoomStatus] = useState("0");

  useEffect(() => {
    const getCanvasDetails = async () => {
      if (props.contract && props.activeAccount) {
        console.log("Fetching Canvas Details: ", props.id);
        await props.contract.query.getCanvasDetails(
          props.activeAccount.address, {
            value: 0,
            gasLimit: -1,
          },
          props.id
        )
        .then((res) => {
          if (!res.output.toHuman().Err) {
            console.log('Successfully fetched canvas ' + props.id + ' details');
            setCanvasDetails(res.output.toHuman());
          } else {
            console.log('Error fetching canvas details', res.output.toHuman());
          }
        })
        .catch((err) => {
          console.log("Error while fetching canvas details: ", err);
        });
      }
    };
    getCanvasDetails();
  }, [props.contract, props.activeAccount]);


  useEffect(() => {
    const getRoomStatus = () => {
      if (canvasDetails === null) {
        return;
      }
      console.log("setting room status");
      const now = dayjs();
      //console.log(parseInt(canvasDetails.startTime), canvasDetails.startTime.replace(/,/g,""));
      const startTime = dayjs.unix(parseInt(canvasDetails.startTime.replace(/,/g,"")));
      const endTime = dayjs.unix(parseInt(canvasDetails.endTime.replace(/,/g,"")));
      console.log(now, startTime, endTime);
      if (now.isBefore(startTime)) {
        setRoomStatus("0");
      }
      else if (now.isAfter(endTime)) {
        setRoomStatus("2");
      }
      else {
        setRoomStatus("1");
      }
    };
    console.log(roomStatus);
    getRoomStatus();
  }, [canvasDetails]);


  return (
    <Box sx={{ position: "relative" }}>
      {props.isProfile && (
        <Tooltip arrow title={props.isNFT ? "You have 5 NFTs" : "Edit Canvas"}>
          <Box
            sx={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              position: "absolute",
              top: "-10px",
              right: "-5px",
              background: props.isNFT ? "red" : "#E8E8E8",
              zIndex: 3,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            {props.isNFT && (
              <Typography
                sx={{
                  width: "30px",
                  color: "white",
                  fontFamily: "'Fredoka One', cursive",
                }}
              >
                {"1" <= 9 ? "1" : "9+"}
              </Typography>
            )}
            {props.isEdit && (
              <Link to={"/edit/" + props.id} style={{ fontSize: "20px", margin: "0 auto" }}>
                <EditIcon sx={{ fontSize: "20px", margin: "0 auto" }} />
              </Link>
            )}
          </Box>
        </Tooltip>
      )}
      <Card
        sx={{
          width: width,
          height: "fit-content",
          borderRadius: "16px",
          minWidth: "250px",
          minHeight: "400px",
          border: "1px solid rgb(233, 232, 232)",
          cursor: "pointer",
        }}
      >
        <CardActionArea>
          {false ? (
            <CardSkeleton />
          ) : (
            <Link
              to={"/canvas/" + props.id}
              sx={{ textDecoration: "none !important" }}
            >
              <Box
                sx={{
                  width: "calc(100% - 32px)",
                  height: "320px",
                  borderRadius: "10px",
                  margin: "16px 16px 0 16px",
                  background: "gray",
                  overflow: "hidden",
                }}
              >
                <GridSVG colors={makeColor()} />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'Fredoka One', cursive",
                  margin: "0 auto",
                  marginTop: "15px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  lineClamp: 2,
                  WebkitLineClamp: 2,
                  "-webkit-box-orient": "vertical",
                  width: "calc(100% - 32px)",
                }}
              >
                {canvasDetails ? canvasDetails.title : ""}
              </Typography>
              <Stack direction="row" sx={{ margin: "10px 0" }}>
                <Typography
                  sx={{
                    fontFamily: "'Fredoka One', cursive",
                    margin: "0 auto",
                    marginTop: "5px",
                    overflow: "hidden",
                    width: "calc(100% - 32px)",
                    fontWeight: "300",
                  }}
                  variant="subtitle1"
                  align="right"
                >
                  100 Bids
                </Typography>
                <Circle sx={{ margin: "14px 5px", fontSize: "9px" }} />
                <Typography
                  sx={{
                    fontFamily: "'Fredoka One', cursive",
                    margin: "0 auto",
                    marginTop: "5px",
                    overflow: "hidden",
                    width: "calc(100% - 32px)",
                    fontWeight: "300",
                  }}
                  variant="subtitle1"
                  align="left"
                >
                  100 Bids
                </Typography>
              </Stack>
              <Typography
                sx={{
                  width: "calc(100% + 2px)",
                  borderBottomLeftRadius: "16px",
                  borderBottomRightRadius: "16px",
                  fontFamily: "'Ubuntu Condensed', sans-serif",
                  marginLeft: "-1px",
                  marginBottom: "-1px",
                  padding: "6px 0",
                  fontSize: "14px",
                  color: bottomStripColor[roomStatus].text,
                  background: bottomStripColor[roomStatus].background,
                }}
              >
                {bottomStripColor[roomStatus].tag}
              </Typography>
            </Link>
          )}
        </CardActionArea>
      </Card>
    </Box>
  );
}

const CardSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "352px",
        padding: "16px 0",
        height: "504px",
        justifyContent: "space-between",
      }}
    >
      <Skeleton
        variant="rectangular"
        width={320}
        height={320}
        sx={{ borderRadius: "10px" }}
      />
      <Skeleton
        variant="rectangular"
        width={320}
        height={30}
        sx={{ borderRadius: "10px" }}
      />
      <Skeleton
        variant="rectangular"
        width={320}
        height={30}
        sx={{ borderRadius: "10px" }}
      />
      <Skeleton
        variant="rectangular"
        width={320}
        height={30}
        sx={{ borderRadius: "10px" }}
      />
    </Box>
  );
};
