import ComponentContainer from "./ComponentContainer";
import BuilderNav from "./navbar/BuilderNav";
import EditorLayout from "./editor/EditorLayout"
import { createContext } from "react";
import { useState } from "react";

export const BuilderLayoutContext = createContext();

const BuilderLayout = () => {
    
    const [objectInContext, changeState] = useState(null); 
    const [schema, setSchema] = useState([]);

    const updateContext = (val) => {
        changeState(val);
    }

    const updateSchema = (schemObj) => {
        console.log("updating the schema to: " + JSON.stringify(schemObj));
        setSchema(schemObj);
    };


    return (
        
        <div className="builder-layout">
            <div className="builder-pre-nav-1"><BuilderNav/></div>
            <div className="builder-pre-nav-2">
            <BuilderLayoutContext.Provider value={{objectInContext, updateContext, updateSchema, schema }} > 
                <div className="component-container">
                    <ComponentContainer />
                </div>

                <div className="editor-container">
                    <EditorLayout />
                </div>
                </BuilderLayoutContext.Provider>
            </div>
        </div>
    );
}

export default BuilderLayout;