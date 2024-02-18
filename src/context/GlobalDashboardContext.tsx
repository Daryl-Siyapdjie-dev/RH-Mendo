/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs from 'dayjs';
import  { createContext } from 'react'

interface Event {
  id: string;
  title: string;
  description: string;
  label: string;
  day: number; 
  checked?:boolean;
}

export interface LabelType {
  label: string;
  checked: boolean;
}

interface SavedEventsState extends Array<Event> {}

interface SavedEventsAction {
  type: 'push' | 'update' | 'delete';
  payload: Event | { id: string };
}
interface GlobalDashboardContextProps {
    monthIndex: number;
    setMonthIndex: (index: number) => void;
    smallCalendarMonth: number | null;
    setSamllCalendarMont: (index: number | null) => void;
    daySelected: dayjs.Dayjs | null;
    setDaySelected: (day: dayjs.Dayjs | null) => void;
    showEventModal: boolean;
    setShowEventModal: (value: boolean) => void;
    dispatchCalEvent: (action: SavedEventsAction) => void;
    savedEvents: SavedEventsState;
    selectedEvent: Event | null;
    setSelectedEvent: (event: Event | null) => void;
    labels: LabelType[]; // Utilisez l'interface LabelType que vous avez déjà définie
  setLabels: React.Dispatch<React.SetStateAction<LabelType[]>>;
  updateLabel: (label: LabelType) => void;
  filteredEvents: Event[];
  }
  
  export const GlobalDashboardContext = createContext<GlobalDashboardContextProps>({
    monthIndex: 0,
    setMonthIndex: () => {},
    smallCalendarMonth: null,
    setSamllCalendarMont: () => {},
    daySelected: null,
    setDaySelected: () => {},
    showEventModal: false,
    setShowEventModal: () =>{},
    dispatchCalEvent: ()=>{},
    savedEvents: [],
    selectedEvent: null,
    setSelectedEvent: ()=>{},
    setLabels: ()=>{},
    labels: [],
    updateLabel: () => {},
    filteredEvents: [],

  });
export default GlobalDashboardContext
