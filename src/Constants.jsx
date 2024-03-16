import { LuImagePlus } from "react-icons/lu";
import { BsChatLeftTextFill } from "react-icons/bs";
import { IoCodeSlash } from "react-icons/io5";
import { GrDocumentTxt } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

export const ITEM_STATE = {
    spawn: 'spawn',
    moving: 'moving',
    droppped: 'dropped'
}

export const ITEMS_LIST = [
    {
        uuid: '1234565498',
        icon: <BsChatLeftTextFill />,
        value: "Text"
    },
    {
        uuid: '1234545498',
        icon: <LuImagePlus />,
        value: "Image"
    },
    {
        uuid: '12345564565498',
        icon: <IoCodeSlash />,
        value: "Snippet"
    },
    {
        uuid: '12345564565498',
        icon: <GrDocumentTxt />,
        value: "Document"
    },
];

export const DELETE_ICON = {
    uuid: '1234565498',
    icon: <RiDeleteBin6Line />,
    value: "Delete" 
}