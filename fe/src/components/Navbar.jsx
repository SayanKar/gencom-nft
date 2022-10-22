import {
    Box,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Stack,
    Button,
} from "@mui/material";
import "../App.css";
import PixelImage from '../pixelimage.jpg';
import { fontWeight } from "@mui/system";

export default function Navbar(props) {
    return (
        <AppBar
         position="sticky"
         elevation={0}
         sx={{
            backgroundColor: "white",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            zIndex: "99",
            top: "0",
            justifyContent: 'space-between',
            borderBottom: "1px solid #eaebed"
         }}>
            <Toolbar>
                <Box
                 component="div"
                 sx={{ 
                    display: "flex",
                    flexGrow: "2"
                  }}>
                    <Box
                     component="div"
                     href="/"
                     sx={{
                        cursor: "pointer",
                     }}>
                        <img src={PixelImage} alt="logo" height="50" width="50" />
                     </Box>
                     <Box
                      component="div"
                      href="/"
                      sx={{ 
                        display: "flex",
                        padding: "0.5rem 0.5rem",
                        cursor: "pointer"
                       }}>
                        <Typography
                         variant="h6"
                         sx={{ 
                            color: "black",
                            fontWeight: "700",
                          }}>
                            Gen
                        </Typography>
                        <Typography
                         variant="h6"
                         sx={{ 
                            color: "#0057ff",
                            fontWeight: "700",
                          }}>
                            com
                        </Typography>
                      </Box>
                 </Box>
                <Stack direction="row" spacing={2}>
                    <Button
                     variant="text"
                     sx={{
                        color: "#0057ff",
                        fontSize: "0.875rem",
                        cursor: "pointer",
                        justifyContent: "center",
                        fontWeight: "700",
                        border: "none",
                        borderRadius: "0.75rem",
                        padding: "0.5rem 0.75rem",
                        transition: "0.1s ease",
                        textTransform: "none",
                        }}>
                            + Create a room
                    </Button>
                    <Button
                     variant="text"
                     sx={{
                        color: "#0057ff",
                        fontSize: "0.875rem",
                        cursor: "pointer",
                        justifyContent: "center",
                        fontWeight: "700",
                        border: "none",
                        borderRadius: "0.75rem",
                        padding: "0.5rem 0.75rem",
                        transition: "0.1s ease",
                        textTransform: "none"
                        }}>
                            All Rooms
                    </Button>
                    <Button
                     variant="text"
                     sx={{
                        color: "#0057ff",
                        fontSize: "0.875rem",
                        cursor: "pointer",
                        justifyContent: "center",
                        fontWeight: "700",
                        border: "none",
                        borderRadius: "0.75rem",
                        padding: "0.5rem 0.75rem",
                        transition: "0.1s ease",
                        textTransform: "none"
                        }}>
                            About
                    </Button>                    
                    <Button
                     variant="contained"
                     disableElevation 
                     size="small"
                     sx={{
                        textTransform: "none",
                        fontweight: "700",
                        justifyContent: "center",
                        cursor: "pointer",
                        backgroundColor: "#0057ff",
                        borderRadius: ".75rem",
                        padding: "0.5rem 0.75rem",
                        transition: "0.1s ease",
                        border: "none",
                     }}>
                        Connect Wallet
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}