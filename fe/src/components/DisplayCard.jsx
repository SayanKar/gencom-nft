import {
  Box,
  Card,
  CardActionArea,
  Typography,
  Stack,
  Skeleton,
  Tooltip,
} from "@mui/material";
import Circle from "@mui/icons-material/Circle";
import { colors } from "../constants";
import GridSVG from "./GridSVG";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

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

  const [canvasDetails, setCanvasDetails] = useState(null);
  const [roomStatus, setRoomStatus] = useState("0");
  const [totalBids, setTotalBids] = useState(0);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [gridColors, setGridColors] = useState(null);

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
            if (!res.result.toHuman().Err) {
              console.log('Successfully fetched canvas ' + props.id + ' details');
              setCanvasDetails(res.output.toHuman().Ok);
            } else {
              console.log('Error fetching canvas details', res.result.toHuman());
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
      const now = dayjs().unix()*1000;
      //console.log(canvasDetails.startTime, "---", canvasDetails.endTime);
      if (now < parseInt(canvasDetails.startTime.replace(/,/g,""))) {
        setRoomStatus("0");
      }
      else if (now > parseInt(canvasDetails.endTime.replace(/,/g,""))) {
        setRoomStatus("2");
      }
      else {
        setRoomStatus("1");
      }
    };
    getRoomStatus();
  }, [canvasDetails]);


  useEffect(() => {
    const getCanvasStats = async () => {
      if (props.contract && props.activeAccount) {
        console.log("Fetching Canvas stats: ", props.id);
        await props.contract.query.getCanvasStats(
          props.activeAccount.address, {
          value: 0,
          gasLimit: -1,
        },
          props.id
        )
          .then((res) => {
            if (!res.result.toHuman().Err) {
              console.log('Successfully fetched canvas ' + props.id + ' stats');
              setTotalBids(res.output.toHuman().totalBids);
              setTotalParticipants(res.output.toHuman().totalParticipants);
            } else {
              console.log('Error fetching canvas stats', res.result.toHuman().Err);
            }
          })
          .catch((err) => {
            console.log("Error while fetching canvas stats: ", err);
          });
      }
    };
    getCanvasStats();
  }, [props.contract, props.activeAccount]);

  // canvas grid info
  useEffect(() => {
    const getGridColors = async () => {
      if (props.contract && props.activeAccount) {
        console.log("Fetching grid color data...");
        await props.contract.query.getColoredGrid(
          props.activeAccount.address, {
          value: 0,
          gasLimit: -1,
        },
        props.id
        )
        .then((res) => {
          if (!res.result.toHuman().Err) {
            console.log("Successfully fetched grid color data");
            let temp = Array(32);
            for (let i = 0; i < 32; i++) {
              temp[i] = Array(32);
            }
            for (let i = 0; i < 32; i++) {
              for (let j = 0; j < 32; j++) {
                temp[i][j] = "#" + parseInt(res.output.toHuman().Ok[i][j].replace(/,/g,"")).toString(16).padStart(6, "0");
                console.log(temp[i][j]);
              }
            }
            setGridColors(temp);
          } else {
            console.log("Error while fetching grid color data: ", res.result.toHuman().Err);
          }
        })
        .catch((err) => {
          console.log("Error while fetching grid color data:", err);
        });
      }
    };
    getGridColors();
  }, [props.contract, props.activeAccount]);

  return (
    <Box sx={{ position: "relative" }}>
      {props.isProfile && (parseInt(roomStatus) !== 2) && (
        <Tooltip arrow title={parseInt(roomStatus) ? "Room is live" : "Edit Canvas"}>
          <Box
            sx={{
              width: "27px",
              height: "27px",
              borderRadius: "50%",
              position: "absolute",
              top: "-10px",
              right: "-5px",
              background: parseInt(roomStatus) ? "green" : "#E8E8E8",
              zIndex: 3,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            {!parseInt(roomStatus) && (
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
                {/* error in grid color state passing */}
                <GridSVG colors={gridColors} />
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
                  {totalBids} Bids
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
                  {totalParticipants} Bidders
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
