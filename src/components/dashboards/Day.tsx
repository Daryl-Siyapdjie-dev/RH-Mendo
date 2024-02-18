import dayjs, { Dayjs } from "dayjs";
import { FC, useContext, useEffect, useState } from "react";
import GlobalDashboardContext from "../../context/GlobalDashboardContext";


interface DayProps {
  day: Dayjs;
  rowIdx: number;
}

interface Event {
  id: string;
  title: string;
  description: string;
  label: string;
  day: number;
  checked?:boolean 
}

const Day: FC<DayProps> = ({ day, rowIdx }) => {
  const [dayEvent, setDayEvent] = useState<Event[]>([]);
  const { setDaySelected, setShowEventModal, filteredEvents, setSelectedEvent } = useContext(GlobalDashboardContext);

  useEffect(() => {
    const events: Event[] = filteredEvents.filter(
      (evt) => dayjs(evt.day).startOf('day').isSame(day.startOf('day'))
    );
    setDayEvent(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.isSame(dayjs(), 'day') ? "bg-purple-500 text-white rounded-full w-7" : "";
  }

  return (
    <div className="border border-white-100 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1 ">{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>{day.format("DD")}</p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
      {dayEvent.map((evt, idx) => (
           <div 
             key={idx}
             onClick={() => setSelectedEvent(evt)}
             className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
           >
             {evt.title}
           </div>
         ))}
      </div>
    </div>
  );
};

export default Day;