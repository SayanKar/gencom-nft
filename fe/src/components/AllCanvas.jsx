import { useEffect } from "react";
import CardList from "./CardList";

export default function AllCanvas(props) {
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);
    return (
        <CardList isMain={false} title={"All Canvas"} ids={[1,2,3,4,5,5,6,7,8]} redirectTo={"/canvas/"}/>
    );
}