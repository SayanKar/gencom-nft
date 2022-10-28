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
            sx={{ fontFamily: "'Fredoka One', cursive", cursor: "pointer" }}
            onClick={() => {
              navigator.clipboard.writeText(address);
              enqueueSnackbar(
                "Address copied",
                { variant: "default" }
              );
            }}
          >
            {address}
          </Typography>
        </Tooltip>
        <CardList ids={[1,2,3,4,5,6,7,8]} rows={2}  title={"Your NFTs"}  isNFT={false}/>
        <CardList ids={[1,2,3,4,5,6,7,8]} rows={2}  title={"Created Canvas"} />
        <CardList ids={[1,2,3,4,5,6,7,8]} rows={2}  title={"Participations"} />

      </Box>
    </Box>
  );
}
