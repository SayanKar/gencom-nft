import {
  Avatar,
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
export default function ChooseAccount(props) {
  const [allAccounts, setAllAccounts] = useState([]);
  useEffect(() => {
    async function tmp() {
      const allAcc = await getAllAccounts();
      setAllAccounts(allAcc);
      console.log(allAcc);
    }
    tmp();
  },[]);
  const handleSelectAccount = (acc) => {
    props.setActiveAccount(acc);
    props.handleClose();
  }
  return (
    <Dialog onClose={props.handleClose} open={props.open}>
      <DialogTitle>
        {allAccounts.length === 0
          ? "Please install Polkadot.{js} extension"
          : "Select Account"}
      </DialogTitle>
      <List sx={{padding: "0 20px 20px 20px"}}>
        {allAccounts.map((account, idx) => { return (
          <ListItem button onClick={() => handleSelectAccount(account)} key={idx} >
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
            />
          </ListItem>);
        })}
      </List>
    </Dialog>
  );
}
