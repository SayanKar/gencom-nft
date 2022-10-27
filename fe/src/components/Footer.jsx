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
    Item
} from "@mui/material";
import "../App.css";
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import PixelImage from '../pixelimage.jpg';

export default function Footer(props) {
    return (
        <Box
            component="div"
            sx={{
                paddingTop: "30px",
                backgroundColor: "white",
            }}
        >
            <Box
                component="div"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "15px"
                }}
            >
                <a href="">
                    <TwitterIcon
                        id="twitterIcon"
                        sx={{
                            marginRight: "15px",
                            fontSize: "30px",
                            cursor: "pointer",
                            color: "grey"
                        }} />
                </a>

                <a href="">
                    <GitHubIcon
                        id="githubIcon"
                        sx={{
                            marginRight: "15px",
                            fontSize: "30px",
                            cursor: "pointer",
                            color: "grey"
                        }} />
                </a>

                <a href="">
                    <InstagramIcon
                        id="instagramIcon"
                        sx={{
                            marginRight: "15px",
                            fontSize: "30px",
                            cursor: "pointer",
                            color: "grey"
                        }} />
                </a>
            </Box>
            <Box
                component="div"
                sx={{
                    marginBottom: "10px",
                }}
            >
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: "400",
                        fontFamily: "'Fredoka One', cursive"
                    }}
                >
                    Gencom is a platform for creating art together as a community,
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        fontFamily: "'Fredoka One', cursive",
                        fontWeight: "400",
                    }}
                >
                    owning art together as a community.
                </Typography>
            </Box>
            <Box
                component="div"
                sx={{
                    marginBottom: "30px",
                }}>
                    <img
                     src={PixelImage}
                     alt="Logo"
                     id="footerSiteLogo"
                    />
            </Box>
        </Box>
    );
}