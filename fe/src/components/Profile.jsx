import { Alert, Box, Tooltip, Typography } from "@mui/material";
import Identicon from "@polkadot/react-identicon";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import CardList from "./CardList";
export default function Profile(props) {
  const { address } = useParams();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
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
            Canvas created: 5
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
            Participated: 40
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
        />
        <CardList
          ids={[1, 2, 3, 4, 5, 6, 7, 8]}
          rows={2}
          title={"Created Canvas"}
          isProfile={true}
          isEdit={true}
        />
        <CardList
          ids={[1, 2, 3, 4, 5, 6, 7, 8]}
          rows={2}
          title={"Participations"}
        />
      </Box>
    </Box>
  );
}
