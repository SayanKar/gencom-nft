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

export default function CreateRoom(props) {
  const [startTimeValue, setStartTimeValue] = useState(dayjs("2022-04-07"));
  const [endTimeValue, setEndTimeValue] = useState(dayjs("2022-04-08"));

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
          Create a Room
        </Typography>
        <Divider sx={{ marginBottom: "20px" }} />
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
          * Room creation fees:- 35EDG{" "}
        </Typography>
        <TextField
          helperText="* Sets a title for the room"
          id="titleInput"
          label="Room Title"
          fullWidth
          sx={{ margin: "5px 0" }}
        />
        <TextField
          helperText="* Sets a description for the room"
          id="descInput"
          label="Room Description"
          fullWidth
          sx={{ margin: "5px 0" }}
        />
        <TextField
          helperText="* Sets a minimum cell price for buyers"
          id="minPriceInput"
          label="Cell Min Price"
          fullWidth
          sx={{ margin: "5px 0" }}
        />
        <Box
          fullWidth
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
            />
          </LocalizationProvider>
        </Box>

        <Box
          fullWidth
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0",
            flexWrap: "wrap",
          }}
        >
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Is Dynamic"
            sx={{ color: "rgba(0, 0, 0, 0.6)", font: "8px" }}
            labelPlacement="end"
            fullWidth
          />
          <Button sx={{ marginTop: "5px" }} variant="contained">
            Create
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
