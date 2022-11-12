import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Stack,
  Button,
  Card,
  CardActionArea,
  Menu,
  MenuItem,
  List,
  ListItem,
  Drawer,
  Divider,
} from "@mui/material";
import "../App.css";
import PixelImage from "../assets/pixelimage.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import ChooseAccount from "./ChooseAccount";
import Identicon from "@polkadot/react-identicon";
import { cutAddress } from "../Integration";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Navbar(props) {
  const isMobile = useMediaQuery("(max-width:700px)");
  const navigate = useNavigate();
  const [openChangeAccount, setChangeAccount] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    !isMobile && setAnchorEl(event.currentTarget);
    isMobile && setChangeAccount(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log("Open", openChangeAccount);

  const list = (anchor) => (
    <Box sx={{ width: 200 }} role="presentation">
      <List sx={{ padding: "60px 0 20px 0" }}>
        {[
          { text: "+ Create a room", link: "/create/" },
          { text: "All Room", link: "/canvas/" },
          { text: "About", link: "/about/" },
        ].map((item, idx) => (
          <ListItem disablePadding key={idx}>
            <ListItemButton
              onClick={() => {
                setOpenDrawer(false);
                navigate(item.link);
              }}
            >
              <ListItemText
                primaryTypographyProps={{
                  color: "#0057ff",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  justifyContent: "center",
                  fontWeight: "400",
                  fontFamily: "'Fredoka One', cursive",
                }}
                primary={item.text}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {props.activeAccount &&
          ["Profile", "Logout"].map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => {
                  setOpenDrawer(false);

                  if (text === "Profile") {
                    navigate("/profile/" + props.activeAccount.address);
                  } else {
                    props.setActiveAccount(null);
                  }
                }}
              >
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{
                    color: "gray",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    justifyContent: "center",
                    fontWeight: "400",
                    fontFamily: "'Fredoka One', cursive",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "white",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        zIndex: "99999",
        justifyContent: "space-between",
        borderBottom: "1px solid #eaebed",
        marginTop: "-35px",
      }}
    >
      <Toolbar>
        {isMobile &&
          (!openDrawer ? (
            <MenuIcon
              sx={{ color: "gray", marginRight: "20px" }}
              onClick={() => setOpenDrawer(true)}
            />
          ) : (
            <MenuOpenIcon
              sx={{ color: "gray", marginRight: "20px" }}
              onClick={() => setOpenDrawer(false)}
            />
          ))}
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
          {!isMobile && (
            <>
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
              <Link to="/about">
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
              </Link>
            </>
          )}
          {props.activeAccount === null ? (
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
              onClick={() => setChangeAccount(true)}
            >
              Connect Wallet
            </Button>
          ) : (
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: "25px",
                boxShadow: "none",
                border: "1.5px solid #0057ff",
              }}
              onClick={handleClick}
              id="profile"
              aria-controls={open ? "profile-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <CardActionArea
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  padding: "0 10px",
                  width: "100%",
                }}
              >
                <Identicon
                  value={props.activeAccount?.address}
                  size={25}
                  theme={"polkadot"}
                />
                <Typography
                  variant="body2"
                  sx={{
                    marginLeft: "5px",
                    fontFamily: "'Fredoka One', cursive",
                  }}
                >
                  {cutAddress(props.activeAccount?.address)}
                </Typography>
              </CardActionArea>
            </Card>
          )}
        </Stack>

        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "profile",
          }}
          sx={{ marginTop: "5px" }}
        >
          <Link
            to={"/profile/" + props.activeAccount?.address}
            sx={{ width: "100%", height: "100%" }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
          </Link>
          <MenuItem
            onClick={() => {
              setChangeAccount(true);
              handleClose();
            }}
          >
            Change Account
          </MenuItem>
          <MenuItem
            onClick={() => {
              props.setActiveAccount(null);
              handleClose();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>

      <ChooseAccount
        open={openChangeAccount}
        handleClose={() => setChangeAccount(false)}
        setActiveAccount={(acc) => props.setActiveAccount(acc)}
      />

      <Drawer
        anchor={"left"}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        {list("left")}
      </Drawer>
    </AppBar>
  );
}
