import { useContext } from "react";
import { BuilderLayoutContext } from "../BuilderLayout";
import { useState } from "react";




let currName = null;

const EditorText = ({schema, objectType, identifier, updateSchemaCallback}) => {


    console.log("loading the text bruh: " + JSON.stringify(schema));
    const [selectedFile, setSelectedFile] = useState('image');
    const [userInput, setUserInput] = useState(schema.meta_data.value);
    const [currentContext, setCurrentContext] = useState(schema.id);

    const [position, setPosition] = useState({ x: schema.meta_data.position_text.x, y: schema.meta_data.position_text.y });
    const [positionDrop, setPositionDrop] = useState({ x: schema.meta_data.position_container.x, y: schema.meta_data.position_container.y });
    const [size, setSize] = useState({ width: schema.meta_data.size.width, height: schema.meta_data.size.height });
    const [isDragging, setIsDragging] = useState(false);
  
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setPosition({ x: e.clientX, y: e.clientY });
    };
  
    const handleMouseMove = (e) => {
        if (isDragging) {
            const deltaX = e.clientX - position.x;
            const deltaY = e.clientY - position.y;
    
          setSize((prevSize) => ({
            width: prevSize.width + deltaX,
            height: prevSize.height + deltaY,
          }));
    
          setPosition({ x: e.clientX, y: e.clientY });
        }
      };
    
  
    const handleMouseUp = (e, id) => {
        setIsDragging(false);
        updateSchemaCallback(id, formSchemaObject())
    };

    const handlePrompt = (event, id) => {
      const userInput = window.prompt('Enter something:');
      if (userInput !== null) {
        setUserInput(userInput);
        currName = userInput;
        updateSchemaCallback(id, formSchemaObject());
        } 
    };

    const handleAddFile = (e, id) => {
        const userInputImage = window.prompt('Enter image url:')
        setSelectedFile(userInputImage);
        updateSchemaCallback(id, formSchemaObject());
      };

    const handleDrop = (e, id) => {
        if(e.clientX > 350) {
            setPositionDrop({ x: e.clientX, y: e.clientY }); 
            updateSchemaCallback(id, formSchemaObject());
        }
        else {
            console.log("exceeding the limit");
        }
        console.log("object from the laypout is:" + objectType);
    };


    const formSchemaObject = () => {
        const schemaTemp = {
            id: currentContext,
            type: objectType,
            meta_data: {
                value: currName,
                size: size,
                position_text: {
                    x: position.x,
                    y: position.y
                },
                position_container: {
                    x: positionDrop.x,
                    y: positionDrop.y
                } 
            }
        }
        return schemaTemp;
    };
        

    const textDiv = (<div className="holder" onDoubleClick={event => handlePrompt(event, currentContext)} draggable onDragEnd={e => handleDrop(e, currentContext)} >
                        <p>{userInput}</p>
                    </div>);
    const imageDiv = (
        <div className="holder" >
        <img src={selectedFile} draggable onDragEnd={e => handleDrop(e, currentContext)} onDoubleClick={event => handleAddFile(event, currentContext)} />
    </div>);

    let toRender = null;

    switch (objectType) {
        case 'Text':
            toRender = textDiv;
            break;
        case 'Image':
            toRender = imageDiv;
            break;
        default:
            toRender = "None";
    }

    return (
        <div val="in-builder" className="resizable-div" style={{ width: `${size.width}px`, height: `${size.height}px`, position: `absolute`, 
                left: `${positionDrop.x}px`, top: `${positionDrop.y}px` }}>
                {toRender}
            <div className="resize-handle" onMouseDown={e => handleMouseDown(e)} onMouseMove={e => handleMouseMove(e)} onMouseUp={(e) => handleMouseUp(e, currentContext)}>
            </div> 
        </div>
    );
}

export default EditorText;