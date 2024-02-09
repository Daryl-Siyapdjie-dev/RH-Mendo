import { EtatTache, ITache } from "../interface";
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from "@dnd-kit/sortable";

export const Tache = ({ _id, description, nomProjet, index, onDragStart }: ITache & { index: number, onDragStart: (e: React.DragEvent, taskId: string, newEtat: EtatTache) => void }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    isDragging,
  } = useSortable({
    id: _id,
    data: {
      type: "ITache",
      _id,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : undefined,
  }; 
  if(isDragging){
     return (
     <div className="bg-white rounded-md shadow-md p-4 mb-4"
     ref={setNodeRef}
     style={style}
     >
        <h3 className="font-bold mb-2">{description}</h3>
      <p className="text-gray-500">{nomProjet}</p>
     </div>
     )
     
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-md shadow-md p-4 mb-4"
      draggable // Ajoutez cette propriété pour rendre l'élément glissable
      onDragStart={(e) => onDragStart(e, _id, EtatTache.ENCOURS)} // Appel de la fonction onDragStart
    >
      <h3 className="font-bold mb-2">{description}</h3>
      <p className="text-gray-500">{nomProjet}</p>
    </div>
  );
};