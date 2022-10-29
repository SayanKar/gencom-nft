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
    Divider,
} from "@mui/material";
import "../App.css";
import PixelImage from '../assets/pixelimage.jpg';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function About(props) {
    return (
        <Box
            component="div"
        >
            <Box
                component="div"
                id="introContainer"
                sx={{
                    display: "flex",
                    paddingBottom: "20px"
                }}
            >
                <Box
                    component="div"
                >
                    <img
                        src={PixelImage}
                        alt="Gencom Logo - A pixel drawing of panda"
                        height="100%"
                    />
                </Box>
                <Box
                    component="div"
                    id="introTextContainer"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Box component="div">
                        <Typography
                            variant="h5"
                            id="introText"
                            sx={{
                                fontFamily: "cursive",
                                fontSize: "1.5rem",
                                lineHeight: "150%",
                                fontWeight: "400",
                                textAlign: 'left',
                                marginRight: "6rem"
                            }}
                        >
                            <span id="siteNameInAbout">Gencom</span>
                            {" "}
                            is a platform for creating and owning NFT as a community. Create a
                            canvas, buy slot on the canvas along with others and create art together.
                            Own the art together with others as a NFT.
                        </Typography>
                        <Divider sx={{ marginTop: "3%", width: "88%", marginBottom: "3%" }} />
                        <Typography
                            variant="h3"
                            id="totalTokenAmount"
                            sx={{
                                fontWeight: "bold",
                                fontSize: "3rem",
                                textAlign: "left",
                                marginRight: "6rem",
                                fontFamily: "cursive",
                            }}
                        >
                            1,234.56 EDG
                        </Typography>
                        <Typography
                            variant="h6"
                            id="contributorCaption"
                            sx={{
                                fontWeight: "400",
                                textAlign: "left",
                                fontSize: "1.2rem",
                                marginTop: "1rem",
                                color: "rgb(71 85 105)"
                            }}
                        >
                            Contributed to 9,498 Rooms by 4,172 users
                        </Typography>
                        <Divider sx={{ marginTop: "3%", width: "88%", marginBottom: "3%" }} />
                        <Stack direction="row" spacing={4} sx={{ justifyContent: "left" }} id="contactContainer">
                            <a href="">
                                <Box
                                    component="div"
                                    sx={{
                                        display: "flex",
                                        cursor: "pointer",
                                    }}
                                >

                                    <TwitterIcon
                                        sx={{
                                            fontSize: "1.7rem",
                                            cursor: "pointer",
                                            color: "black",
                                            marginRight: "5px"
                                        }} />

                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontFamily: "'Fredoka One', cursive",
                                            fontWeight: "400",
                                        }}
                                    >
                                        Twitter
                                    </Typography>
                                </Box>
                            </a>
                            <a href="">
                                <Box
                                    component="div"
                                    sx={{
                                        display: "flex",
                                        cursor: "pointer",
                                    }}
                                >
                                    <GitHubIcon
                                        sx={{
                                            fontSize: "1.7rem",
                                            cursor: "pointer",
                                            color: "black",
                                            marginRight: "5px",
                                        }} />
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontFamily: "'Fredoka One', cursive",
                                            fontWeight: "400",
                                        }}
                                    >
                                        Github
                                    </Typography>
                                </Box>
                            </a>
                            <a href="">
                                <Box
                                    component="div"
                                    sx={{
                                        display: "flex",
                                        cursor: "pointer"
                                    }}
                                >
                                    <InstagramIcon
                                        sx={{
                                            fontSize: "1.7rem",
                                            cursor: "pointer",
                                            color: "black",
                                            marginRight: "5px",
                                        }} />
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontFamily: "'Fredoka One', cursive",
                                            fontWeight: "400",
                                        }}
                                    >
                                        Instagram
                                    </Typography>
                                </Box>
                            </a>
                        </Stack>
                    </Box>
                </Box>
            </Box>
            <Box
                component="div"
                id="tutorialContainer"
                sx={{
                    backgroundColor: "#AEBDCA",
                    paddingTop: "150px",
                    paddingBottom: "150px",
                }}
            >
                <Grid
                    container
                    sx={{
                        paddingLeft: "100px",
                        paddingRight: "100px",
                        marginBottom: "50px",
                    }}
                    spacing={3}
                >
                    <Grid
                        item
                        lg={4}
                        md={12}
                        sm={12}
                        xs={12}
                        sx={{
                            width: "33%"
                        }}
                    >
                        <Divider sx={{ backgroundColor: "black", height: "0.5px", marginBottom: "20px", }} id="aboutDivider1"/>
                        <Typography
                            variant="h5"
                            sx={{
                                color: "black",
                                fontWeight: "200",
                                fontFamily: "'Fredoka One', cursive",
                            }}
                            align="left"
                        >
                            Creating a Room
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "rgb(71, 85, 105)",
                                marginTop: "20px",
                                lineHeight: "150%",
                                fontSize: "1.1rem",
                                fontWeight: "500",
                            }}
                            align="left"
                        >
                            Anyone can create a room by simply clicking
                            {" "}
                            <a href="/create" id="essentialLink1">"Create a Room"</a>
                            {" "}
                            and filling the inputs present in the form.
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={12}
                        sm={12}
                        xs={12}
                        sx={{
                            width: "33%",
                        }}
                    >
                        <Divider sx={{ backgroundColor: "black", height: "0.5px", marginBottom: "20px", }} id="aboutDivider2"/>
                        <Typography
                            variant="h5"
                            sx={{
                                color: "black",
                                fontWeight: "200",
                                fontFamily: "'Fredoka One', cursive",
                            }}
                            align="left"
                        >
                            Joining a Room
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "rgb(71, 85, 105)",
                                marginTop: "20px",
                                lineHeight: "150%",
                                fontSize: "1.1rem",
                                fontWeight: "500",
                            }}
                            align="left"
                        >
                            Anyone can join a live room by simply clicking
                            {" "}
                            <a href="/canvas" id="essentialLink2">"Join a Room"</a>
                            {". "}
                            Click on the room you like and bid for the cell you want.
                            {" "}
                            Once you own a cell, you can color it the way you want.
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={12}
                        sm={12}
                        xs={12}
                        sx={{
                            width: "33%",
                        }}
                    >
                        <Divider sx={{ backgroundColor: "black", height: "0.5px", marginBottom: "20px", }} id="aboutDivider3"/>
                        <Typography
                            variant="h5"
                            sx={{
                                color: "black",
                                fontWeight: "200",
                                fontFamily: "'Fredoka One', cursive",
                            }}
                            align="left"
                        >
                            Claiming a NFT
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "rgb(71, 85, 105)",
                                marginTop: "20px",
                                lineHeight: "150%",
                                fontSize: "1.1rem",
                                fontWeight: "500",
                            }}
                            align="left"
                        >
                            Once the bidding period is over, one can simply
                            {" "}
                            claim the NFT for the cell they won.
                        </Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ backgroundColor: "black", height: "0.5px", marginBottom: "40px", marginLeft: "100px", marginRight: "100px", }} />
                <Grid
                    container
                    sx={{
                        paddingLeft: "100px",
                        paddingRight: "100px",
                    }}
                    spacing={4}
                >
                    <Grid
                        item
                        lg={4}
                        md={12}
                        sm={12}
                        xs={12}
                        sx={{
                            width: "33%",
                        }}
                    >
                        <Typography
                            variant="h3"
                            sx={{
                                fontSize: "1.75rem",
                                color: "rgb(71, 85, 105)",
                                fontFamily: "'Fredoka One', cursive",
                            }}
                            align="left">
                            What are the different types of NFT?
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={12}
                        sm={12}
                        xs={12}
                        sx={{
                            width: "33%",
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                color: "black",
                                fontWeight: "200",
                                fontFamily: "'Fredoka One', cursive",
                            }}
                            align="left"
                        >
                            Static
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "rgb(71, 85, 105)",
                                marginTop: "20px",
                                lineHeight: "150%",
                                fontSize: "1.1rem",
                                fontWeight: "500",
                            }}
                            align="left"
                        >
                            Owner can't change the color of the cell once the NFT is minted.
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={12}
                        sm={12}
                        xs={12}
                        sx={{
                            width: "33%",
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                color: "black",
                                fontWeight: "200",
                                fontFamily: "'Fredoka One', cursive",
                            }}
                            align="left"
                        >
                            Dynamic
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "rgb(71, 85, 105)",
                                marginTop: "20px",
                                lineHeight: "150%",
                                fontSize: "1.1rem",
                                fontWeight: "500",
                            }}
                            align="left"
                        >
                            Owner can change the color of the cell even after NFT is minted.
                            {" "}
                            Thus, the NFT art can keep on changing.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}