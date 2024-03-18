
import { useContext } from "react";
import EditorText from "./EditorText";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BuilderLayoutContext } from "../BuilderLayout";


let schemaElements = [];
let item = null;
let tempId = -1;
const EditorLayout = () => {

    const {objectInContext, updateContext, updateSchema, schema } = useContext(BuilderLayoutContext);


        // call to load the schema on to the builder
        const load = () => {
            console.log("clicking my guy")
            fetch('http://localhost:8000/schema/all', {
                method: 'GET'
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Please check the api error');
                }
                return response.json();
              })
              .then(data => {
                console.log("data from api: " + JSON.stringify(data));
                updateSchema(data[0].schema); // loading into the schema state 
                schemaElements = data[0].schema;
              })
              .catch(error => {
                console.log("error from api: " + JSON.stringify(error));
              })
              .finally(() => {
                console.log("done");
              });
        };


    const uponDropping = (event) => {
        if(objectInContext != null) {
            item = {['type'] : objectInContext};
            tempId = (Math.floor(Math.random() * (100000000 - 1) + 1));
            const objToWrite = formNewSchemaElement(tempId, objectInContext);
            schemaElements.push(objToWrite);
            updateSchema(schemaElements);
        }
    };

    const formNewSchemaElement = (id, objectTypeFromDiv) => {
        const schemaTemp = {
            id: id,
            type: objectTypeFromDiv,
            meta_data: {
                value: 'Add text',
                size: { width: 160, height: 78 },
                position_text: { x: 615, y: 170 },
                position_container: { x: 450, y: 100 }
            }
        }
        return schemaTemp;
    };

    const updateTheSchemaElementsList = (idToUpdate, updatedSchema) => {
        schemaElements = schemaElements.filter((item) => (item.id !== idToUpdate));
        schemaElements.push(updatedSchema);
        updateSchema(schemaElements);
    }




    const overover = (e) => {
        e.preventDefault();
    };

    return (
        <div className="drop-zone" onDragOver={(event) => overover(event)} onDrop={(event) => uponDropping(event)}>
                <div className="save-button" onClick={load}>
                <RiDeleteBin6Line />
                </div>
            <div className="element-dropped">
            { 
                schemaElements.map((item) => (
                    <EditorText schema={item} objectType={item['type']} identifier={tempId} updateSchemaCallback={updateTheSchemaElementsList}>

                    </EditorText>
                ))
            }
            </div>
        </div>
    );
}

export default EditorLayout;
