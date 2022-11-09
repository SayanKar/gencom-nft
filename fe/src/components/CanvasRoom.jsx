import Circle from "@mui/icons-material/Circle";
import { Box, Paper, Typography, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import "../App.css";
import CanvasBox from "./CanvasBox";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { Keyring } from "@polkadot/api";
import { PRECISION } from "../constants";
const keyring = new Keyring({ type: "sr25519" });
const BN = require("bn.js");
export default function CanvasRoom(props) {
  const { canvasId } = useParams();
  const now = dayjs().unix() * 1000;
  const [canvasDetails, setCanvasDetails] = useState({
    title: "-----",
    desc: "---- ---- ---- ---- ---- ---- ---- --- ---",
    endTime: 1,
    startTime: 0,
    creatorAddress:
      "---------------------------------------------------------------------",
    isDynamic: false,
    basePrice: 0,
    premiumPercentage: "0",
  });
  const [canvasStats, setCanvasStats] = useState({ bids: 0, participants: 0 });
  const [isOwner, setIsOwner] = useState(false);
  const [isInvalidId, setIsInvalidId] = useState(false);
  const [nfts, setNfts] = useState(0);
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const getBalance = async () => {
      if (props.activeAccount && props.api) {
        const { data: balance } = await props.api.query.system.account(
          props.activeAccount.address
        );
        setBalance(
          new BN(balance.free).div(new BN(PRECISION)).toString(10) / 1000_000
        );
      }
    };
    const id = setInterval(() => getBalance(), 5000);
    return () => clearInterval(id);
  }, [props.activeAccount]);

  useEffect(() => {
    const getUserNftsCount = async () => {
      if (props.contract && props.activeAccount) {
        console.log("Fetching owned nft...");
        await props.contract.query
          .getUserNftCount(
            props.activeAccount.address,
            {
              value: 0,
              gasLimit: -1,
            },
            props.activeAccount.address,
            canvasId
          )
          .then((res) => {
            if (!res.result?.toHuman()?.Err) {
              setNfts(res.output.toHuman());
            } else {
              console.log(
                "Error fetching owner cells",
                res.result.toHuman().Err
              );
            }
          })
          .catch((err) => {
            console.log("Error while fetching owner cells", err);
          });
      }
    };
    getUserNftsCount();
  }, []);

  function changeAddressEncoding(address, toNetworkPrefix = 42) {
    if (!address) {
      return null;
    }
    const pubKey = keyring.decodeAddress(address);
    const encodedAddress = keyring.encodeAddress(pubKey, toNetworkPrefix);
    return encodedAddress;
  }

  const getCanvasDetails = async () => {
    if (props.activeAccount && props.contract) {
      console.log("Fetching Canvas Details");
      await props.contract.query
        .getCanvasDetails(
          props.activeAccount.address,
          {
            value: 0,
            gasLimit: -1,
          },
          canvasId
        )
        .then((res) => {
          if (!res.output?.toHuman()?.Err) {
            res = res.output?.toHuman()?.Ok;
            if (res === null) {
              setIsInvalidId(true);
            } else {
              setCanvasDetails({
                ...canvasDetails,
                title: res.title,
                desc: res.desc,
                premiumPercentage: res.premium,
                isDynamic: res.isDynamic,
                startTime: res.startTime.replace(/,/g, ""),
                endTime: res.endTime.replace(/,/g, ""),
                creatorAddress: changeAddressEncoding(res.creator),
                basePrice:
                  new BN(res.basePrice.replace(/,/g, ""))
                    .div(new BN(PRECISION))
                    .toNumber() / 1000_000,
              });
              if (
                props.activeAccount.address !==
                changeAddressEncoding(res.creator)
              ) {
                setIsOwner(true);
                console.log("User are not the owner");
              }
              console.log("Successfully set Canvas Details");
            }
          } else if (res.output.toHuman().Err === "CanvasNotFound") {
            setIsInvalidId(true);
          } else {
            console.log(
              "Error fetching canvas Details,",
              res.output?.toHuman()?.Err
            );
          }
        })
        .catch((err) => {
          console.log("Error on calling canvas details", err);
        });
    }
  };

  const getCanvasStats = async () => {
    if (props.activeAccount && props.contract) {
      console.log("Fetching Canvas Stats");
      await props.contract.query
        .getCanvasStats(
          props.activeAccount.address,
          {
            value: 0,
            gasLimit: -1,
          },
          canvasId
        )
        .then((res) => {
          if (!res.result.toHuman().Err) {
            res = res.output.toHuman();
            setCanvasStats({
              ...canvasStats,
              bids: res.totalBids,
              participants: res.totalParticipants,
            });
            console.log("Successfully set Canvas Stats");
          } else {
            console.log("Error on canvas stats", res.result.toHuman().Err);
          }
        })
        .catch((err) => {
          console.log("Error fetching canvas stats", err);
        });
    }
  };

  useEffect(() => {
    getCanvasDetails();
    const id = setInterval(() => getCanvasStats(), 20000);
    return () => clearInterval(id);
  }, [props.contract, props.activeAccount]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box component="div">
      <Box component="div" id="canvasBoxContainer">
        {!props.activeAccount || isInvalidId ? (
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Paper
              sx={{
                width: "400px",
                height: "fit-content",
                padding: "40px",
                margin: "140px 0px",
              }}
              elevation={10}
            >
              <Typography
                sx={{ width: "100%", fontWeight: "500", color: "#333652" }}
                align="center"
                variant="h5"
              >
                {isInvalidId ? "Invalid Canvas Room Id" : "Connect your wallet"}
              </Typography>
            </Paper>
          </Box>
        ) : (
          <>
            <Typography
              variant="h4"
              id="roomTitle"
              sx={{
                fontFamily: "'Fredoka One', cursive",
                width: "500px",
                margin: "0 auto",
                marginTop: "20px",
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
              <Strip Text={"Canvas Id: " + canvasId} tooltip={"Canvas Id"} />
              <Strip
                Icon={
                  <PeopleAltIcon
                    sx={{ fontSize: "16px", margin: "0px 8px -3px 0px" }}
                  />
                }
                tooltip={"Total Unique Bidders"}
                Text={"Participants: " + canvasStats.participants}
              />
              <Strip
                Icon={
                  <HowToVoteIcon
                    sx={{ fontSize: "16px", margin: "0px 8px -3px 0px" }}
                  />
                }
                Text={"Bids: " + canvasStats.bids}
                tooltip={"Total Bids"}
              />
              <Strip
                Text={
                  <Link to={"/profile/" + canvasDetails.creatorAddress}>
                    {"Creator : " + canvasDetails.creatorAddress}
                  </Link>
                }
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
              {props.activeAccount.address === canvasDetails.creatorAddress &&
                canvasDetails.startTime > now && (
                  <Link to={"/edit/" + canvasId}>
                    <Strip
                      Icon={
                        <EditIcon
                          sx={{ fontSize: "16px", margin: "0px 8px -3px 0px" }}
                        />
                      }
                      tooltip={"Edit room"}
                      Text={"Edit room"}
                    />
                  </Link>
                )}
              {canvasDetails.endTime < now && (
                <Strip
                  Text={"Your NFTs : " + nfts}
                  tooltip={"For each cell you own you get an NFT"}
                />
              )}
            </Box>
            <CanvasBox
              contract={props.contract}
              activeAccount={props.activeAccount}
              id={canvasId}
              basePrice={canvasDetails.basePrice}
              premium={canvasDetails.premiumPercentage}
              start={canvasDetails.startTime}
              end={canvasDetails.endTime}
              signer={props.signer}
              isDynamic={canvasDetails.isDynamic}
              balance={balance}
            />
          </>
        )}
      </Box>
    </Box>
  );
}

const Strip = (props) => {
  return (
    <Tooltip title={props.tooltip} arrow>
      <Paper
        elevation={1}
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
  const now = dayjs().unix() * 1000;
  const [time, setTime] = useState(0);
  useEffect(() => {
    const diff = (props.end - dayjs().unix() * 1000) / 1000;
    setTime(diff);
  }, [props.end, props.start]);

  useEffect(() => {
    if (now <= props.end && now >= props.start && time >= 0) {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [time]);
  return (
    <Strip
      Icon={
        <Circle
          sx={{
            color:
              now >= props.start
                ? now <= props.end
                  ? "#02be01"
                  : "#f57c00"
                : "#42a5f5",
            fontSize: "16px",
            margin: "0px 8px -3px 0px",
          }}
        />
      }
      Text={
        now >= props.start
          ? now <= props.end
            ? `${Math.floor(time / 86400)} days : ${Math.floor(
                (time % 86400) / 3600
              )} hrs : ${Math.floor(
                ((time % 86400) % 3600) / 60
              )} mins : ${Math.floor(time % 60)} sec`
            : "Canvas expired on " + dayjs.unix(props.end / 1000).format("llll")
          : "Opening on " + dayjs.unix(props.start / 1000).format("llll")
      }
      tooltip={"Countdown till bidding ends"}
    />
  );
};
