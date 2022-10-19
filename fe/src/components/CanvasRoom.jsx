import { Box, Typography } from '@mui/material';
import "../App.css";
import CanvasBox from './CanvasBox';
export default function CanvasRoom(props) {
    return (
      <Box component="div" id="canvasBoxContainer">
        <Typography variant='h4' id="roomTitle">
            Lets Rock the Party
        </Typography>
        <CanvasBox/>
      </Box>  
    );
}