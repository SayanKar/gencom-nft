import { Box, Grid, Typography } from "@mui/material";
export default function CardList(props) {
    return (
        <Box sx={{width: "90%", margin: "0 auto"}}>
            <Typography sx={{ fontFamily : "'Fredoka One', cursive"}} align="left" variant="h6"> Trending Rooms</Typography>
            <Grid container spacing={2}>
                
            </Grid>
        </Box>
    );
}