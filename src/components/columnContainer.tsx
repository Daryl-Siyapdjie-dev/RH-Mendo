import { Trash3 } from "react-bootstrap-icons";
import { Id, column } from "../interface"
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities"

interface props {
    column: column;
    deleteColumn: (id: Id)=>void;
}

export function ColumnContainer(props: props){
    const {column, deleteColumn}=props
    const {setNodeRef, attributes, listeners, transform, transition}=useSortable({
        id: column.id,
        data: {
            type: "column",
            column,
        },
    });

    const style={
        transition,
        transform: CSS.Transform.toString(transform),
    }
    return(
         <div 
         ref={setNodeRef}
         style={style}
         className=" rounded-md flex flex-col w-96 h-[500px] max-h-[500px] bg-white shadow-md"
         >
            {/*column title */}
            <div 
            { ...attributes}
            { ...listeners}
            className=" text-base cursor-grab rounded-md rounded-b-none font-bold h-16 p-3 border-4 border-fuchsia-200 flex items-center justify-between">
            <div className=" flex gap-2">
               <div className=" flex justify-center items-center  rounded-full bg-blue-500 px-2 py-1 text-sm">0</div>
            {column.title}
            </div>
            <button onClick={()=>{deleteColumn(column.id)}}
            className="p-1 hover:bg-red-300 rounded-full hover:text-gray-700 text-gray-600"><Trash3/></button>
            </div>
            {/*column task container */}
            <div className=" flex flex-grow">content</div>
            {/*column footer */}
            <div>footer</div>
         </div>
    )
}