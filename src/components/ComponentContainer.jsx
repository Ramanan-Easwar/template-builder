import TextComponent from "./componentList/TextComponent";
import { ITEMS_LIST } from "../Constants";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSaveDown1 } from "react-icons/ci";
import { useContext, useState } from "react";
import { BuilderLayoutContext } from "./BuilderLayout";

const ComponentContainer = () => {
    const {schema, updateSchema} = useContext(BuilderLayoutContext);

    const [isLoading, setIsLoading] = useState(false);

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
            updateSchema(data[0].schema); // loading into the data
          })
          .catch(error => {
            console.log("error from api: " + JSON.stringify(error));
          })
          .finally(() => {
            setIsLoading(false);
          });
    };

    // make the call to save the schema
    const makeHttpCallToSave = () => {
        console.log("initiating save");
        setIsLoading(true);
        fetch('http://localhost:8000/schema/submit', {
            method: 'POST',
            body: JSON.stringify(schema)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Please check the api error');
            }
            return response.json();
          })
          .then(data => {
            console.log("data from api: " + JSON.stringify(data));
          })
          .catch(error => {
            console.log("error from api: " + JSON.stringify(error));
          })
          .finally(() => {
            setIsLoading(false);
          });
    };

    return (
        <div className="component-container-main">
            <div className="element">
            { 
                ITEMS_LIST.map((item) => (
                    <TextComponent id={item.uuid} icon={item.icon} value={item.value} fromDropZone={false}></TextComponent>
                ))}
            </div>
            <div className="save-button" onClick={load}>
                <RiDeleteBin6Line />
            </div>
            <div className="save-button-2">
                <CiSaveDown1 disabled={isLoading} onClick={makeHttpCallToSave} />
            </div>
        </div>
    );
}

export default ComponentContainer;