import {
  Box,
  Button,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
  Stack,
} from "@mui/material";
import "../App.css";

export default function VideoTutorial(pros) {
  return (
    <Box
      component="div"
      sx={{
        margin: "60px auto",
        width: "90%",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "400",
          fontFamily: "'Fredoka One', cursive",
          marginBottom: "40px",
        }}
      >
        How to buy your first Gencom NFT?
      </Typography>
      <Box
        component="div"
        sx={{
          height: "600px",
          marginLeft: "15%",
          marginRight: "15%",
        }}
      >
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="How to buy your first Gencom NFT?"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          id="tutorialVideo"
        />
      </Box>
    </Box>
  );
}
