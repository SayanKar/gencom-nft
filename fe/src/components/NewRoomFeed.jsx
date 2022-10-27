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
    CardHeader,
    Paper,
    Divider
} from "@mui/material";
import "../App.css";

export default function NewRoomFeed(props) {
    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{
                padding: "10px",
            }}>
            <Box
                component="div"
                sx={{
                    borderRadius: "8px",
                    justifyContent: "center",
                    padding: "4px 6px",
                    backgroundColor: "#0057ff",
                    color: "rgb(255, 255, 255)",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                    }}
                >
                    🚂 New Room
                </Typography>
            </Box>
            <Box
                component="div"
                sx={{
                    padding: "4px 0px"
                }}
            >
                <Typography
                    sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                    }}
                >
                    New Room created:
                    <span id="roomLink">
                        <a href=""> HB-Club-goblintown </a>
                    </span>
                    by
                    <span id="profileLink">
                        <a href=""> 0x7528..c464</a>
                    </span>
                    starting on
                    <span id="roomCreationDate">
                      13/01/2023
                    </span>
                </Typography>
            </Box>
        </Stack>
    );
}