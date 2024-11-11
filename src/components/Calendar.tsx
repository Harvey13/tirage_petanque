import React from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface CalendarProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
  drawDates: Date[];
}

export function Calendar({ selectedDate, onSelect, drawDates }: CalendarProps) {
  // Custom day content renderer
  const renderDay = (day: Date, draws: number) => {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <span className={clsx(
          'text-sm font-medium',
          draws > 0 ? 'text-gray-900' : 'text-gray-400'
        )}>
          {format(day, 'd')}
        </span>
        {draws > 0 && (
          <span className="mt-0.5 flex items-center justify-center w-4 h-4 text-[10px] font-bold rounded-full bg-blue-100 text-blue-700">
            {draws}
          </span>
        )}
      </div>
    );
  };

  // Get draw counts for each date
  const getDrawCountForDate = (date: Date) => {
    return drawDates.filter(d => 
      d.getDate() === date.getDate() && 
      d.getMonth() === date.getMonth() && 
      d.getFullYear() === date.getFullYear()
    ).length;
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <CalendarIcon className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Calendrier des tirages</h2>
      </div>
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={(date) => date && onSelect(date)}
        locale={fr}
        showOutsideDays
        className="!w-full border rounded-md p-3"
        classNames={{
          day: 'w-9 h-9 m-0.5 p-0',
          cell: 'w-9 h-9 p-0 relative',
          day_selected: 'bg-blue-600 text-white hover:bg-blue-600',
          day_today: 'font-bold',
        }}
        components={{
          Day: ({ date, displayMonth }) => {
            if (!date || (displayMonth && date.getMonth() !== displayMonth.getMonth())) {
              return <div className="w-full h-full" />;
            }
            const draws = getDrawCountForDate(date);
            const isSelected = selectedDate && 
              date.getDate() === selectedDate.getDate() && 
              date.getMonth() === selectedDate.getMonth() && 
              date.getFullYear() === selectedDate.getFullYear();

            return (
              <button
                onClick={() => onSelect(date)}
                className={clsx(
                  'w-full h-full rounded-md transition-colors',
                  isSelected ? 'bg-blue-600' : draws > 0 ? 'hover:bg-blue-50' : 'hover:bg-gray-50',
                  isSelected ? 'text-white' : 'text-gray-900'
                )}
              >
                {renderDay(date, draws)}
              </button>
            );
          }
        }}
      />
    </div>
  );
}