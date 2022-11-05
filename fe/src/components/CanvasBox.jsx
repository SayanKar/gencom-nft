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
  Switch,
  FormControlLabel,
} from "@mui/material";
import CanvasGrid from "./CanvasGrid";
import SquareIcon from "@mui/icons-material/Square";
import PaletteIcon from "@mui/icons-material/Palette";
import CircleIcon from "@mui/icons-material/Circle";
import GavelIcon from "@mui/icons-material/Gavel";
import { colors, PRECISION, SYMBOL, enumColors } from "../constants";
import { useState } from "react";
import { useEffect } from "react";
import { Keyring } from "@polkadot/api";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";

const keyring = new Keyring({ type: "sr25519" });
const BN = require("bn.js");
export default function CanvasBox(props) {
  const renderColorSelectionButtons = () => {
    let list = [];
    for (let key in colors) {
      if (colors.hasOwnProperty(key)) {
        list.push(
          <Tooltip title={`Color: ${colors[key]}`} key={key}>
            <IconButton
              sx={{
                marginRight: "6px",
                border: transaction.color === key ? "1px solid #afafb3" : "1px solid white",
              }}
              onClick={() => setTransaction({ ...transaction, color: key })}
            >
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
  const [posting, setPosting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedCell, setSelectedCell] = useState({
    row: 0,
    column: 0,
  });
  const [clicked, setClicked] = useState(false);
  const [transaction, setTransaction] = useState({ color: "0", bid: 0 });
  const [selectedCellDetails, setSelectedCellDetails] = useState({
    owner: "----------------------------------------------------",
    bidPrice: "0 ",
    color: "0",
  });
  const [now] = useState(dayjs().unix() * 1000);
  const [showOwnedCell, setShowOwnedCell] = useState(false);

  function changeAddressEncoding(address, toNetworkPrefix = 42) {
    if (!address) {
      return null;
    }
    const pubKey = keyring.decodeAddress(address);
    const encodedAddress = keyring.encodeAddress(pubKey, toNetworkPrefix);
    return encodedAddress;
  }

  const createTokenId = (canvasId, row, column) => {
    return (
      canvasId +
      row.toString().padStart(3, "0") +
      column.toString().padStart(3, "0")
    );
  };

  const getCellDetails = async () => {
    if (props.activeAccount && props.contract && props.id) {
      console.log("Fetching cell details");
      await props.contract.query
        .getCellDetails(
          props.activeAccount.address,
          {
            value: 0,
            gasLimit: -1,
          },
          createTokenId(props.id, selectedCell.row, selectedCell.column)
        )
        .then((res) => {
          if (!res.output.toHuman().Err) {
            res = res.output?.toHuman().Ok;
            console.log(res);
            setSelectedCellDetails({
              ...selectedCellDetails,
              owner: changeAddressEncoding(res.owner),
              bidPrice:
                new BN(res.value.replace(/,/g, ""))
                  .div(new BN(PRECISION))
                  .toNumber() / 1000_000,
              color:
                "#" +
                parseInt(res.color.replace(/,/g, ""))
                  .toString(16)
                  .padStart(6, "0"),
            });
          } else if (res.output?.toHuman()?.Err === "TokenNotFound") {
            setSelectedCellDetails({
              ...selectedCellDetails,
              owner: "Be the first one to bid",
              bidPrice: props.basePrice,
              color: colors["0"],
            });
          } else {
            console.log("Error on get cell details", res.output.toHuman().Err);
          }
        })
        .catch((err) => {
          console.log("Error calling cell details", err);
        });
    }
  };

  const onBid = () => {
    if (selectedCellDetails.owner === props.activeAccount.address) {
      changeCellColor();
    } else {
      captureCell();
    }
  };

  const changeCellColor = async () => {
    if (props.contract && props.activeAccount) {
      if (!clicked) {
        enqueueSnackbar("Select a cell first");
      }
      setPosting(true);
      try {
        await props.contract.query
          .changeCellColor(
            props.activeAccount.address,
            {
              value: 0,
              gasLimit: -1,
            },
            props.id,
            selectedCell.row,
            selectedCell.column,
            enumColors[transaction.color].name
          )
          .then((res) => {
            if (res.result?.toHuman()?.Err?.Module?.error)
              throw new Error(res.result.toHuman().Err.Module.error);
            else return res.output.toHuman();
          })
          .then(async (res) => {
            if (!res.Err) {
              await props.contract.tx
                .changeCellColor(
                  {
                    value: 0,
                    gasLimit: 300000n * 1000000n,
                  },
                  props.id,
                  selectedCell.row,
                  selectedCell.column,
                  enumColors[transaction.color].name
                )
                .signAndSend(
                  props.activeAccount.address,
                  { signer: props.signer },
                  async (res) => {
                    if (res.status.isFinalized) {
                      enqueueSnackbar(
                        "Transaction Finalized, Cell color changed successfully",
                        {
                          variant: "Success",
                        }
                      );
                    }
                  }
                );
              setClicked(false);
              setSelectedCellDetails({
                owner: "----------------------------------------------------",
                bidPrice: "0",
                color: "0",
              });
              setTransaction({ color: "0", bid: 0 });
              enqueueSnackbar("Transaction Submitted", {
                variant: "Success",
              });
            } else {
              console.log("Failed on cell color change ->", res.Err);
              enqueueSnackbar("Failed to cellcolor change -> \n " + res.Err, {
                variant: "error",
              });
            }
          })
          .catch((err) => {
            console.log("Error changing cell color", err);
            enqueueSnackbar("Error changing cell color" + err, {
              variant: "error",
            });
          });
      } catch (err) {
        console.log("Error while chaning cell color", err);
        enqueueSnackbar("Error while changing cell color" + err, {
          variant: "error",
        });
      }
      setPosting(false);
    } else {
      console.log("Connect your wallet");
      enqueueSnackbar("Connect your wallet", { variant: "error" });
    }
  };

  const captureCell = async () => {
    if (props.contract && props.activeAccount) {
      if (!clicked) {
        enqueueSnackbar("Select a cell first");
      }
      if (
        transaction.bid <
        (selectedCellDetails.bidPrice * (100 + parseInt(props.premium))) / 100
      ) {
        enqueueSnackbar(
          "Must pay atleast " + props.premium + "% more of last bid price"
        );
      }
      setPosting(true);
      try {
        await props.contract.query
          .captureCell(
            props.activeAccount.address,
            {
              value: new BN(transaction.bid * 1000_000_000_000).mul(
                new BN(1000_000)
              ),
              gasLimit: -1,
            },
            createTokenId(props.id, selectedCell.row, selectedCell.column),
            enumColors[transaction.color].name
          )
          .then((res) => {
            console.log(res.result.toHuman());
            if (res.result?.toHuman()?.Err?.Module?.error)
              throw new Error(
                res.result.toHuman().Err.Module.error === "0x04000000"
                  ? "TransferFailed"
                  : res.result.toHuman().Err.Module.error
              );
            else return res.output.toHuman();
          })
          .then(async (res) => {
            if (!res.Err) {
              await props.contract.tx
                .captureCell(
                  {
                    value: new BN(transaction.bid * 1000_000_000_000).mul(
                      new BN(1000_000)
                    ),
                    gasLimit: 300000n * 1000000n,
                  },
                  createTokenId(
                    props.id,
                    selectedCell.row,
                    selectedCell.column
                  ),
                  enumColors[transaction.color].name
                )
                .signAndSend(
                  props.activeAccount.address,
                  { signer: props.signer },
                  async (res) => {
                    if (res.status.isFinalized) {
                      enqueueSnackbar(
                        "Transaction Finalized, Cell captured successfully",
                        {
                          variant: "Success",
                        }
                      );
                    }
                  }
                );
              setClicked(false);
              setTransaction({ color: "0", bid: 0 });
              enqueueSnackbar("Transaction Submitted", {
                variant: "Success",
              });
              setSelectedCellDetails({
                owner: "----------------------------------------------------",
                bidPrice: "0",
                color: "0",
              });
            } else {
              console.log("Failed on capture cell ->", res.Err);
              enqueueSnackbar("Failed to capture cell -> \n " + res.Err, {
                variant: "error",
              });
            }
          })
          .catch((err) => {
            console.log("Error capturing cell ", err);
            enqueueSnackbar("Error capturing cell " + err, {
              variant: "error",
            });
          });
      } catch (err) {
        console.log("Error while capturing cell", err);
        enqueueSnackbar("Error while capturing cell" + err, {
          variant: "error",
        });
      }
      setPosting(false);
    } else {
      console.log("Connect your wallet");
      enqueueSnackbar("Connect your wallet", { variant: "error" });
    }
  };

  useEffect(() => {
    getCellDetails();
  }, [selectedCell]);

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
                setSelectedCell={(x, y) => {
                  setClicked(true);
                  setSelectedCell({
                    row: x,
                    column: y,
                  });
                }}
                activeAccount={props.activeAccount}
                contract={props.contract}
                id={props.id}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: "30px 0px 5px 0px",
                }}
              >
                <Typography
                  variant="h6"
                  align="left"
                  id="selectionDetails"
                  sx={{
                    width: "264px",
                    color: "rgba(31, 38, 59, 1)",
                    fontWeight: "500",
                  }}
                >
                  Selection Details
                </Typography>
                <FormControlLabel
                  control={<Switch />}
                  label="Your Cells"
                  sx={{ color: "rgba(0, 0, 0, 0.6)", fontSize: "6px" }}
                  labelPlacement="end"
                  checked={showOwnedCell}
                  onChange={(e) => setShowOwnedCell(e.target.checked)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Box>
              <Divider sx={{ width: "384px", marginBottom: "10px" }} />
              <Box component="div" className="cardDataRow">
                <Typography
                  align="left"
                  variant="subtitle2"
                  sx={{ width: "192px" }}
                >
                  Row:{" "}
                  <span style={{ color: "rgba(143,151,163,1)" }}>
                    {clicked ? selectedCell.row + 1 : "Select a cell"}
                  </span>
                </Typography>
                <Typography
                  align="right"
                  variant="subtitle2"
                  sx={{ width: "192px" }}
                >
                  Column:{" "}
                  <span style={{ color: "rgba(143,151,163,1)" }}>
                    {clicked ? selectedCell.column + 1 : "Select a cell"}
                  </span>
                </Typography>
              </Box>
              {/* <Box component="div" className="cardDataRow">
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
                    {clicked
                      ? selectedCellDetails.bidPrice + " " + SYMBOL
                      : "Select a cell"}
                  </span>
                </Typography>
              </Box> */}
              {/* <Box component="div" className="cardDataRow">
                <Typography
                  align="left"
                  variant="subtitle2"
                  sx={{ width: "352px" }}
                >
                  Current color:{" "}
                  <span
                    style={{ color: "rgba(143,151,163,1)", fontSize: "12px" }}
                  >
                    {clicked ? selectedCellDetails.color : "Select a cell"}
                  </span>
                </Typography>
                <Typography sx={{ width: "30px" }}>
                  <SquareIcon
                    sx={{
                      color: clicked ? selectedCellDetails.color : "white",
                    }}
                  />
                </Typography>
              </Box> */}
              <Box
                component="div"
                className="cardDataRow"
                style={{ marginTop: "10px" }}
              >
                <Typography
                  align="left"
                  variant="subtitle2"
                  sx={{ width: "382px" }}
                >
                  Owner:{" "}
                  <span
                    style={{ color: "rgba(143,151,163,1)", fontSize: "11px" }}
                  >
                    {props.start > now 
                      ? "Canvas opening soon"
                      : clicked
                      ? selectedCellDetails.owner
                      : "Select a cell"}{" "}
                  </span>
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
                {selectedCellDetails.owner === props.activeAccount.address && (
                  <Typography
                    variant="caption"
                    sx={{
                      width: "384px",
                      color: "rgba(31, 38, 59, 1)",
                      marginBottom: "8px",
                    }}
                    align="left"
                    fontWeight="500"
                  >
                    * You are the cell owner *
                  </Typography>
                )}
                <Typography
                  variant="body1"
                  sx={{
                    width: "384px",
                    color: "rgba(31, 38, 59, 1)",
                    fontWeight: "500",
                    display: "flex",
                    margin: "10px 0px 10px 0px",
                  }}
                  align="left"
                >
                  Choose Color
                  <PaletteIcon sx={{ margin: "0px 0px 0px 4px" }} />
                </Typography>
                <Box component="div" style={{ display: "flex" }}>
                  <Typography
                    align="left"
                    variant="caption"
                    // sx={{ width: "352px" }}
                  >
                    Current cell color:{" "}
                    <span
                      style={{ color: "rgba(143,151,163,1)", fontSize: "12px" }}
                    >
                      {clicked ? selectedCellDetails.color : "Select a cell"}
                    </span>
                  </Typography>
                  <Typography sx={{ width: "20px" }}>
                    <SquareIcon
                      sx={{
                        color: clicked ? selectedCellDetails.color : "white",
                        fontSize: "16px",
                      }}
                    />
                  </Typography>
                </Box>
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
                    margin: "10px 0px 10px 0px",
                  }}
                  align="left"
                >
                  Choose Bid Amount
                  <GavelIcon sx={{ margin: "0px 0px 0px 8px" }} />
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    sx={{ width: "50%", marginBottom: "10px" }}
                    align="left"
                    variant="caption"
                  >
                    Last bid price:{" "}
                    <span
                      style={{ color: "rgba(143,151,163,1)", fontSize: "12px" }}
                    >
                      {clicked
                        ? selectedCellDetails.bidPrice + " " + SYMBOL
                        : "Select a cell"}
                    </span>
                  </Typography>
                  <Typography
                    sx={{ width: "50%", marginBottom: "10px" }}
                    align="right"
                    variant="caption"
                  >
                    Premium:{" "}
                    <span
                      style={{ color: "rgba(143,151,163,1)", fontSize: "12px" }}
                    >
                      {props.premium + " %"}
                    </span>
                  </Typography>
                </Box>
                <FormControl
                  sx={{ m: 1, width: "400px" }}
                  disabled={
                    selectedCellDetails.owner === props.activeAccount.address ||
                    props.start > now ||
                    props.end < now
                  }
                >
                  <InputLabel htmlFor="bidding-price">Bid Amount</InputLabel>
                  <OutlinedInput
                    id="bidding-price"
                    startAdornment={
                      <InputAdornment position="start">{SYMBOL}</InputAdornment>
                    }
                    label="Bid Amount"
                    value={transaction.bid}
                    onChange={(e) => {
                      if (e.target.value < 0) return;
                      setTransaction({ ...transaction, bid: e.target.value });
                    }}
                    type="number"
                    inputProps={{ inputProps: { min: 0 } }}
                  />
                </FormControl>
                <Typography
                  variant="caption"
                  sx={{ width: "384px", paddingLeft: "5px" }}
                  align="left"
                >
                  {transaction.bid && transaction.color ? (
                    <>
                      * Bid {transaction.bid + " " + SYMBOL} for Cell in Row{" "}
                      {selectedCell.row + 1} and Column{" "}
                      {selectedCell.column + 1} with color
                      <CircleIcon
                        sx={{
                          color: colors[transaction.color],
                          fontSize: "13px",
                          marginBottom: "-2px",
                          marginLeft: "5px",
                        }}
                      />
                    </>
                  ) : selectedCellDetails.owner ===
                    props.activeAccount.address ? (
                    transaction.color ? (
                      <>
                        * Change Cell color in Row {selectedCell.row + 1} and
                        Column {selectedCell.column + 1} with to
                        <CircleIcon
                          sx={{
                            color: colors[transaction.color],
                            fontSize: "13px",
                            marginBottom: "-2px",
                            marginLeft: "5px",
                          }}
                        />
                      </>
                    ) : (
                      "* Select a color to update cell"
                    )
                  ) : (
                    "* Select a color and bid price"
                  )}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ marginTop: "10px" }}
                  onClick={() => onBid()}
                  disabled={props.start > now || props.end < now}
                >
                  {selectedCellDetails.owner === props.activeAccount.address
                    ? !posting
                      ? "Change Color"
                      : "Changing"
                    : !posting
                    ? "Bid"
                    : "Bidding"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
