import "../App.css";
import React from "react";
import { useState, useEffect } from "react";
import { colors } from "../constants";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function CanvasGrid(props) {
  const [cellColor, setCellColor] = useState(
    new Array(32).fill(0).map(() => new Array(32).fill(colors["0"]))
  );
  useEffect(() => {
    const getGridColors = async () => {
      if (props.contract && props.activeAccount) {
        console.log("Fetching grid color data...");
        await props.contract.query
          .getColoredGrid(
            props.activeAccount.address,
            {
              value: 0,
              gasLimit: -1,
            },
            props.id
          )
          .then((res) => {
            if (!res.result.toHuman().Err) {
              console.log("Successfully fetched grid color data");
              setCellColor(
                res.output
                  .toHuman()
                  .Ok.map((row) =>
                    row.map(
                      (color) =>
                        "#" +
                        parseInt(color.replace(/,/g, ""))
                          .toString(16)
                          .padStart(6, "0")
                    )
                  )
              );
            } else {
              console.log(
                "Error while fetching grid color data: ",
                res.result.toHuman().Err
              );
            }
          })
          .catch((err) => {
            console.log("Error while fetching grid color data:", err);
          });
      }
    };
    getGridColors();
    const updateColors = setInterval(() => getGridColors(), 20000);
    return () => clearInterval(updateColors);
  }, [props.contract, props.activeAccount]);

  const renderGridRows = () => {
    return cellColor.map((row, idx) => {
      return (
        <tr key={idx} id={"row-" + idx}>
          <GridCell row={idx} {...props} color={row} />
        </tr>
      );
    });
  };
  return (
    <div className="canvasGridContainer">
      <table className="table">
        <tbody className="tableBody">{renderGridRows()}</tbody>
      </table>
    </div>
  );
}
const createTokenId = (canvasId, row, column) => {
  return (
    canvasId +
    row.toString().padStart(3, "0") +
    column.toString().padStart(3, "0")
  );
};
function GridCell(props) {
  return props.color.map((color, idx) => (
    <td id={"row-" + props.row + "-col-" + idx} key={idx} className="tableCell">
      <div
        className="cellBox"
        tabIndex={0}
        style={{
          background: color ? color : colors["0"],
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => props.setSelectedCell(props.row, idx)}
      >
        {props.ownedCells[
          parseInt(createTokenId(props.id, props.row, idx))
        ] && (
          <CheckCircleIcon
            sx={{
              fontSize: "10px",
              color:
                color && (color === colors["0"] || color === colors["1"])
                  ? "black"
                  : "white",
            }}
          />
        )}
      </div>
    </td>
  ));
}
