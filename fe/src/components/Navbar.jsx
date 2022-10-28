import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import "../App.css";
import PixelImage from "../pixelimage.jpg";
import { fontWeight } from "@mui/system";
import { Link } from "react-router-dom";
export default function Navbar(props) {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "white",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        zIndex: "99",
        justifyContent: "space-between",
        borderBottom: "1px solid #eaebed",
        marginTop: "-35px",
      }}
    >
      <Toolbar>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexGrow: "2",
          }}
        >
          <Link to="/">
          <Box
            component="div"
            sx={{
              display: "flex",
            }}
          >
            <Box
              component="div"
              href="/"
              sx={{
                cursor: "pointer",
              }}
            >
              <img src={PixelImage} alt="logo" height="50" width="50" />
            </Box>
            <Box
              component="div"
              href="/"
              sx={{
                display: "flex",
                padding: "0.5rem 0.5rem",
                cursor: "pointer",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "black",
                  fontWeight: "400",
                  fontFamily: "'Fredoka One', cursive",
                }}
              >
                Gen
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#0057ff",
                  fontWeight: "400",
                  fontFamily: "'Fredoka One', cursive",
                }}
              >
                com
              </Typography>
            </Box>
          </Box>
          </Link>
        </Box>
        <Stack direction="row" spacing={2}>
          <Link to="/create">
            <Button
              variant="text"
              sx={{
                color: "#0057ff",
                fontSize: "0.875rem",
                cursor: "pointer",
                justifyContent: "center",
                fontWeight: "400",
                border: "none",
                borderRadius: "0.75rem",
                padding: "0.5rem 0.75rem",
                transition: "0.1s ease",
                textTransform: "none",
                fontFamily: "'Fredoka One', cursive",
              }}
            >
              + Create a room
            </Button>
          </Link>
          <Link to="/canvas">
          <Button
            variant="text"
            sx={{
              color: "#0057ff",
              fontSize: "0.875rem",
              cursor: "pointer",
              justifyContent: "center",
              fontWeight: "400",
              border: "none",
              borderRadius: "0.75rem",
              padding: "0.5rem 0.75rem",
              transition: "0.1s ease",
              textTransform: "none",
              fontFamily: "'Fredoka One', cursive",
            }}
          >
            All Rooms
          </Button>
          </Link>
          <Button
            variant="text"
            sx={{
              color: "#0057ff",
              fontSize: "0.875rem",
              cursor: "pointer",
              justifyContent: "center",
              fontWeight: "400",
              border: "none",
              borderRadius: "0.75rem",
              padding: "0.5rem 0.75rem",
              transition: "0.1s ease",
              textTransform: "none",
              fontFamily: "'Fredoka One', cursive",
            }}
          >
            About
          </Button>
          <Button
            variant="contained"
            disableElevation
            size="small"
            sx={{
              textTransform: "none",
              fontweight: "400",
              justifyContent: "center",
              cursor: "pointer",
              backgroundColor: "#0057ff",
              borderRadius: ".75rem",
              padding: "0.5rem 0.75rem",
              transition: "0.1s ease",
              border: "none",
              fontFamily: "'Fredoka One', cursive",
            }}
          >
            Connect Wallet
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
