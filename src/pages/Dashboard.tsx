import  {  useContext, useEffect, useState } from "react"
import {getMonth} from "../library/utilDate"
import CalendarHeader from "../components/dashboards/CalendarHeader"
import Month from "../components/dashboards/Month"
import Sidebar from "../components/dashboards/Sidebar"
import { Dayjs } from "dayjs"
import GlobalDashboardContext from "../context/GlobalDashboardContext"
import EventModal from "../components/dashboards/EventModal"



export function DashBoard() {
    const {monthIndex, showEventModal}=useContext(GlobalDashboardContext)
    const [currentMonth, setCurrentMonth] = useState<Dayjs[][]>(getMonth());
    console.log('Initial currentMonth:', currentMonth);
  useEffect(()=>{
    setCurrentMonth(getMonth(monthIndex))
  },[monthIndex])
  
    return <>
    {showEventModal && <EventModal/>}
<div className="h-screen flex flex-col">
    
  <CalendarHeader />
  <div className="flex flex-1">
  <Sidebar />
    <Month month={currentMonth} />
  </div>
</div>
    
    </>
 }