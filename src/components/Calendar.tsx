import React from 'react';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type Mood } from '../types';
import { getMoodColor, getMoodIcon } from '../utils/mood';

type Props = {
  moods: Mood[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};

export function Calendar({ moods, selectedDate, onDateChange }: Props) {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getMoodForDate = (date: Date) => 
    moods.find(mood => isSameDay(new Date(mood.date), date));

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {format(selectedDate, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => onDateChange(subMonths(selectedDate, 1))}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={() => onDateChange(addMonths(selectedDate, 1))}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map(day => (
          <div
            key={day}
            className="pb-2 text-center text-sm font-medium text-gray-600"
          >
            {day}
          </div>
        ))}

        {days.map(day => {
          const mood = getMoodForDate(day);
          const isCurrentMonth = isSameMonth(day, selectedDate);

          return (
            <div
              key={day.toString()}
              className={`aspect-square rounded-lg p-1 ${
                isCurrentMonth ? 'bg-gray-50' : 'bg-gray-100'
              }`}
            >
              <div className="relative h-full">
                <span
                  className={`text-sm ${
                    isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {format(day, 'd')}
                </span>
                {mood && (
                  <div
                    className={`absolute bottom-0 right-0 rounded-full p-1 ${getMoodColor(
                      mood.rating
                    )}`}
                  >
                    {getMoodIcon(mood.rating)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}