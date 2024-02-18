import  { ReactNode, useEffect, useMemo, useReducer, useState } from 'react'
import {GlobalDashboardContext} from "../context/GlobalDashboardContext"
import dayjs from 'dayjs'
   
interface ContextWrapperProps {
  children: ReactNode;
}
interface Event {
  id: string;
  title: string;
  description: string;
  label: string;
  day: number; 
  checked?: boolean
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
function savedEventsReducer(state: SavedEventsState, action: SavedEventsAction): SavedEventsState {
  switch (action.type) {
    case 'push':
      return [...state, adjustEventDate(action.payload as Event)];
    case 'update':
      return state.map((event) =>
        event.id === (action.payload as Event).id ? adjustEventDate(action.payload as Event) : event
      );
    case 'delete':
      return state.filter((event) => event.id !== (action.payload as { id: string }).id);
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function adjustEventDate(event: Event): Event {
  return {
    ...event,
    day: dayjs(event.day).valueOf(), // Utilisez dayjs(event.day).valueOf() pour obtenir le timestamp
  };
}

function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents).map(adjustEventDate) : [];
  return parsedEvents;
}

export default function ContextWrapper(props: ContextWrapperProps) {
  const [monthIndex, setMonthIndex] = useState<number>(dayjs().month());
  const [smallCalendarMonth, setSamllCalendarMont] = useState<number | null>(null);
  const [daySelected, setDaySelected] = useState<dayjs.Dayjs | null>(dayjs());
  const [showEventModal, setShowEventModal]= useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer,[] , initEvents);
  const [labels, setLabels] = useState<LabelType[]>([]);

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvents, labels]);

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map(
        (label) => {
          const currentLabel = prevLabels.find(
            (lbl) => lbl.label === label
          );
          return {
            label,
            checked: currentLabel ? currentLabel.checked : true,
          };
        }
      );
    });
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);


  function updateLabel(label: LabelType) {
    setLabels((prevLabels) =>
      prevLabels.map((lbl) => (lbl.label === label.label ? label : lbl))
    );
  }


  return (
    <GlobalDashboardContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSamllCalendarMont,
        setDaySelected,
        daySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        savedEvents,
        selectedEvent,
        setSelectedEvent,
        labels,
        setLabels,
        updateLabel,
        filteredEvents,
      }}
    >
      {props.children}
    </GlobalDashboardContext.Provider>
  );
}
