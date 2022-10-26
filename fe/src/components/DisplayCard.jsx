import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import Circle from "@mui/icons-material/Circle";
import testImage from "../test.jpg";
import { fontSize } from "@mui/system";
export default function DisplayCard(props) {
  const { width = "320px", height = "300px" } = props;
  const bottomStripColor = {
    "0" : {
      text : "#42a5f5",
      background: "#cce8ff",
      tag: "Room opening soon"
    },
    "1" : {
      text : "#388e3c",
      background: "#dffce1",
      tag: "Room live"
    },
    "2" : {
      text : "#f57c00",
      background: "#ffddab",
      tag: "Room expired",
    }
  };

  return (
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
      <Box
        sx={{
          width: "calc(100% - 32px)",
          height: "320px",
          borderRadius: "10px",
          margin: "16px 16px 0 16px",
          background: "gray",
          overflow: "hidden",
        }}
      ></Box>
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
        Rock the party is the only one rocking the dapp
      </Typography>
      <Stack direction="row" sx={{margin:"10px 0"}}>
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
          color: bottomStripColor["2"].text,
          background: bottomStripColor["2"].background,
        }}
      >{bottomStripColor["2"].tag}</Typography>
      </CardActionArea>
    </Card>
  );
}
