import {
  Box,
  Divider,
  Paper,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { PRECISION, SYMBOL } from "../constants";
import { useEffect } from "react";
import { Keyring } from '@polkadot/api';
const keyring = new Keyring({ type: 'sr25519' });
export default function CanvasForm(props) {
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
  const editRoom = async () => {};
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
              value: 0,
              gasLimit: -1,
            },
            title,
            desc,
            [32, 32],
            startTimeValue.unix(),
            endTimeValue.unix(),
            new BN(cellPrice * 1000000).mul(new BN(PRECISION)),
            premium,
            isDynamic
          )
          .then((res) => {
            if (res.result.toHuman().Err?.Module?.message)
              throw new Error(res.result.toHuman().Err.Module.message);
            else return res.output.toHuman();
          })
          .then(async (res) => {
            if (!res.Err) {
              await props.contract.tx
                .createCanvas(
                  {
                    value: 0,
                    gasLimit: 300000n * 1000000n,
                  },
                  title,
                  desc,
                  [32, 32],
                  startTimeValue.unix(),
                  endTimeValue.unix(),
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
                      enqueueSnackbar("Transaction Finalized", {
                        variant: "Success",
                      });
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
  function changeAddressEncoding(address, toNetworkPrefix=42){
    if(!address) {
        return null;
    }
    const pubKey = keyring.decodeAddress(address);
    const encodedAddress = keyring.encodeAddress(pubKey, toNetworkPrefix);
    return encodedAddress;
  }
  useEffect(() => {
    const canvasDetails = async () => {
      if (props.activeAccount && props.contract && props.isEdit) {
        console.log('Fetching Canvas Details')
        await props.contract.query.getCanvasDetails(
          props.activeAccount.address,
          {
            value: 0,
            gasLimit: -1,
          },
          canvasId
        ).then((res) => {
          if(!res.result?.toHuman()?.Err)
          { console.log("res output result",res, res.output?.toHuman(), res.result?.toHuman())
            res = res.output?.toHuman();
            if(props.activeAccount.address !== changeAddressEncoding(res.creator)) {
              setIsOwner(true);
              console.log("You are not the owner");
            } else {
              setTitle(res.title);
              setDesc(res.desc);
              setPremium(res.premium);
              setIsDynamic(res.isDynamic);
            }
          }
          else {
            console.log("Error fetching canvas Details,", res.result?.toHuman()?.Err);
          }
        }).catch((err) => {
          console.log("Error on calling canvas details", err);
        })
      }
    };
    canvasDetails();
  }, [props.activeAccount, props.contract]);

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
              setCreationFee(res.output.toHuman()[2]);
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
        <Divider sx={{ marginBottom: "20px" }} />{ isOwner &&
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
        }
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
          helperText={"* You will get this amount when painters buy a cell." + props.isEdit ? " Not Editable":""}
          id="minPriceInput"
          label="Cell base price"
          fullWidth
          type="number"
          sx={{ margin: "5px 0" }}
          InputProps={{ inputProps: { min: 0 } }}
          value={cellPrice}
          onChange={handleCellPriceChange}
          disabled={props.isEdit}
        />
        <TextField
          helperText="* Set premium percentage"
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
              minDateTime={currentTime.subtract(1, "minute")}
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
          <FormControlLabel
            control={<Switch />}
            label="Is Dynamic"
            sx={{ color: "rgba(0, 0, 0, 0.6)", font: "8px" }}
            labelPlacement="end"
            checked={isDynamic}
            onChange={(e) => setIsDynamic(e.target.checked)}
            inputProps={{ "aria-label": "controlled" }}
            disabled={isOwner}
          />
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
            <Button sx={{ marginTop: "5px" }} variant="contained" disabled={true}>
              {props.isEdit ? "Editing" : "Creating"}
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
