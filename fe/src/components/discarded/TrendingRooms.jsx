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
import "../../App.css";
import DisplayCard from "../DisplayCard";

export default function TrendingRooms(props) {
    return (
        <Box
            component="div"
            sx={{
                marginTop: "100px",
                marginBottom: "30px",
            }}
        >
            <Box
                component="div"
                sx={{
                    alignItems: "center",
                    marginBottom: "40px",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: "500",
                        fontFamily: "'Fredoka One', cursive",
                    }}
                >
                    Trending Rooms
                </Typography>
            </Box>
            <Box
                component="div"
                id="trendingCardsContainer"
                sx={{
                    paddingLeft: "9%"
                }}
            >
                <Grid
                    container
                    rowSpacing={3}
                    columnSpacing={{ lg: 2, md: 4 }}
                    columns={{ lg: 12, md: 8, sm: 4 }}
                    sx={{

                    }}
                >
                    {Array.from(Array(6)).map((_, index) => (
                        <Grid item sm={4} md={4} lg={4} key={index}>
                            <DisplayCard />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box
                component='div'
                sx={{
                    marginTop: "28px"
                }}
            >
                <Box
                 component="div"
                 id="viewAllRoomButton"
                 sx={{
                    alignItems: "center",
                    borderRadius: "16px",
                    backgroundColor: "#f2f5fd",
                    color: "#0057ff",
                    display: "flex",
                    justifyContent: "center",
                    padding: "16px",
                    marginLeft: "9%",
                    marginRight: "6%",
                    fontWeight: "300",
                    fontFamily: "'Fredoka One', cursive",
                    fontSize: "18px"
                 }}
                >
                    <span>View All Rooms</span>
                </Box>
            </Box>
        </Box>
    );
}