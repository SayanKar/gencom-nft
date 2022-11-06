import { Alert, Box, Tooltip, Typography } from "@mui/material";
import Identicon from "@polkadot/react-identicon";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import CardList from "./CardList";
import { useEffect, useState } from "react";
import { PRECISION, SYMBOL } from "../constants";
export default function Profile(props) {
  const { address } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const BN = require("bn.js");
  const [userCreatedCanvasIds, setUserCreatedCanvasIds] = useState([]);
  const [userParticipatedCanvasIds, setUserParticipatedCanvasIds] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalReceived, setTotalReceived] = useState(0);
  const [userNFTCount, setUserNFTCount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getUserCreatedCanvasIds = async () => {
      if (props.contract && props.activeAccount) {
        console.log("Fetching user created canvas ids");
        await props.contract.query.getUserCreatedCanvasIds(
          props.activeAccount.address, {
          value: 0,
          gasLimit: -1,
        },
          address
        )
          .then((res) => {
            if (!res.output.toHuman().Err) {
              console.log('Succesfully fetched user created canvas ids');
              setUserCreatedCanvasIds(res.output.toHuman());
            } else {
              console.log("Error fetching user created canvas ids", res.output.toHuman());
            }
          })
          .catch((err) => {
            console.log('Error while fetching user created canvas ids: ', err);
          });
      }
    };
    getUserCreatedCanvasIds();
  }, [props.contract, props.activeAccount, address]);

  useEffect(() => {
    const getUserParticipatedCanvasIds = async () => {
      if (props.contract && props.activeAccount) {
        console.log("Fetching user participated canvas ids");
        await props.contract.query.getUserParticipatedCanvasIds(
          props.activeAccount.address, {
          value: 0,
          gasLimit: -1,
        },
          address
        )
          .then((res) => {
            if (!res.output.toHuman().Err) {
              console.log('Succesfully fetched user participated canvas ids');
              setUserParticipatedCanvasIds(res.output.toHuman());
            } else {
              console.log("Error fetching user participated canvas ids", res.output.toHuman());
            }
          })
          .catch((err) => {
            console.log('Error while fetching user participated canvas ids: ', err);
          });
      }
    };
    getUserParticipatedCanvasIds();
  }, [props.contract, props.activeAccount, address]);

  useEffect(() => {
    const getUserCashFlow = async () => {
      if (props.contract && props.activeAccount) {
        console.log("Fetching user cash flow..");
        await props.contract.query.getUserCashFlow(
          props.activeAccount.address, {
          value: 0,
          gasLimit: -1,
        },
          address
        )
          .then((res) => {
            if (!res.result.toHuman().Err) {
              console.log("Successfully fetched user cash flow data...");
              setTotalSpent((new BN(res.output.toHuman()[0].replace(/,/g, "")).div(new BN(PRECISION))).toNumber() / 1000_000);
              setTotalReceived((new BN(res.output.toHuman()[1].replace(/,/g, "")).div(new BN(PRECISION))).toNumber() / 1000_000);
            } else {
              console.log("Error fetching user cash flow data", res.result.toHuman().Err);
            }
          })
          .catch((err) => {
            console.log("Error while fetching user cash flow data: ", err);
          });
      }
    };
    getUserCashFlow();
  }, [props.contract, props.activeAccount, address]);

  useEffect(() => {
    const getUserNFTCount = async () => {
      if (props.contract && props.activeAccount) {
        console.log("Fetching user NFT count..");
        await props.contract.query.balanceOf(
          props.activeAccount.address, {
          value: 0,
          gasLimit: -1,
        },
          address
        )
          .then((res) => {
            if (!res.result.toHuman().Err) {
              console.log("Successfully fetched user NFT count...");
              setUserNFTCount(res.output.toHuman());

            } else {
              console.log("Error fetching user NFT count", res.result.toHuman().Err);
            }
          })
          .catch((err) => {
            console.log("Error while fetching user NFT count: ", err);
          });
      }
    };
    getUserNFTCount();
  }, [props.contract, props.activeAccount, address]);

  return (
    <Box sx={{ padding: "60px 0" }}>
      <Box id="profileInfo" sx={{ width: "90%", margin: "0 auto" }}>
        <Identicon value={address} size={100} theme={"polkadot"} />
        <Tooltip title="Click to copy address" arrow>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "'Fredoka One', cursive",
              cursor: "pointer",
              margin: "20px 0 20px 0",
            }}
            onClick={() => {
              navigator.clipboard.writeText(address);
              enqueueSnackbar("Address copied", { variant: "default" });
            }}
          >
            {address}
          </Typography>
        </Tooltip>
        <Box
          sx={{
            display: "flex",
            width: "500px",
            flexWrap: "wrap",
            margin: "0 auto",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: "'Ubuntu Condensed', sans-serif",
              cursor: "pointer",
              marginTop: "5px",
              width: "250px",
              fontWeight: "700",
            }}
          >
            Canvas created: {userCreatedCanvasIds.length}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: "'Ubuntu Condensed', sans-serif",
              cursor: "pointer",
              marginTop: "5px",
              width: "250px",
              fontWeight: "700",
            }}
          >
            Participated: {userParticipatedCanvasIds.length}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: "'Ubuntu Condensed', sans-serif",
              cursor: "pointer",
              marginTop: "5px",
              width: "250px",
              fontWeight: "700",
            }}
          >
            NFTs: {userNFTCount}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: "'Ubuntu Condensed', sans-serif",
              cursor: "pointer",
              marginTop: "5px",
              width: "250px",
              fontWeight: "700",
            }}
          >
            Total Spent: {totalSpent + " " +SYMBOL} 
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: "'Ubuntu Condensed', sans-serif",
              cursor: "pointer",
              marginTop: "5px",
              width: "250px",
              fontWeight: "700",
            }}
          >
            Received: {totalReceived + " " + SYMBOL} 
          </Typography>
        </Box>
        <CardList
          ids={userCreatedCanvasIds}
          rows={2}
          title={"Created Canvas"}
          isProfile={true}
          isEdit={true}
          contract={props.contract}
          activeAccount={props.activeAccount}
          address={address}
        />
        <CardList
          ids={userParticipatedCanvasIds}
          rows={2}
          title={"Participations"}
          contract={props.contract}
          activeAccount={props.activeAccount}
          address={address}
        />
      </Box>
    </Box>
  );
}
