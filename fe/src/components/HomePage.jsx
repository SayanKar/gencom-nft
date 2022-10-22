import {
    Box
} from "@mui/material";
import "../App.css";
import Navbar from './Navbar';

export default function HomePage(props) {
    return (
        <Box component="div">
            <Navbar />
        </Box>
    );
}