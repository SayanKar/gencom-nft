import { colors } from "../constants";
export default function GridSVG(props) {
  const renderCells = () => {
    let list = [];
    for (let i = 0; i < 32; i++) {
      for (let j = 0; j < 32; j++) {
        list.push(
          <rect
            x={i * (props.width ? props.width : 10)}
            y={j * (props.height ? props.height : "10")}
            width={props.width ? props.width : "10"}
            height={props.height ? props.height : "10"}
            fill={props.singleColor? props.singleColor: props.colors[i][j]}
            key={i + " " + j}
          />
        );
      }
    }
    return list;
  };
  return (
    <svg width={props.width ? props.width*32 : "320"} height={props.height ? props.height*32 : "320"}>
      {renderCells()}
    </svg>
  );
}
