import { useMemo, useState } from "react";
import { PlusLg, ThreeDotsVertical } from "react-bootstrap-icons";
import { Id, column } from "../interface";
import { generateId } from "../library/generateId";
import { ColumnContainer } from "../components/columnContainer";
import { DndContext, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

export function Kanban (){
     const [columns,setColumns]=useState<column[]>([]);
     const columnsId = useMemo(()=>columns.map((col)=>col.id),[columns]);
     const [activeColumn , setActiveColumn]= useState<column | null>(null);
     
    return <>
 
    <div className="w-full h-full  bg-bgcontaint">
     <div className="flex space-x-4 justify-end md:space-x-6 items-center px-4 py-4">
        <button className="btn hidden  md:block">+ Ajouter une tache</button>
        <button className="btn">+ <PlusLg/></button>
        <ThreeDotsVertical className=" cursor-pointer h-6 "/>
     </div>
     <div className="flex space-x-4 justify-end md:space-x-6 items-center px-4 py-4">

       { 
       createPortal(  
         <DragOverlay>
        {activeColumn && (
        <ColumnContainer 
        column={activeColumn} 
        deleteColumn={deleteColumn}
        />
        )}

       </DragOverlay>,
       document.body
       ) }

        <DndContext onDragStart={ onDragStart}>
        <div className="flex gap-2">
            <SortableContext items={columnsId}>
        {columns.map((col)=>(<ColumnContainer key={col.id} column={col} deleteColumn={deleteColumn}/>))}
        </SortableContext>
        </div>
        <button
        onClick={createNewColumn}
        className="btn hidden  md:block"
        >+ Ajouter une colone</button>
        </DndContext>
       
     </div>
     <h1 className="font-bold">Kanban</h1>
    </div>
    </>
    function createNewColumn(){
        const columnToAdd: column={
            id:generateId(),
            title: `column ${columns.length +1}`
        };

        setColumns([...columns,columnToAdd])

    }

    function onDragStart(event: DragStartEvent){

    
        console.log('DRAG START', event)
        if(event.active.data.current?.type==="column"){
            setActiveColumn(event.active.data.current.column);
            return;
    
        }
    
    }

    function deleteColumn(id: Id){
        const filteridColumns = columns.filter((col)=> col.id !== id );
        setColumns(filteridColumns)
        
    }
 }

