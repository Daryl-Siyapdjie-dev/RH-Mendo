import { useContext, useState } from "react";
import GlobalDashboardContext from "../../context/GlobalDashboardContext";
import { ChatRightText, Check, Clock, GripHorizontal, Palette, Trash3, XLg } from "react-bootstrap-icons";

const labelsClasses = [
  "indigo",
  "gray",
  "green",
  "blue",
  "red",
  "purple",
];
export default function EventModal() {
  const {setShowEventModal,daySelected, dispatchCalEvent, selectedEvent}=useContext(GlobalDashboardContext);
  const [title,setTitle]= useState<string>(
    selectedEvent ? selectedEvent.title : ""
  )
  const [description,setDescription]= useState<string>(
    selectedEvent ? selectedEvent.description : ""
  )
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent 
    ? labelsClasses.find((lbl) => lbl === selectedEvent.label) 
    : labelsClasses[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected?.valueOf() || Date.now(),
      id: selectedEvent ? selectedEvent.id : Date.now().toString(),
    };
  
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }
  
    setShowEventModal(false);
  }
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex  min-h-screen items-center justify-center">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity " />
      <div className="inline-block  bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full ">
      <header className=" flex justify-between font-medium bg-gray-100 px-4 py-2 items-center ">
               <span>
                <GripHorizontal/>
                </span>
                <div>
                {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className=" text-gray-400 inline-flex cursor-pointer mx-2"
              >
                <Trash3/>
              </span>
            )}
                <span>
               <button onClick={()=>setShowEventModal(false)}>
                <XLg/>
                </button>
                </span>
                </div>
               
              </header>
          
          <div className="mt-5 flex justify-center">
            <form>
              <div className=" p-3">
                <div className=" grid gap-y-7  grid-cols-1/5 items-center">
                  <div></div>
                  <input 
                  type="text" 
                  placeholder="Ajout un titre" 
                  required 
                  name="title"
                   value={title}
                   className="p-3 text-gray-600 font-semibold text-lg border-0 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:right-0 focus:border-purple-500"
                   onChange={(e) => setTitle(e.target.value)} 
                   />
                   <span className=" text-gray-700">
                    <Clock/>
                   </span>
                   <p>{daySelected?.format("dddd, MMMM DD")}</p>
                   <span className=" text-gray-700">
                    <ChatRightText/>
                   </span>
                   <input 
                  type="text" 
                  placeholder="ajout une Description" 
                  required 
                  name="description"
                   value={description}
                   className="p-3 text-gray-600  border-0 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:right-0 focus:border-purple-500"
                   onChange={(e) => setDescription(e.target.value)} 
                   />
                   <span className=" text-gray-700">
                    <Palette/>
                   </span>
                   <div className="flex gap-x-2">
                   {labelsClasses.map((lblClass, i) => (
                     <span
                       key={i}
                       onClick={() => setSelectedLabel(lblClass)}
                       className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center                  cursor-pointer`}
                     >
                       {selectedLabel === lblClass && (
                         <span className={`text-${lblClass}-900 text-sm`}>
                           <Check />
                      </span>
                       )}
                     </span>
                   ))}
                 </div>
                </div>
              </div>
              
            </form>
          </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6  flex justify-end">
          
          <button
            type="button"
            onClick={handleSubmit}
            className=" btn"
          >
            Enregistre
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}
