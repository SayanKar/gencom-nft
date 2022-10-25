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
import FeaturedRoomCard from './FeaturedRoomCard';

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
                        sx={{ display: "flex", justifyContent: "center" }}
                     >
                        <Grid
                           item
                           md={12}
                           lg={4}
                           sx={{ display: "flex", justifyContent: "center" }}
                        >
                           <FeaturedRoomCard />
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