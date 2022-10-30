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
import loading from '../assets/loading.gif';

export default function Loading(props) {
    return (
        <Box
         component="div"
         sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
         }}
        >
            <img src={loading} alt="loading"/>
        </Box>
    );
}