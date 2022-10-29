import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Stack,
  Paper,
  Skeleton,
} from "@mui/material";
import Circle from "@mui/icons-material/Circle";
import { colors } from "../constants";
import GridSVG from "./GridSVG";
import { Link } from "react-router-dom";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function BuilderCard(props) {
  const { width = "352px", height = "300px" } = props;

  return (
    <Card
      sx={{
        width: width,
        height: "fit-content",
        borderRadius: "16px",
        minWidth: "250px",
        minHeight: "400px",
        border: "1px solid rgb(233, 232, 232)",
      }}
    >
      <CardActionArea
        sx={{
          cursor: "auto",
        }}
      >
        <Box sx={{ textDecoration: "none !important" }}>
          <Box
            sx={{
              width: "calc(100% - 32px)",
              height: "320px",
              borderRadius: "10px",
              margin: "16px 16px 0 16px",
              background: "gray",
              overflow: "hidden",
            }}
          >
            <img src={props.link} id="sayanImage" />
          </Box>
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
            {props.name}
          </Typography>
          <Stack
            direction="row"
            sx={{ margin: "20px 0", justifyContent: "space-evenly" }}
          >
            <a href={props.twitter}>
              <TwitterIcon
                sx={{
                  color: "rgb(29, 155, 240)",
                  fontSize: "2rem",
                }}
              />
            </a>
            <a href={props.github}>
              <GitHubIcon
                sx={{
                  fontSize: "2rem",
                }}
              />
            </a>
            <a href={props.linkedin}>
              <LinkedInIcon
                sx={{
                  fontSize: "2rem",
                  color: "#0077b5",
                }}
              />
            </a>
          </Stack>
        </Box>
      </CardActionArea>
    </Card>
  );
}
