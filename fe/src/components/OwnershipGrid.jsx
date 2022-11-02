import { Box, Typography } from "@mui/material";
import GridSVG from "./GridSVG";

export default function OwnershipGrid(props) {
  return (
    <Box
      sx={{
        background: "#807f82",
        display: "flex",
        width: "100%",
        height: "700px",
        justifyContent: "center",
        padding: "40px 0",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{}}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Fredoka One', cursive",
            width: "500px",
            margin: "20px auto",
            marginBottom: "40px",
            color: "white",
          }}
          align="center"
        >
          Your owned cells
        </Typography>
      </Box>
      <Box>
        <GridSVG width={20} height={20} singleColor={"#393640"} />
      </Box>
    </Box>
  );
}
