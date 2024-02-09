import { useState, useEffect } from "react";
import {DndContext, DragEndEvent, DragOverEvent,  } from "@dnd-kit/core";
import { EtatTache, IColonne,ITache } from "../interface";
import { Colonne } from "../components/columnContainer";

interface IKanban {
  colonnes: IColonne[];
}

export const Kanban = () => {
  const [kanban, setKanban] = useState<IKanban>({
    colonnes: [
      { id: "a-faire", titre: "À faire", etat: EtatTache.AFAIRE, taches: []  },
      { id: "en-cours", titre: "En cours", etat: EtatTache.ENCOURS, taches: [] },
      { id: "termine", titre: "Terminé", etat: EtatTache.TERMINEE, taches: [] },
    ],
  });

 

  useEffect(() => {
    // Récupérez les tâches depuis l'API pour toutes les colonnes en une seule requête
    fetch("http://localhost:2727/taches/lireTache")
      .then((response) => response.json())
      .then((taches: ITache[]) => {
        const updatedColonnes = kanban.colonnes.map((colonne) => {
          const filteredTaches = taches.filter((tache) => tache.etat === colonne.etat);
          return { ...colonne, taches: filteredTaches };
        });
  
        setKanban({ colonnes: updatedColonnes });
      });
  }, []);  // La dépendance vide assure que cet effet n'est exécuté qu'une fois au montage

 
  const updateKanbanState = (updatedColonnes: IColonne[]) => {
    setKanban({ colonnes: updatedColonnes });
  };

  

  const handleDrop = (taskId: string, newEtat: EtatTache) => {
    const updatedColonnes = kanban.colonnes.map((colonne) => {
      const updatedTaches = colonne.taches.map((tache) => {
        console.log('Tâche avant mise à jour :', tache);
        if (tache._id === taskId) {
          return { ...tache, etat: newEtat };
        }
        return tache;
      });
  
      return { ...colonne, taches: updatedTaches };
    });
  
    updateKanbanState(updatedColonnes);
  };
  console.log(handleDrop)

  const onDragEnd = (event: DragEndEvent) => {
    
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const taskId = active.id;
    console.log("Task ID:", taskId);
    const newColumnId = over.id;

    const tacheToMove = kanban.colonnes
      .flatMap((colonne) => colonne.taches)
      .find((tache) =>{
        console.log("Checking task:", tache);
        return tache && tache._id === taskId;
      } );

    if (!tacheToMove) {
      return;
    }

    tacheToMove.etat = newColumnId as EtatTache;

    const updatedColonnes = kanban.colonnes.map((colonne) => {
      if (colonne.id === newColumnId) {
        return {
          ...colonne,
          taches: [...colonne.taches, tacheToMove],
        };
      } else if (colonne.taches.some((tache) => tache && tache._id === taskId)) {
        return {
          ...colonne,
          taches: colonne.taches.filter((tache) => tache._id !== taskId),
        };
      }
      return colonne;
    });
    console.log("test updatedColonnes",updatedColonnes)

    updateKanbanState(updatedColonnes);
  };
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
   
    // Si l'élément survolé n'existe pas, la fonction retourne immédiatement.
    if (!over) {
       return;
    }
   
    // Récupère les identifiants des éléments actif et survolé.
    const activeId = active.id;
    const overId = over.id;
   
    // Si les identifiants sont identiques, la fonction retourne également immédiatement.
    if (activeId === overId) {
       return;
    }
   
    // Vérifie si l'élément actif est une tâche et si l'élément survolé est également une tâche.
    const activeIsTask = active.data.current?.type === 'ITache';
    const overIsTask = over.data.current?.type === 'ITache';
   
    // Si l'élément actif n'est pas une tâche, la fonction retourne.
    if (!activeIsTask) {
       return;
    }
   
    // Si l'élément actif est une tâche et l'élément survolé est également une tâche, elle effectue les actions suivantes :
    if (overIsTask) {
       // Trouvez les indices des tâches actives et survolées dans leurs colonnes respectives
       const activeTaskIndex = kanban.colonnes.flatMap((colonne) => colonne.taches).findIndex((tache) => tache._id === activeId);
       const overTaskIndex = kanban.colonnes.flatMap((colonne) => colonne.taches).findIndex((tache) => tache._id === overId);
   
       if (activeTaskIndex > -1 && overTaskIndex > -1) {
         // Créez une copie des colonnes pour éviter de modifier l'état directement
         const updatedColumns = kanban.colonnes.map((colonne) => {
           const updatedTaches = [...colonne.taches];
           // Échangez les positions des tâches actives et survolées
           [updatedTaches[activeTaskIndex], updatedTaches[overTaskIndex]] = [updatedTaches[overTaskIndex], updatedTaches[activeTaskIndex]];
           return { ...colonne, taches: updatedTaches };
         });
   
         // Mettez à jour l'état avec les nouvelles colonnes

         updateKanbanState(updatedColumns);       }
    }
   };
