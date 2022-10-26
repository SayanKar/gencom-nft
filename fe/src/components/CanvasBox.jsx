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
  IconButton,
  Tooltip,
} from "@mui/material";
import CanvasGrid from "./CanvasGrid";
import SquareIcon from "@mui/icons-material/Square";
import PaletteIcon from "@mui/icons-material/Palette";
import CircleIcon from "@mui/icons-material/Circle";
import GavelIcon from "@mui/icons-material/Gavel";
import { colors } from "../constants";
import { useState } from "react";

export default function CanvasBox(props) {
  const renderColorSelectionButtons = () => {
    let list = [];
    for (let key in colors) {
      if (colors.hasOwnProperty(key)) {
        list.push(
          <Tooltip title={`Color: ${colors[key]}`}>
            <IconButton sx={{ marginRight: "8px" }} onClick={() => setTransaction({ ...transaction, color: key})}>
              <CircleIcon
                sx={{
                  color: colors[key],
                }}
              />
            </IconButton>
          </Tooltip>
        );
      }
    }
    return list;
  };

  const [gridData, setGridData] = useState();

  const [selectedCell, setSelectedCell] = useState({
    row: 0,
    column: 0,
  });

  const [selectedCellDetails, setSelectedCellDetails] = useState({
    owner: "5Gs5gfzHkBsRt97qgmvBW2qX6M7FPXP8cJkAj7T7kNFbGVvG",
    bidPrice: "234 EDG",
    color: "5",
  });

  const [transaction, setTransaction] = useState({ color: "4", bid: 50.67 });

  return (
    <Box component="div" id="canvasBoxWrapperContainer">
      <Box component="div" id="canvasBoxWrapper">
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid
            item
            md={12}
            lg={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card className="gridContainerCard" sx={{ borderRadius: "15px" }}>
              <CanvasGrid
                rows={32}
                columns={32}
                setSelectedCell={(x, y) =>
                  setSelectedCell({
                    row: x,
                    column: y,
                  })
                }
              />
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
                  Row:{" "}
                  <span style={{ color: "rgba(143,151,163,1)" }}>
                    {selectedCell.row + 1}
                  </span>
                </Typography>
                <Typography
                  align="right"
                  variant="subtitle2"
                  sx={{ width: "192px" }}
                >
                  Column:{" "}
                  <span style={{ color: "rgba(143,151,163,1)" }}>
                    {selectedCell.column + 1}
                  </span>
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
                    style={{ color: "rgba(143,151,163,1)", fontSize: "11px" }}
                  >
                    {selectedCellDetails.owner}{" "}
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
                    {selectedCellDetails.bidPrice}
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
                    {colors[selectedCellDetails.color]}
                  </span>
                </Typography>
                <Typography sx={{ width: "30px" }}>
                  <SquareIcon
                    sx={{ color: colors[selectedCellDetails.color] }}
                  />
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
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "384px",
                }}
              >
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
                <Typography
                  variant="body1"
                  sx={{
                    width: "384px",
                    color: "rgba(31, 38, 59, 1)",
                    fontWeight: "500",
                    display: "flex",
                    margin: "10px 0px 20px 0px",
                  }}
                  align="left"
                >
                  Choose Color
                  <PaletteIcon sx={{ margin: "0px 0px 0px 4px" }} />
                </Typography>
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginBottom: "15px",
                  }}
                >
                  {renderColorSelectionButtons()}
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    width: "384px",
                    color: "rgba(31, 38, 59, 1)",
                    fontWeight: "500",
                    display: "flex",
                    margin: "10px 0px 20px 0px",
                  }}
                  align="left"
                >
                  Choose Bid Amount
                  <GavelIcon sx={{ margin: "0px 0px 0px 8px" }} />
                </Typography>
                <FormControl sx={{ m: 1, width: "400px" }}>
                  <InputLabel htmlFor="bidding-price">Bid Amount</InputLabel>
                  <OutlinedInput
                    id="bidding-price"
                    startAdornment={
                      <InputAdornment position="start">EDG</InputAdornment>
                    }
                    label="Bid Amount"
                    value={transaction.bid}
                    onChange={(e) =>
                      setTransaction({ ...transaction, bid: e.target.value })
                    }
                  />
                </FormControl>
                <Typography
                  variant="caption"
                  sx={{ width: "384px", paddingLeft: "5px" }}
                  align="left"
                >
                  {transaction.bid && transaction.color && selectedCell.row ? (
                    <>
                      * Bid {transaction.bid} for Cell in Row {selectedCell.row} and Column {selectedCell.column} with color 
                      <CircleIcon
                        sx={{
                          color: colors[transaction.color],
                          fontSize: "13px",
                          marginBottom: "-2px",
                          marginLeft: "5px"
                        }}
                      />
                    </>
                  ) : (
                    "* Select a color and bid price"
                  )}
                </Typography>
                <Button variant="contained" sx={{ marginTop: "10px" }}>
                  Bid
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
