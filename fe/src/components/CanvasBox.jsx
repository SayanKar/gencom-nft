import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@mui/material";
import CanvasGrid from "./CanvasGrid";
import SquareIcon from "@mui/icons-material/Square";
export default function CanvasBox(props) {
  return (
    <Box component="div" id="canvasBoxWrapperContainer">
      <Box component="div" id="canvasBoxWrapper">
        <Grid container spacing={2}>
          <Grid
            item
            md={12}
            lg={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card className="gridContainerCard" sx={{ borderRadius: "15px" }}>
              <CanvasGrid rows={32} columns={32} />
              <Typography
                variant="h6"
                align="left"
                id="selectionDetails"
                sx={{
                  width: "384px",
                  color: "rgba(31, 38, 59, 1)",
                  margin: "30px 0px 5px 0px",
                  fontWeight: "500",
                }}
              >
                Selection Details
              </Typography>
              <Divider sx={{ width: "384px", marginBottom: "10px" }} />
              <Box component="div" className="cardDataRow">
                <Typography
                  align="left"
                  variant="subtitle2"
                  sx={{ width: "192px" }}
                >
                  Row: <span style={{ color: "rgba(143,151,163,1)" }}> 20</span>
                </Typography>
                <Typography
                  align="right"
                  variant="subtitle2"
                  sx={{ width: "192px" }}
                >
                  Column:{" "}
                  <span style={{ color: "rgba(143,151,163,1)" }}> 13</span>
                </Typography>
              </Box>
              <Box component="div" className="cardDataRow">
                <Typography
                  align="left"
                  variant="subtitle2"
                  sx={{ width: "382px" }}
                >
                  Owner:{" "}
                  <span
                    style={{ color: "rgba(143,151,163,1)", fontSize: "12px" }}
                  >
                    {" "}
                    0x4c2b769913DaBa0Fe66901E79190125E0193fb02
                  </span>
                </Typography>
              </Box>
              <Box component="div" className="cardDataRow">
                <Typography
                  align="left"
                  variant="subtitle2"
                  sx={{ width: "382px" }}
                >
                  Last Bid Amount:{" "}
                  <span
                    style={{ color: "rgba(143,151,163,1)", fontSize: "12px" }}
                  >
                    {" "}
                    0.0056 EDG
                  </span>
                </Typography>
              </Box>
              <Box component="div" className="cardDataRow">
                <Typography
                  align="left"
                  variant="subtitle2"
                  sx={{ width: "352px" }}
                >
                  Current color:{" "}
                  <span
                    style={{ color: "rgba(143,151,163,1)", fontSize: "12px" }}
                  >
                    {" "}
                    rgb(100, 200, 100){" "}
                  </span>
                </Typography>
                <Typography sx={{ width: "30px" }}>
                  <SquareIcon sx={{ color: "rgb(100, 200, 100)" }} />
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid
            item
            md={12}
            lg={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              className="gridContainerCard"
              sx={{
                borderRadius: "15px",
                width: "464px",
                height: "fit-content",
                paddingTop: "10px",
              }}
            >
              <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="h5"
                  sx={{
                    width: "384px",
                    color: "rgba(31, 38, 59, 1)",
                    marginBottom: "8px",
                  }}
                  align="left"
                  fontWeight="500"
                >
                  Choose and Bid
                </Typography>
                <Divider sx={{ width: "384px", marginBottom: "10px" }} />
                <FormControl sx={{ m: 1, width: "400px" }}>
                  <InputLabel htmlFor="bidding-price">Bid Amount</InputLabel>
                  <OutlinedInput
                    id="bidding-price"
                    startAdornment={
                      <InputAdornment position="start">EDG</InputAdornment>
                    }
                    label="Bid Amount"
                  />
                </FormControl>
                <Typography
                  variant="caption"
                  sx={{ width: "384px", paddingLeft: "5px" }}
                  align="left"
                >
                  {"* Bid 50.06EDG for Cell in Row 13 and Column 24"}
                </Typography>
                <Button variant="contained" sx={{marginTop:"10px"}}>Bid</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
