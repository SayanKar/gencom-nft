import { colors } from "../constants";
export default function GridSVG(props) {
  const renderCells = () => {
    let list = [];
    console.log("CLor", props.colors)
    for (let i = 0; i < 32; i++) {
      for (let j = 0; j < 32; j++) {
        list.push(
          <rect x={i * 10} y={j * 10} width="10" height="10" fill={props.colors[i][j]} />
        );
      }
    }
    return list;
  };
  return <svg width="320" height="320">{renderCells()}</svg>;
}
