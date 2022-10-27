import { Box, Grid, Typography } from "@mui/material";
import DisplayCard from "./DisplayCard";
export default function CardList(props) {
  const renderItems = () => {
    return props.ids.map((id) => {
      return (
        <Grid
          item
          lg={4}
          sm={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <DisplayCard id={id} />
        </Grid>
      );
    });
  };
  return (
    <Box sx={{ width: "90%", margin: "40px auto" }}>
      <Typography
        sx={{ fontFamily: "'Fredoka One', cursive", marginBottom: "30px" }}
        align="left"
        variant="h6"
      >
        {" "}
        Trending Rooms
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          maxHeight: props.rows ? "" + 535 * props.rows + "px" : "fit-content",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {renderItems()}
      </Grid>
      {props.isMain && (
        <Box
          sx={{
            width: "100%",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "15px",
            background: "#cce8ff",
            margin: "20px 0",
            cursor: "pointer",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontFamily: "'Ubuntu Condensed', sans-serif",
              fontWeight: "500",
            }}
            color="primary"
          >
            View All Canvas
          </Typography>
        </Box>
      )}
    </Box>
  );
}
