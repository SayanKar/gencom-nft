import { Box, Typography } from "@mui/material";
import brokenRobot from "../assets/broken-robot.png";
export default function Broken(props) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <img src={brokenRobot} alt={"Robot Image"} style={{width: "300px"}}/>
      <Typography variant="h6" sx={{fontWeight: "500"}}>Something broke :(</Typography>
    </Box>
  );
}
