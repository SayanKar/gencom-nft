import {
  Box,
} from "@mui/material";
import "../App.css";
import errorImg from "../assets/404.jpg";

export default function Error404(props) {
  return (
    <Box
      component="div"
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <img
        src={errorImg}
        alt="error 404 - page not found image"
        id="errorImg"
      ></img>
    </Box>
  );
}