console.log(onDragEnd)
 
   console.log(handleDragOver)
  return (
    <DndContext
    
    onDragEnd={onDragEnd}
    onDragOver={handleDragOver}
    > 
      <div className="flex justify-center bg-bgcontaint">
        {kanban.colonnes.map((colonne) => (
          
          <Colonne key={colonne.id} {...colonne} onDrop={handleDrop} />

        ))}
      </div>
     
    </DndContext>
  );
};








































































































// import { useMemo, useState } from "react";
// import { PlusLg, ThreeDotsVertical } from "react-bootstrap-icons";
// import { Id, column } from "../interface";
// import { generateId } from "../library/generateId";
// import { ColumnContainer } from "../components/columnContainer";
// import { DndContext, DragOverlay, DragStartEvent } from "@dnd-kit/core";
// import { SortableContext } from "@dnd-kit/sortable";
// import { createPortal } from "react-dom";

// export function Kanban (){
//      const [columns,setColumns]=useState<column[]>([]);
//      const columnsId = useMemo(()=>columns.map((col)=>col.id),[columns]);
//      const [activeColumn , setActiveColumn]= useState<column | null>(null);
     
//     return <>
 
//     <div className="w-full h-full  bg-bgcontaint">
//      <div className="flex space-x-4 justify-end md:space-x-6 items-center px-4 py-4">
//         <button className="btn hidden  md:block">+ Ajouter une tache</button>
//         <button className="btn">+ <PlusLg/></button>
//         <ThreeDotsVertical className=" cursor-pointer h-6 "/>
//      </div>
//      <div className="flex space-x-4 justify-end md:space-x-6 items-center px-4 py-4">

//        { 
//        createPortal(  
//          <DragOverlay>
//         {activeColumn && (
//         <ColumnContainer 
//         column={activeColumn} 
//         deleteColumn={deleteColumn}
//         updateColumn={updateColumn}
//         />
//         )}

//        </DragOverlay>,
//        document.body
//        ) }

//         <DndContext onDragStart={ onDragStart} onDragEnd={onDragEnd}>
//         <div className="flex gap-2">
//             <SortableContext items={columnsId}>
//         {columns.map((col)=>(<ColumnContainer key={col.id} column={col} deleteColumn={deleteColumn}  updateColumn={updateColumn} />))}
//         </SortableContext>
//         </div>
//         <button
//         onClick={createNewColumn}
//         className="btn hidden  md:block"
//         >+ Ajouter une colone</button>
//         </DndContext>
       
//      </div>
//      <h1 className="font-bold">Kanban</h1>
//     </div>
//     </>
//     function createNewColumn(){
//         const columnToAdd: column={
//             id:generateId(),
//             title: `column ${columns.length +1}`
//         };

//         setColumns([...columns,columnToAdd])

//     }

 
//     function onDragStart(event: DragStartEvent) {
//         if (event.active.data.current?.type === "Column") {
//           setActiveColumn(event.active.data.current.column);
//           return;
//         }
    
//         // if (event.active.data.current?.type === "Task") {
//         //   setActiveTask(event.active.data.current.task);
//         //   return;
//         // }
//       }
//       function onDragEnd(){

//       }

//     function deleteColumn(id: Id){
//         const filteridColumns = columns.filter((col)=> col.id !== id );
//         setColumns(filteridColumns)
        
//     }
//  }

