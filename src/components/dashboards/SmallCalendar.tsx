import dayjs from "dayjs"
import React, { useContext, useEffect, useState } from "react"
import getMonth from "../../library/utilDate";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import GlobalDashboardContext from "../../context/GlobalDashboardContext";

export default function SmallCalendar() {
    const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
    const [currentMonth, setCurrentMonth] =useState(getMonth());

    useEffect(()=>{
        setCurrentMonth(getMonth(currentMonthIdx))
    },[currentMonthIdx]);

    function handlePrevMonth(){
        setCurrentMonthIdx(currentMonthIdx -1)
    }
    function handleNextMonth(){
        setCurrentMonthIdx(currentMonthIdx +1)
    }

    function getDayClass(day: dayjs.Dayjs) {
        const format = "DD-MM-YY";
        const nowDay = dayjs().format(format);
        const currDay = day.format(format);
        const slcDay = daySelected && daySelected.format(format);
        if (nowDay === currDay) {
          return "bg-purple-500 rounded-full text-white";
        } else if (currDay === slcDay) {
          return "bg-purple-100 rounded-full text-purple-600 font-bold";
        } else {
          return "";
        }
      }
    const {monthIndex, setSamllCalendarMont, setDaySelected, daySelected}=useContext(GlobalDashboardContext);

    useEffect(()=>{
        setCurrentMonthIdx(monthIndex)
    },[monthIndex])

    function handleDayClick(day: dayjs.Dayjs) {
      setDaySelected(day);
      setSamllCalendarMont(currentMonthIdx);
    }
  return (
    <div className=" mt-9">
        <header className=" flex justify-between items-center">
           <p className=" text-gray-500 font-bold">
            {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
           </p>
           <button>
           <span  onClick={handlePrevMonth} className=" cursor-pointer text-gray-600 px-4 ">
            <ChevronLeft/>
          </span>
           </button>
           <button>
           <span onClick={handleNextMonth} className=" cursor-pointer text-gray-600 px-4  ">
            <ChevronRight/>
          </span>
           </button>
        </header>
        <div className="grid grid-cols-7 grid-rows-6">
            {currentMonth[0].map((day,i)=>(
                <span key={i} className=" text-sm py-1 text-center">
                   {day.format('dd').charAt(0)}
                </span>
            ))}
            {currentMonth.map((row,i)=>(
                <React.Fragment key={i}>
                    {row.map((day,idx)=>(
                        <button 
                        onClick={()=>handleDayClick(day)}
                        key={idx} 
                        className={`py-1 w-full ${getDayClass(day)}`}>
                            <span className=" text-sm">{day.format('D')}</span>
                        </button>
                    ))}
                </React.Fragment>
            ))}
        </div>
    </div>
  )
}
