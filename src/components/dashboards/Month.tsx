import React from "react";
import Day from "./Day";
import { Dayjs } from "dayjs";

interface MonthProps {
  month: Dayjs[][]; // Utilisez Dayjs plutôt que Date
}

const Month: React.FC<MonthProps> = ({ month }) => {
    console.log('Month Prop:', month);
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
     {month.flat().map((day, idx) => (
    <Day day={day} key={idx} rowIdx={0} />
))}
    </div>
  );
};

export default Month;