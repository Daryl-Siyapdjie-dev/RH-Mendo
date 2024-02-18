import dayjs from "dayjs";
import { useContext } from "react";
import { ChevronLeft, ChevronRight, PlusLg } from "react-bootstrap-icons";
import GlobalDashboardContext from "../../context/GlobalDashboardContext";

const CalendarHeader = () => {
   const {monthIndex, setMonthIndex, setShowEventModal}=useContext(GlobalDashboardContext);

   function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset(){
    setMonthIndex(monthIndex === dayjs().month() ? monthIndex + Math.random() : dayjs().month());
  }
    return (
        <div className="flex justify-between items-center ">
      <div className="px-4 py-2 flex items-center">
        <div  className="border rounded py-2  mr-5 flex items-center">
          <span  onClick={handlePrevMonth} className=" cursor-pointer text-gray-600 px-4 ">
            <ChevronLeft/>
          </span>
          <span onClick={handleReset} className="cursor-pointer px-4">
          Today
          </span>
       
          <span onClick={handleNextMonth} className=" cursor-pointer text-gray-600 px-4  ">
            <ChevronRight/>
          </span>
        </div>
       
       
        <p className="ml-4 text-lg text-gray-600 font-bold">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </p>
        
        
      </div>
      <div>
            <button onClick={()=>setShowEventModal(true)} className=" btn mx-4 ">
              <PlusLg/>activite
            </button>
        </div>
      </div>
    );
  };
  
  export default CalendarHeader;