import React, { useState, useEffect } from 'react';
import { Calendar } from './components/Calendar';
import { DrawList } from './components/DrawList';
import { Header } from './components/Header';
import { Loader2 } from 'lucide-react';
import { getDrawsByDate } from './services/drawService';
import type { Draw } from './types';

export function App() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [draws, setDraws] = useState<Draw[]>([]);
  const [drawDates, setDrawDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileCalendarOpen, setIsMobileCalendarOpen] = useState(false);

  useEffect(() => {
    const fetchDraws = async () => {
      setLoading(true);
      try {
        const fetchedDraws = await getDrawsByDate(selectedDate);
        setDraws(fetchedDraws);
      } catch (error) {
        console.error('Error fetching draws:', error);
        // Use mock data as fallback
        setDraws([
          {
            id: '1',
            number: 1,
            time: '14:00',
            date: selectedDate.toISOString(),
            players: ['Jean', 'Pierre', 'Marie', 'Sophie', 'Michel', 'Paul'],
            isWinner: true
          },
          {
            id: '2',
            number: 2,
            time: '15:30',
            date: selectedDate.toISOString(),
            players: ['Claire', 'Anne', 'Louis', 'Marc', 'Julie', 'Thomas', 'Emma', 'Lucas'],
            isWinner: false
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDraws();
  }, [selectedDate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        selectedDate={selectedDate}
        onCalendarToggle={() => setIsMobileCalendarOpen(!isMobileCalendarOpen)}
      />

      <main className="max-w-7xl mx-auto py-4 px-4 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`md:col-span-1 ${
            isMobileCalendarOpen ? 'block' : 'hidden md:block'
          }`}>
            <Calendar
              selectedDate={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                setIsMobileCalendarOpen(false);
              }}
              drawDates={drawDates}
            />
          </div>
          <div className={`md:col-span-2 ${
            isMobileCalendarOpen ? 'hidden md:block' : 'block'
          }`}>
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : draws.length > 0 ? (
              <DrawList draws={draws} date={selectedDate} />
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <p className="text-gray-500">
                  Aucun tirage pour cette date
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}