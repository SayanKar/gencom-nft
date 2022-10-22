import Circle from "@mui/icons-material/Circle";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Tooltip,
  Avatar,
  Divider,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import "../App.css";
import CanvasBox from "./CanvasBox";
import Navbar from "./Navbar";
export default function CanvasRoom(props) {
  return (
    <Box component="div">
      <Navbar />
      <Box component="div" id="canvasBoxContainer">
        <Typography variant="h4" id="roomTitle">
          Lets Rock the Party
        </Typography>
        <Box
          component="div"
          sx={{
            width: "100%",
            paddingTop: "20px",
            margin: "auto",
            marginBottom: "20px",
            maxWidth: "600px",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Tooltip title="Countdown till bidding ends" arrow>
                <Paper
                  elevation="1"
                  sx={{
                    borderRadius: "10px",
                    width: " 350px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{ fontWeight: "500" }}
                  >
                    <Circle
                      sx={{
                        color: "#02be01",
                        fontSize: "16px",
                        margin: "0px 8px -3px 0px",
                      }}
                    />
                    10 days : 14 hrs : 36 mins : 50 sec
                  </Typography>
                </Paper>
              </Tooltip>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Tooltip title="Room Id" arrow>
                <Paper
                  elevation="1"
                  sx={{
                    borderRadius: "10px",
                    width: " 200px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{ fontWeight: "500" }}
                  >
                    Room Id: 12543
                  </Typography>
                </Paper>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
        <CanvasBox />
      </Box>
      <Box
        component="div"
        sx={{
          width: "100%",
          height: "100%",
          padding: "210px 0px 100px 0px",
          margin: "auto",
          position: "relative",
        }}
      >
        <Box
          component="div"
          sx={{
            position: "absolute",
            height: "100px",
            top: "-30px",
            left: "0px",
            width: "calc(100% - 60px)",
            padding: "0 30px 0 30px",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
              }}
              md={12}
              lg={6}
            >
              <Tooltip title="Creator Address" arrow>
                <Paper
                  elevation="1"
                  sx={{
                    borderRadius: "25px",
                    width: " fit-content",
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 20px",
                  }}
                >
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{
                      fontWeight: "500",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar sx={{ background: "#000", marginRight: "15px" }} />
                    0x4c2b769913DaBa0Fe66901E79190125E0193fb02
                  </Typography>
                </Paper>
              </Tooltip>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              md={12}
              lg={6}
            >
              <Grid
                container
                sx={{
                  width: "75%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                  md={12}
                  lg={6}
                >
                  <Tooltip title="Total Bids" arrow>
                    <Paper
                      elevation="1"
                      sx={{
                        borderRadius: "25px",
                        width: " fit-content",
                        height: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0 20px",
                      }}
                    >
                      <Typography
                        variant="body2"
                        align="center"
                        sx={{
                          fontWeight: "500",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <HowToVoteIcon sx={{ marginRight: "8px" }} />
                        Bids: 23112
                      </Typography>
                    </Paper>
                  </Tooltip>
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                  md={12}
                  lg={6}
                >
                  <Tooltip title="Total Unique Bidders" arrow>
                    <Paper
                      elevation="1"
                      sx={{
                        borderRadius: "25px",
                        width: " fit-content",
                        height: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0 20px",
                      }}
                    >
                      <Typography
                        variant="body2"
                        align="center"
                        sx={{
                          fontWeight: "500",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <PeopleAltIcon sx={{ marginRight: "8px" }} />
                        Participants: 100
                      </Typography>
                    </Paper>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <Grid
            item
            md={12}
            lg={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Paper
              sx={{
                height: "fit-content",
                width: "464px",
                borderRadius: "15px",
                padding: "40px",
                marginBottom: "60px",
              }}
              elevation={24}
            >
              <Typography variant="h6" align="left" width={"100%"}>
                Description
              </Typography>
              <Divider />
              <Typography
                variant="subtitle2"
                align="left"
                width={"100%"}
                marginTop={"30px"}
                color="#555555"
              >
                Google’s Material Icons provides a long list of icons. Choose
                any one of them and add the name of the icon class to any HTML
                element within the tag. In the following example, we have used
                the icon named accessibility that belongs to the action
                category.
              </Typography>
            </Paper>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ position: "absolute", right: "0px", height: "300px" }}
            />
          </Grid>
          <Grid
            item
            md={12}
            lg={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box component="div">
              <Typography variant="h5" fontWeight={"500"} align="center">
                Recent Bids
              </Typography>
              <Box
                component="div"
                sx={{
                  overflow: "auto",
                  maxHeight: "235px",
                  marginTop: "30px",
                  width: "480px",
                  padding: "20px 0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Paper
                  sx={{
                    width: "400px",
                    height: "fit-content",
                    padding: "10px",
                    borderRadius: "15px",
                    marginBottom: "25px",
                  }}
                  elevation={8}
                >
                  <Typography variant="caption">
                    {" "}
                    0x4c2b769913DaBa0Fe66901E79190125E0193fb02 has bid 50.3 EDG
                    for Cell on Row 13 and Column 14. Cell color is
                  </Typography>
                </Paper>
                <Paper
                  sx={{
                    width: "400px",
                    height: "fit-content",
                    padding: "10px",
                    borderRadius: "15px",
                    marginBottom: "25px",
                  }}
                  elevation={8}
                >
                  <Typography variant="caption">
                    {" "}
                    0x4c2b769913DaBa0Fe66901E79190125E0193fb02 has bid 50.3 EDG
                    for Cell on Row 13 and Column 14. Cell color is
                  </Typography>
                </Paper>
                <Paper
                  sx={{
                    width: "400px",
                    height: "fit-content",
                    padding: "10px",
                    borderRadius: "15px",
                    marginBottom: "25px",
                  }}
                  elevation={8}
                >
                  <Typography variant="caption">
                    {" "}
                    0x4c2b769913DaBa0Fe66901E79190125E0193fb02 has bid 50.3 EDG
                    for Cell on Row 13 and Column 14. Cell color is
                  </Typography>
                </Paper>
                <Paper
                  sx={{
                    width: "400px",
                    height: "fit-content",
                    padding: "10px",
                    borderRadius: "15px",
                    marginBottom: "25px",
                  }}
                  elevation={8}
                >
                  <Typography variant="caption">
                    {" "}
                    0x4c2b769913DaBa0Fe66901E79190125E0193fb02 has bid 50.3 EDG
                    for Cell on Row 13 and Column 14. Cell color is
                  </Typography>
                </Paper>
                <Paper
                  sx={{
                    width: "400px",
                    height: "fit-content",
                    padding: "10px",
                    borderRadius: "15px",
                    marginBottom: "25px",
                  }}
                  elevation={8}
                >
                  <Typography variant="caption">
                    {" "}
                    0x4c2b769913DaBa0Fe66901E79190125E0193fb02 has bid 50.3 EDG
                    for Cell on Row 13 and Column 14. Cell color is
                  </Typography>
                </Paper>
                <Paper
                  sx={{
                    width: "400px",
                    height: "fit-content",
                    padding: "10px",
                    borderRadius: "15px",
                    marginBottom: "25px",
                  }}
                  elevation={8}
                >
                  <Typography variant="caption">
                    {" "}
                    0x4c2b769913DaBa0Fe66901E79190125E0193fb02 has bid 50.3 EDG
                    for Cell on Row 13 and Column 14. Cell color is
                  </Typography>
                </Paper>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
