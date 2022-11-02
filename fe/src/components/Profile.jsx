import { Alert, Box, Tooltip, Typography } from "@mui/material";
import Identicon from "@polkadot/react-identicon";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import CardList from "./CardList";
import { useEffect, useState } from "react";
export default function Profile(props) {
  const { address } = useParams();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [userCreatedCanvasIds, setUserCreatedCanvasIds] = useState([]);
  const [userParticipatedCanvasIds, setUserParticipatedCanvasIds] = useState([]);

  useEffect(() => {
    const getUserCreatedCanvasIds = async () => {
      if (props.contract && props.activeAccount) {
        console.log("Fetching user created canvas ids");
        await props.contract.query.getUserCreatedCanvasIds(
          props.activeAccount.address, {
          value: 0,
          gasLimit: -1,
        },
        props.activeAccount.address
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
  }, [props.contract, props.activeAccount]);

  useEffect(() => {
    const getUserParticipatedCanvasIds = async () => {
      if (props.contract && props.activeAccount) {
        console.log("Fetching user participated canvas ids");
        await props.contract.query.getUserParticipatedCanvasIds(
          props.activeAccount.address, {
          value: 0,
          gasLimit: -1,
        },
        props.activeAccount.address
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
  }, [props.contract, props.activeAccount]);

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
            NFTs: 15
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
            Total Spent: 5 EDG
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
            Received: 50EDG
          </Typography>
        </Box>
        <CardList
          ids={[1, 2, 3, 4, 5, 6, 7, 8]}
          rows={2}
          title={"Your NFTs"}
          isNFT={true}
          isProfile={true}
          contract={props.contract}
          activeAccount={props.activeAccount}
        />
        <CardList
          ids={userCreatedCanvasIds}
          rows={2}
          title={"Created Canvas"}
          isProfile={true}
          isEdit={true}
          contract={props.contract}
          activeAccount={props.activeAccount}
          
        />
        <CardList
          ids={userParticipatedCanvasIds}
          rows={2}
          title={"Participations"}
          contract={props.contract}
          activeAccount={props.activeAccount}
        />
      </Box>
    </Box>
  );
}
