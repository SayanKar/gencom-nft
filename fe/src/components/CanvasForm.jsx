import {
  Box,
  Divider,
  Paper,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Tooltip,
} from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { GAS_LIMIT, PRECISION, SYMBOL } from "../constants";
import { useEffect } from "react";
import { Keyring } from "@polkadot/api";
import { useNavigate } from "react-router-dom";

const keyring = new Keyring({ type: "sr25519" });
export default function CanvasForm(props) {
  const navigate = useNavigate();
  const BN = require("bn.js");
  const [currentTime] = useState(dayjs());
  const [startTimeValue, setStartTimeValue] = useState(currentTime);
  const [endTimeValue, setEndTimeValue] = useState(currentTime.add(6, "hour"));
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cellPrice, setCellPrice] = useState(0);
  const [premium, setPremium] = useState(0);
  const [isDynamic, setIsDynamic] = useState(false);
  const [posting, setPosting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [creationFee, setCreationFee] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const { canvasId } = useParams();
  const [isInvalidId, setIsInvalidId] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handleCellPriceChange = (e) => {
    setCellPrice(e.target.value);
  };

  const handlePremiumChange = (e) => {
    if (e.target.value <= 200) {
      setPremium(parseInt(e.target.value).toString());
    }
  };

  const isInvalid = () => {
    if (title === "" || desc === "") {
      enqueueSnackbar("Title, Description cannot be empty", {
        variant: "error",
      });
      return true;
    }
    if (cellPrice < 0.000001 && cellPrice > 0) {
      enqueueSnackbar("Precision is upto 6 decimal places", {
        variant: "error",
      });
      return true;
    }
    if (cellPrice === "" || premium === "" || isNaN(premium)) {
      enqueueSnackbar("Cell base price and Premium cannot be empty", {
        variant: "error",
      });
      return true;
    }
    return false;
  };

  const resetStates = () => {
    setTitle("");
    setDesc("");
    setIsDynamic(false);
    setCellPrice(0);
    setPremium(0);
  };
  const onSubmit = () => {
    if (props.isEdit) {
      editRoom();
    } else {
      createRoom();
    }
  };

  useEffect(() => {
    props.activeAccount && props.api && (async () => {
      const { data: balance} = await props.api.query.system.account(props.activeAccount.address);
      setBalance(new BN(balance.free).div(new BN(PRECISION)).toString(10)/ 1000_000);
    })();
  }, [props.activeAccount]);
  const editRoom = async () => {
    if (props.contract && props.activeAccount && props.signer) {
      if (isInvalid()) return;
      setPosting(true);
      try {
        console.log("Creating Room");
        await props.contract.query
          .editCanvas(
            props.activeAccount.address,
            {
              value: 0,
              gasLimit: -1,
            },
            canvasId,
            title,
            desc,
            [32, 32],
            startTimeValue.unix() * 1000,
            endTimeValue.unix() * 1000,
            new BN(cellPrice * 1000000).mul(new BN(PRECISION)),
            premium,
            isDynamic
          )
          .then((res) => {
            console.log("Edit query res", res);
            if (!res.result.toHuman().Ok)
              throw new Error(res.result?.toHuman()?.Err?.Module?.error);
            else
              return res.output ? res.output.toHuman() : res.result.toHuman();
          })
          .then(async (res) => {
            if (!res.Err) {
              await props.contract.tx
                .editCanvas(
                  {
                    value: 0,
                    gasLimit: GAS_LIMIT,
                  },
                  canvasId,
                  title,
                  desc,
                  [32, 32],
                  startTimeValue.unix() * 1000,
                  endTimeValue.unix() * 1000,
                  new BN(cellPrice * 1000000).mul(new BN(PRECISION)),
                  premium,
                  isDynamic
                )
                .signAndSend(
                  props.activeAccount.address,
                  { signer: props.signer },
                  async (res) => {
                    if (res.status.isFinalized) {
                      console.log("Room Creation Finalized", res);
                      enqueueSnackbar(
                        <span
                          // href={"/canvas/" + canvasId}
                          style={{ textDecoration: "none", color: "white" }}
                          onClick={() => navigate("/canvas/" + canvasId)}
                        >
                          {" Transaction Finalized, Click to go to canvas #" +
                            canvasId}
                        </span>,
                        {
                          variant: "Success",
                        }
                      );
                    }
                  }
                );
              resetStates();
              console.log("Room Edit Tx Submitted");
              enqueueSnackbar("Transaction Submitted", {
                variant: "Success",
              });
            } else {
              console.log("Failed on Edit ->", res.Err);
              enqueueSnackbar("Failed to Edit -> \n " + res.Err, {
                variant: "error",
              });
            }
          });
      } catch (err) {
        console.log("Failed on Edit", err);
        enqueueSnackbar("Failed to Edit, \n " + err, { variant: "error" });
      }
      setPosting(false);
    } else {
      console.log("Connect your account");
      enqueueSnackbar("Connect your account", { variant: "error" });
    }
  };
  const createRoom = async () => {
    if (props.contract && props.activeAccount && props.signer) {
      if (isInvalid()) return;
      setPosting(true);
      try {
        console.log("Creating Room");
        await props.contract.query
          .createCanvas(
            props.activeAccount.address,
            {
              value: new BN(creationFee * 1000000).mul(new BN(PRECISION)),
              gasLimit: -1,
            },
            title,
            desc,
            [32, 32],
            startTimeValue.unix() * 1000,
            endTimeValue.unix() * 1000,
            new BN(cellPrice * 1000000).mul(new BN(PRECISION)),
            premium,
            isDynamic
          )
          .then((res) => {
            if (res.result?.toHuman()?.Err?.Module?.error) {
              throw new Error(
                res.result.toHuman().Err.Module.error === "0x04000000"
                  ? "TransferFailed"
                  : res.result.toHuman().Err.Module.error
              );
            } else return res.output.toHuman();
          })
          .then(async (res) => {
            if (!res.Err) {
              await props.contract.tx
                .createCanvas(
                  {
                    value: new BN(creationFee * 1000000).mul(new BN(PRECISION)),
                    gasLimit: GAS_LIMIT,
                  },
                  title,
                  desc,
                  [32, 32],
                  startTimeValue.unix() * 1000,
                  endTimeValue.unix() * 1000,
                  new BN(cellPrice * 1000000).mul(new BN(PRECISION)),
                  premium,
                  isDynamic
                )
                .signAndSend(
                  props.activeAccount.address,
                  { signer: props.signer },
                  async (res) => {
                    if (res.status.isFinalized) {
                      enqueueSnackbar(
                        <span
                          onClick={() =>
                            navigate(
                              "/canvas/" +
                                res.contractEvents[0].args[0].toHuman()
                            )
                          }
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          {" Transaction Finalized, Click to go to canvas #" +
                            res.contractEvents[0].args[0].toHuman()}
                        </span>,
                        {
                          variant: "Success",
                        }
                      );
                    }
                  }
                );
              resetStates();
              console.log("Room Creation Tx Submitted");
              enqueueSnackbar("Transaction Submitted", {
                variant: "Success",
              });
            } else {
              console.log("Failed on Submit ->", res.Err);
              enqueueSnackbar("Failed to Submit -> \n " + res.Err, {
                variant: "error",
              });
            }
          });
      } catch (err) {
        console.log("Failed on Submit", err);
        enqueueSnackbar("Failed to Submit, \n " + err, { variant: "error" });
      }
      setPosting(false);
    } else {
      console.log("Connect your account");
      enqueueSnackbar("Connect your account", { variant: "error" });
    }
  };

  function changeAddressEncoding(address, toNetworkPrefix = 42) {
    if (!address) {
      return null;
    }
    const pubKey = keyring.decodeAddress(address);
    const encodedAddress = keyring.encodeAddress(pubKey, toNetworkPrefix);
    return encodedAddress;
  }

  useEffect(() => {
    const canvasDetails = async () => {
      if (props.activeAccount && props.contract && props.isEdit) {
        console.log("Fetching Canvas Details");
        await props.contract.query
          .getCanvasDetails(
            props.activeAccount.address,
            {
              value: 0,
              gasLimit: -1,
            },
            canvasId
          )
          .then((res) => {
            if (!res.output?.toHuman()?.Err) {
              res = res.output?.toHuman().Ok;
              if (res === null) {
                setIsInvalidId(true);
              } else if (
                props.activeAccount.address !==
                changeAddressEncoding(res.creator)
              ) {
                setIsOwner(true);
                console.log("You are not the owner");
              } else if (
                dayjs().isAfter(
                  dayjs.unix(res.startTime.replace(/,/g, "") / 1000)
                )
              ) {
                setHasStarted(true);
              } else {
                setTitle(res.title);
                setDesc(res.desc);
                setPremium(res.premium);
                setIsDynamic(res.isDynamic);
                setStartTimeValue(
                  dayjs.unix(res.startTime.replace(/,/g, "") / 1000)
                );
                setEndTimeValue(
                  dayjs.unix(res.endTime.replace(/,/g, "") / 1000)
                );
                setCellPrice(
                  new BN(res.basePrice.replace(/,/g, ""))
                    .div(new BN(1000_000_000_000))
                    .toNumber() / 1000_000
                );
                setIsOwner(false);
                setIsInvalidId(false);
                setHasStarted(false);
              }
            } else {
              console.log(
                "Error fetching canvas Details,",
                res.output?.toHuman()?.Err
              );
              if (res.output?.toHuman()?.Err === "CanvasNotFound") {
                setIsInvalidId(true);
              }
            }
          })
          .catch((err) => {
            console.log("Error on calling canvas details", err);
          });
      } else {
        setTitle("");
        setDesc("");
        setPremium(0);
        setIsDynamic(false);
        setStartTimeValue(currentTime);
        setEndTimeValue(currentTime.add(6, "hour"));
        setCellPrice(0);
        setIsInvalidId(false);
        setHasStarted(false);
        setIsOwner(false);
      }
    };
    canvasDetails();
  }, [props.activeAccount, props.contract, props.isEdit]);

  useEffect(() => {
    const getCreationFee = async () => {
      if (props.contract && props.activeAccount) {
        console.log("Fetching Creation Fee");
        await props.contract.query
          .getGameDetails(props.activeAccount.address, {
            value: 0,
            gasLimit: -1,
          })
          .then((res) => {
            if (!res.result?.toHuman()?.Err) {
              console.log("Successfully updated creation Fee");
              setCreationFee(
                new BN(res.output.toHuman()[2].replace(/,/g, ""))
                  .div(new BN(PRECISION))
                  .toNumber() / 1000_000
              );
            } else {
              console.log("Error fetching Creation Fee", res.output.toHuman());
            }
          })
          .catch((err) => {
            console.log("Error while fetching Creation Fee: ", err);
          });
      }
    };
    getCreationFee();
  }, [props.contract, props.activeAccount]);

  return (
    <Box
      sx={{
        width: "100%",
        background: "#89CFF0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {!props.activeAccount || (props.isEdit && isInvalidId) || hasStarted ? (
        <Paper
          sx={{
            width: "400px",
            height: "fit-content",
            padding: "40px",
            margin: "140px 0px",
          }}
          elevation={2}
        >
          <Typography
            sx={{ width: "100%", fontWeight: "500", color: "#333652" }}
            align="center"
            variant="h5"
          >
            {!props.activeAccount
              ? "Wallet not connected"
              : props.isEdit && isInvalidId
              ? "Invalid canvas room Id"
              : "Cannot edit canvas once started"}
          </Typography>
        </Paper>
      ) : (
        <Paper
          sx={{
            width: "400px",
            height: "fit-content",
            padding: "40px",
            margin: "140px 0px",
          }}
          elevation={10}
        >
          <Typography
            sx={{ width: "100%", fontWeight: "500", color: "#333652" }}
            align="left"
            variant="h5"
          >
            {props.isEdit ? "Edit Canvas #" + canvasId : "Create a Room"}
          </Typography>
          <Divider sx={{ marginBottom: "20px" }} />
          {isOwner && (
            <Typography
              sx={{
                width: "100%",
                fontWeight: "500",
                color: "red",
                marginBottom: "10px",
              }}
              align="left"
              variant="subtitle2"
            >
              {"You are not the creator, you don't have Edit Access"}
            </Typography>
          )}
          <Typography
            sx={{
              width: "100%",
              fontWeight: "500",
              color: "#333652",
              marginBottom: "10px",
            }}
            align="left"
            variant="subtitle2"
          >
            {"* Room creation fees:- " + creationFee + " " + SYMBOL}
          </Typography>
          <TextField
            helperText="* Sets a title for the room"
            id="titleInput"
            label="Room Title"
            fullWidth
            sx={{ margin: "5px 0" }}
            value={title}
            onChange={handleTitleChange}
            disabled={isOwner}
          />
          <TextField
            helperText="* Sets a description for the room"
            id="descInput"
            label="Room Description"
            fullWidth
            sx={{ margin: "5px 0" }}
            value={desc}
            onChange={handleDescChange}
            disabled={isOwner}
          />

          <TextField
            helperText={"* You will get this amount when a user buys a cell in " +SYMBOL+" tokens"}
            id="minPriceInput"
            label="Cell base price"
            fullWidth
            type="number"
            sx={{ margin: "5px 0" }}
            InputProps={{ inputProps: { min: 0 } }}
            value={cellPrice}
            onChange={handleCellPriceChange}
            disabled={isOwner}
          />

          <TextField
            helperText="* Minimum premium % over last cell bid pricce"
            id="premiumInput"
            label="Premium %"
            fullWidth
            type="number"
            sx={{ margin: "5px 0" }}
            InputProps={{ inputProps: { min: 5 } }}
            value={premium}
            onChange={handlePremiumChange}
            disabled={isOwner}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              margin: "10px 0",
              flexWrap: "wrap",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => (
                  <TextField {...props} sx={{ width: "48%" }} />
                )}
                label="Room Start Time"
                value={startTimeValue}
                onChange={(newValue) => {
                  setStartTimeValue(newValue);
                }}
                sx={{ margin: "20px 0px 20px 0" }}
                minDateTime={
                  props.isEdit
                    ? startTimeValue.subtract(1, "minute")
                    : currentTime.subtract(1, "minute")
                }
                disabled={isOwner}
              />
              <DateTimePicker
                renderInput={(props) => (
                  <TextField {...props} sx={{ width: "48%" }} />
                )}
                label="Room End Time"
                value={endTimeValue}
                onChange={(newValue) => {
                  setEndTimeValue(newValue);
                }}
                sx={{ margin: "20px 0px 20px 0" }}
                minDateTime={startTimeValue}
                disabled={isOwner}
              />
            </LocalizationProvider>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              margin: "10px 0",
              flexWrap: "wrap",
            }}
          >
            <Tooltip title="Cell owners can change its color even after room expires." arrow>
            <FormControlLabel
              control={<Switch />}
              label="Is dynamic ?"
              sx={{ color: "rgba(0, 0, 0, 0.6)", font: "8px" }}
              labelPlacement="end"
              checked={isDynamic}
              onChange={(e) => setIsDynamic(e.target.checked)}
              inputProps={{ "aria-label": "controlled" }}
              disabled={isOwner}
            />
            </Tooltip>
            {!posting ? (
              <Button
                sx={{ marginTop: "5px" }}
                variant="contained"
                onClick={onSubmit}
                disabled={isOwner}
              >
                {props.isEdit ? "Edit" : "Create"}
              </Button>
            ) : (
              <Button
                sx={{ marginTop: "5px" }}
                variant="contained"
                disabled={true}
              >
                {props.isEdit ? "Editing" : "Creating"}
              </Button>
            )}
          </Box>
          <Typography variant="subtitle2" style={{marginTop:"10px", width: "100%", color:"gray"}} align="right">{"Balance = " + balance + " " + SYMBOL}</Typography>
        </Paper>
      )}
    </Box>
  );
}
