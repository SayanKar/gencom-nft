import "../App.css";
import React from "react";
import { useState } from "react";

const getColor = () => {
  return Math.floor(Math.random() * 256);
};

export default function CanvasGrid(props) {
  const makeColor = () => {
    let color = Array.from({ length: props.rows }, () =>
      Array.from({ length: props.columns }, () => [getColor(), getColor(), getColor()])
    );
    return color;
  };

  const [cellColor, setCellColor] = useState(makeColor());

  const setColor = (x, y, color) => {
    let tmpColor = cellColor;
    tmpColor[x][y] = color;
    setCellColor(tmpColor);
  };

  const renderGridRows = () => {
    let rows = Array.from({ length: props.rows }, (_, i) => i);
    return rows.map((row) => {
      return (
        <tr key={row} id={"row-" + row}>
          <GridCell
            row={row}
            {...props}
            setColor={(x, y, color) => setColor(x, y, color)}
            color={cellColor}
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
  const createColor = (color) => {
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  };
  let columns = Array.from({ length: props.columns }, (_, i) => i);
  return columns.map((_, col) => (
    <td id={"row-" + props.row + "-col-" + col} key={col} className="tableCell">
      <div
        className="cellBox"
        tabIndex={0}
        style={{ background: createColor(props.color[props.row][col]) }}
      ></div>
    </td>
  ));
}
