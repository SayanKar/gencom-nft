import "../App.css";
import React from "react";
import { useState, useEffect } from "react";
import {colors} from "../constants";
// const getColor = () => {
//   return colors[Math.floor(Math.random() * 16)];
// };

export default function CanvasGrid(props) {
  const [cellColor, setCellColor] = useState(new Array(32).fill(0).map(() => new Array(32).fill(colors["0"])));
  useEffect(() => {
    const getGridColors = async () => {
      if (props.contract && props.activeAccount) {
        console.log("Fetching grid color data...");
        await props.contract.query.getColoredGrid(
          props.activeAccount.address, {
          value: 0,
          gasLimit: -1,
        },
        props.id
        )
        .then((res) => {
          if (!res.result.toHuman().Err) {
            console.log("Successfully fetched grid color data");
            let temp = new Array(32).fill(0).map(() => new Array(32).fill(0));
            for (let i = 0; i < 32; i++) {
              for (let j = 0; j < 32; j++) {
                temp[i][j] = "#" + parseInt(res.output.toHuman().Ok[i][j].replace(/,/g,"")).toString(16).padStart(6, "0");
              }
            }
            setCellColor(temp);
          } else {
            console.log("Error while fetching grid color data: ", res.result.toHuman().Err);
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

  // const getUserNfts = async () => {
  //     if (props.contract && props.activeAccount) {
  //       console.log("Fetching  owner ...");
  //       await props.contract.query.getColoredGrid(
  //         props.activeAccount.address, {
  //         value: 0,
  //         gasLimit: -1,
  //       },
  //       props.id
  //       )
  //       .then((res) => {})
  //       .catch((err) => {
  //         console.log("Error while fetching owner grid", err);
  //       });
  //     }
  //   };
  //     }
  // }

  const renderGridRows = () => {
    return cellColor.map((row, idx) => {
      return (
        <tr key={idx} id={"row-" + idx}>
          <GridCell
            row={idx}
            {...props}
            color={row}
          />
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

function GridCell(props) {
  return props.color.map((color, idx) => (
    <td id={"row-" + props.row + "-col-" + idx} key={idx} className="tableCell">
      <div
        className="cellBox"
        tabIndex={0}
        style={{ background: color ? color : colors["0"] }}
        onClick={() => props.setSelectedCell(props.row, idx)}
      ></div>
    </td>
  ));
}
