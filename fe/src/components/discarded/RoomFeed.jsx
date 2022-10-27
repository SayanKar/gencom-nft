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
import { height } from "@mui/system";
import "../App.css";
import NewRoomFeed from './NewRoomFeed.jsx';
import RoomExpired from './RoomExpired.jsx';

export default function RoomFeed(props) {
    return (
        <Card
            sx={{ borderRadius: "16px", width: "700px", maxHeight: '515px', overflowY: 'auto' }}
        >
            <Typography
                variant="h6"
                align="left"
                fontWeight="500"
                sx={{
                    marginBottom: "4px",
                    paddingTop: "10px",
                    paddingBottom: "8px",
                    paddingLeft: "20px",
                    fontSize: "16px",
                }}
            >
                Room Feed
            </Typography>
            <Divider sx={{ width: "700px" }} />
            <Box
                component="div"
                sx={{
                    overflowY: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: 'flex-start'
                }}
            >
                <NewRoomFeed />
                <Divider sx={{ width: "700px" }} />
                <RoomExpired />
                <Divider sx={{ width: "700px" }} />
                <NewRoomFeed />
                <Divider sx={{ width: "700px" }} />
                <NewRoomFeed />
                <Divider sx={{ width: "700px" }} />
                <NewRoomFeed />
                <Divider sx={{ width: "700px" }} />
                <RoomExpired />
                <Divider sx={{ width: "700px" }} />
                <NewRoomFeed />
                <Divider sx={{ width: "700px" }} />
                <RoomExpired />
                <Divider sx={{ width: "700px" }} />
                <RoomExpired />
                <Divider sx={{ width: "700px" }} />
                <NewRoomFeed />
                <Divider sx={{ width: "700px" }} />
            </Box>
        </Card>
    );
}