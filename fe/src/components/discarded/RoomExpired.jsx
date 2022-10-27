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

export default function RoomExpired(props) {
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
                    flexGrow: "1",
                    borderRadius: "8px",
                    justifyContent: "center",
                    padding: "4px 6px",
                    backgroundColor: "#e84a31",
                    color: "rgb(255, 255, 255)",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                    }}
                >
                    🕒 Room Expired
                </Typography>
            </Box>
            <Box
                component="div"
                sx={{
                    flexGrow: "3",
                    justifyContent: 'flex-start'
                }}
            >
                <Typography
                    sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                    }}
                >
                    <span id="roomLink">
                        <a href=""> HB-Club-goblintown </a>
                    </span>
                    just expired!
                </Typography>
            </Box>
        </Stack>
    );
}