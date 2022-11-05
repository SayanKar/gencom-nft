import { useEffect, useState } from "react";
import CardList from "./CardList";

export default function AllCanvas(props) {
  const [highestRoomId, setHighestRoomId] = useState(null);
  const [allRoomList, setAllRoomList] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getRoomList = async () => {
      if (props.contract && props.activeAccount) {
        console.log("Fetching Room list");
        await props.contract.query
          .getGameDetails(props.activeAccount.address, {
            value: 0,
            gasLimit: -1,
          })
          .then((res) => {
            if (!res.output.toHuman().Err) {
              console.log("Successfully fetched room list!!");
              console.log(res.output.toHuman()); // remove later
              setHighestRoomId(parseInt(res.output.toHuman()[1]));
            } else {
              console.log("Error fetching room ", res.output.toHuman().Err);
            }
          })
          .catch((err) => {
            console.log("Error while fetching room list: ", err);
          });
      }
    };
    getRoomList();
  }, [props.contract, props.activeAccount]);

  useEffect(() => {
    let temp = [];
    for (let i = highestRoomId - 1; i >= 0; i--) {
      if (i >= 0) {
        temp.push(i);
      } else {
        break;
      }
    }
    setAllRoomList(temp);
    console.log("All room ids: "); // To be removed later
    console.log(temp); //to be removed later
  }, [highestRoomId]);

  return (
    <CardList
      isMain={false}
      title={"All Canvas"}
      ids={allRoomList}
      contract={props.contract}
      activeAccount={props.activeAccount}
    />
  );
}
