import {
  Avatar,
  Box,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import Identicon from "@polkadot/react-identicon";
import { useEffect, useState } from "react";
import { getAllAccounts } from "../Integration";
import polkadotjs from "../assets/polkadotjs.svg";
export default function ChooseAccount(props) {
  const [allAccounts, setAllAccounts] = useState([]);
  useEffect(() => {
    async function tmp() {
      const allAcc = await getAllAccounts();
      setAllAccounts(allAcc);
    }
    tmp();
  }, [props.open]);
  const handleSelectAccount = (acc) => {
    props.setActiveAccount(acc);
    props.handleClose();
  };
  return (
    <Dialog onClose={props.handleClose} open={props.open}>
      <DialogTitle>
        {allAccounts.length === 0
          ? "Please install Polkadot.{js} extension"
          : "Select Account"}
      </DialogTitle>
      {allAccounts.length === 0 && (
        <Box
          sx={{
            width: "80%",
            height: "180px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <a href="https://polkadot.js.org/extension/">
            <img
              src={polkadotjs}
              alt={"Polkadot js extention"}
              style={{ width: "155px" }}
            />
          </a>
        </Box>
      )}
      <List sx={{ padding: "0 20px 20px 20px" }}>
        {allAccounts.map((account, idx) => {
          return (
            <ListItem
              button
              onClick={() => handleSelectAccount(account)}
              key={idx}
              sx={{ overflowX: "hidden" }}
            >
              <ListItemAvatar>
                <Avatar>
                  <Identicon
                    size={40}
                    theme={"polkadot"}
                    value={account.address}
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                secondary={account.address}
                primary={account.meta.name}
                secondaryTypographyProps={{
                  style: {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    minWidth:"200px",
                  },
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Dialog>
  );
}
