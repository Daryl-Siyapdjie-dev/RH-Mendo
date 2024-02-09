import { useState, useEffect, useMemo } from "react";
import { EtatTache, IColonne, ITache } from "../interface";
import { Tache } from "./Task";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import {  useDroppable,  } from "@dnd-kit/core";

export const Colonne = ({ titre, etat, onDrop }: IColonne & { onDrop: (taskId: string, newEtat: EtatTache) => void }) => {
  const [taches, setTaches] = useState<ITache[]>([]);
  //const [activeId, setActiveId] = useState(null);
  const TacheIds = useMemo(() => {
    return taches.map((tache) => tache._id);
  }, [taches]);
  const { setNodeRef, over } = useDroppable({
    id: etat, // Utilisez l'état comme ID pour le droppable
 });



useEffect(() => {
  // Récupérez les tâches depuis l'API
  fetch(`http://localhost:2727/taches/lireTache?etat=${etat}`)
    .then((response) => response.json())
    .then((taches: ITache[]) => setTaches(taches.filter((tache) => tache.etat === etat)));
}, [etat]);

  let circleColor;
  switch (titre) {
    case 'À faire':
      circleColor = 'bg-orange-500';
      break;
    case 'En cours':
      circleColor = 'bg-yellow-500';
      break;
    case 'Terminé':
      circleColor = 'bg-purple-500';
      break;
    default:
      circleColor = 'bg-blue-500';
  }
  const handleDragStart = (e: React.DragEvent, taskId: string, newEtat: EtatTache) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ _id: taskId, newEtat }));
  };
  console.log(handleDragStart)

  
 

  return (
  
    <div ref={setNodeRef} className={`w-1/3 p-4 ${over ? 'dropzone' : ''}`} >
      <div className="flex">
        <div className={`${circleColor} rounded-full w-6 h-6 flex items-center justify-center mr-4`}></div>
        <h2 className="text-lg font-bold mb-4">
          {titre}
        </h2>
      </div>

      <SortableContext items={TacheIds} strategy={rectSortingStrategy}>
        <div
          onDrop={(e) => {
            e.preventDefault();
            const taskData = JSON.parse(e.dataTransfer.getData("application/json"));
            onDrop(taskData._id, taskData.newEtat);
          }}
        >
          {taches?.map((tache, index) => (
            <Tache key={tache._id} 
              {...tache} 
              index={index} 
              onDragStart={(e) => handleDragStart(e, tache._id, EtatTache.ENCOURS)} 
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};















































































































// import { Trash3 } from "react-bootstrap-icons";
// import { Id, column } from "../interface"
// import { useSortable } from "@dnd-kit/sortable";
// import {CSS} from "@dnd-kit/utilities"
// import { useState } from "react";

// interface props {
//     column: column;
//     deleteColumn: (id: Id)=>void;
//     updateColumn: (id: Id, title: string) => void;
// }

// export function ColumnContainer({ 
//     column,
//     deleteColumn,
//     updateColumn,
//    }: props){

//     const [editMode, setEditMode] = useState(false);
    
//     const {
//         setNodeRef,
//         attributes,
//         listeners,
//         transform,
//         transition,
//         isDragging,
//       } = useSortable({
//         id: column.id,
//         data: {
//           type: "Column",
//           column,
//         },
//         disabled: editMode,
//       });
    
//       const style = {
//         transition,
//         transform: CSS.Transform.toString(transform),
//       };
    
 
//     if (isDragging) {
//         return (
//           <div
//             ref={setNodeRef}
//             style={style}
//             className="
//           bg-columnBackgroundColor
//           opacity-40
//           border-2
//           border-pink-500
//           w-[350px]
//           h-[500px]
//           max-h-[500px]
//           rounded-md
//           flex
//           flex-col
//           "
//           ></div>
//         );
//       }
    
//     return(
//         <div
//         ref={setNodeRef}
//         style={style}
//         className="
//     bg-columnBackgroundColor
//     w-[350px]
//     h-[500px]
//     max-h-[500px]
//     rounded-md
//     flex
//     flex-col
//     "
//       >
//         {/* Column title */}
//         <div
//           {...attributes}
//           {...listeners}
//           onClick={() => {
//             setEditMode(true);
//           }}
//           className="
//         bg-mainBackgroundColor
//         text-md
//         h-[60px]
//         cursor-grab
//         rounded-md
//         rounded-b-none
//         p-3
//         font-bold
//         border-columnBackgroundColor
//         border-4
//         flex
//         items-center
//         justify-between
//         "
//         >
//           <div className="flex gap-2">
//             <div
//               className="
//           flex
//           justify-center
//           items-center
//           bg-columnBackgroundColor
//           px-2
//           py-1
//           text-sm
//           rounded-full
//           "
//             >
//               0
//             </div>
//             {!editMode && column.title}
//             {editMode && (
//               <input
//                 className="bg-black focus:border-rose-500 border rounded outline-none px-2"
//                 value={column.title}
//                 onChange={(e) => updateColumn(column.id, e.target.value)}
//                 autoFocus
//                 onBlur={() => {
//                   setEditMode(false);
//                 }}
//                 onKeyDown={(e) => {
//                   if (e.key !== "Enter") return;
//                   setEditMode(false);
//                 }}
//               />
//             )}
//           </div>
//             <button    onClick={() => {
//             deleteColumn(column.id);
//           }}
//           className="
//         stroke-gray-500
//         hover:stroke-white
//         hover:bg-columnBackgroundColor
//         rounded
//         px-1
//         py-2
//         "
//         ><Trash3/></button>
//             </div>
//             {/*column task container */}
//             <div className=" flex flex-grow">content</div>
//             {/*column footer */}
//             <div>footer</div>
//          </div>
//     )
//  }