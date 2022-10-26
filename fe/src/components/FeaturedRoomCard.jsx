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
import testImage from '../test1.webp';

export default function FeaturedRoomCard(props) {
    return (
        <Card
            sx={{ borderRadius: "16px", paddingLeft: "10px", paddingRight: "10px", paddingTop: "10px" }}
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
                            fontWeight: "600",
                            height: "auto!important",
                            margin: "auto -16px -16px",
                            padding: "10px",
                            borderBottomLeftRadius: "16px",
                            borderBottomRightRadius: "16px",
                            marginBottom: "5px"
                        }}>
                        Party Live
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}