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
import Navbar from './Navbar';
import testImage from '../test.jpg';

export default function HomePage(props) {
    return (
        <Box component="div">
            <Navbar />
            <Box
             component="div"
             sx={{
                display: 'flex',
                justifyContent: 'center',
                minHeight: '100%',
             }}>
                <Box
                 component="div"
                 sx={{
                    fontWeight: "700",
                    minHeight: "calc(100vh - 4rem)",
                    width: "100vw",
                    boxShadow: "0 6px 10px rgb(0 0 0 / 5%)"
                 }}>
                    <Box
                     component="div"
                     sx={{
                        backgroundColor: "#fcc731",
                        cursor: "pointer",
                        minHeight: "330px",
                        paddingBottom: "72px",
                        paddingTop: "24px",
                     }}>
                        <Box
                         component="div"
                         id="topBox"
                         sx={{
                            margin: "0 auto",
                            overflow: "hidden",
                            padding: "20px"
                         }}>
                            <Box
                             component="div"
                             id="midBox"
                             sx={{
                                alignItems: "center",
                                display: "flex",
                                minHeight: "190px",
                                justifyContent: "space-between"
                             }}>
                                <Box
                                 component="div"
                                 id="lowBox"
                                >
                                 <h1 id="homePageHeader">NFT by the community, for the community.</h1>
                                 <Box
                                  component="div"
                                  id="buttonContainer"
                                  sx={{
                                    display: "flex",
                                    paddingLeft: "100px",
                                  }}>
                                    <Button
                                     variant="contained"
                                     disableElevation
                                     id="joinRoomButton"
                                     sx={{
                                       textTransform: "none",
                                       color: '#fff',
                                       cursor: 'pointer',
                                     }}>
                                       Join a Room
                                    </Button>
                                    <Button
                                     variant="contained"
                                     disableElevation
                                     id="startRoomButton"
                                     sx={{
                                       textTransform: 'none',
                                       width: '152px',
                                       height: '55px',
                                       borderRadius: '12px',
                                       fontSize: '18px',
                                       fontWeight: '600',
                                       lineHeight: '140%',
                                       border: 'none',
                                       transition: '0.1s ease',
                                       backgroundColor: '#0057ff',
                                       color: '#fff',
                                       cursor: 'pointer',
                                       marginLeft: '30px'
                                     }}>
                                       Start a Room
                                    </Button> 
                                 </Box>
                                </Box>
                             </Box>
                         </Box>
                     </Box>
                     <Box
                      component="div"
                      sx={{
                        marginTop: '-70px',
                        marginLeft: '10px',
                        marginRight: '10px',
                      }}
                     >
                        <Box
                         component="div"
                         sx={{
                           marginTop: "-70px",
                           marginLeft: "180px",
                           marginRight: "180px",
                           paddingLeft: "40px",
                         }}>
                           <Grid
                            container
                            spacing={2}
                            sx={{ display: "flex", justifyContent: "center"}}
                           >
                              <Grid
                               item
                               md={12}
                               lg={4}
                               sx={{ display: "flex", justifyContent: "center" }}
                              >
                                 <Card
                                  sx={{ borderRadius: "16px", paddingLeft: "10px", paddingRight: "10px", paddingTop: "10px"}}
                                 >
                                    <CardActionArea>
                                       <CardMedia
                                        component="img"
                                        height="350"
                                        image={testImage}
                                        alt="featured room image"
                                        sx={{ 
                                          borderRadius: "16px"
                                        }}
                                       />
                                       <CardContent>
                                          <Typography variant="h4"
                                           sx={{ 
                                             fontWeight: "900",
                                             fontFamily: "serif",
                                            }}>
                                             Room Name
                                          </Typography>
                                          <Stack direction="row" spacing={2}
                                           sx={{
                                             justifyContent: "center",
                                             marginTop: "3px",
                                           }}>
                                             <Typography variant="h6"
                                              sx={{
                                                fontWeight: "800",
                                                fontFamily: "serif",
                                              }}>
                                                0.18 ETH
                                             </Typography>
                                             <Typography variant="h6"
                                              sx={{
                                                fontWeight: "800",
                                                fontFamily: "serif",
                                              }}>
                                                9 members
                                             </Typography>
                                          </Stack>
                                          <Box
                                           component="div"
                                           sx={{
                                             backgroundColor: "rgb(243, 246, 254)",
                                             textAlign: "center",
                                             color: "rgb(0, 87, 255)",
                                             fontSize: "14px",
                                             fontWeight: "500",
                                             height: "auto!important",
                                             margin: "auto -16px -16px",
                                             padding: "10px",
                                             borderBottomLeftRadius: "16px",
                                             borderBottomRightRadius: "16px",
                                           }}>
                                             Party Live
                                          </Box>
                                       </CardContent>
                                    </CardActionArea>
                                 </Card>
                              </Grid>
                              <Grid
                               item
                               md={12}
                               lg={8}
                               sx={{ display: "flex", justifyContent: "center" }}
                              >
                                 
                              </Grid>
                           </Grid>
                         </Box>
                     </Box>
                </Box>
            </Box>
        </Box>
    );
}