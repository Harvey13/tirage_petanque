import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';

interface HeaderProps {
  selectedDate: Date;
  onCalendarToggle: () => void;
}

export function Header({ selectedDate, onCalendarToggle }: HeaderProps) {
  return (
    <header className="bg-blue-600 text-white py-4 px-4 shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Tirages Pétanque</h1>
            <p className="mt-1 text-sm sm:text-base text-blue-100">
              {format(selectedDate, 'dd MMMM yyyy', { locale: fr })}
            </p>
          </div>
          <button
            onClick={onCalendarToggle}
            className="md:hidden p-2 hover:bg-blue-700 rounded-lg transition-colors"
            aria-label="Toggle Calendar"
          >
            <CalendarIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}