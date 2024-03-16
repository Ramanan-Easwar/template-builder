import { useContext } from "react";
import { BuilderLayoutContext } from "../BuilderLayout";

const TextComponent = ({id, icon, value, fromDropZone}) => {

    const {objectInContext, updateContext } = useContext(BuilderLayoutContext);

    const startDrag = (event) => {
        const objectToDrag = event.target.getAttribute("val");
        updateContext(objectToDrag);
    }

    const dropEndsHere = (event) => {
        console.log("context on end is:" + objectInContext);
        updateContext(null);
    }
        

    return (
        <div val={value} 
        selectable={String(!fromDropZone)} 
        draggable 
        onDragStart = {(event) => startDrag(event)} onDragEnd = {(event) => dropEndsHere(event)} 
        className="text-val">
            {icon}
            {value}
        </div>
    );
}

export default TextComponent;