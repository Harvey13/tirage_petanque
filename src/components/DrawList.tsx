import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Trophy, Hash, Users } from 'lucide-react';
import type { Draw } from '../types';
import { clsx } from 'clsx';

interface DrawListProps {
  draws: Draw[];
  date: Date;
}

export function DrawList({ draws, date }: DrawListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Tirages du {format(date, 'dd MMMM', { locale: fr })}
          </h2>
        </div>
        <span className="text-sm text-gray-500">
          {draws.length} {draws.length > 1 ? 'tirages' : 'tirage'}
        </span>
      </div>

      <div className="grid gap-4">
        {draws.map((draw) => (
          <div
            key={draw.id}
            className={clsx(
              'bg-white rounded-lg shadow-sm border overflow-hidden',
              draw.isWinner ? 'border-green-200' : 'border-gray-200'
            )}
          >
            <div className="border-b bg-gray-50 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">
                  Tirage #{draw.number}
                </span>
                {draw.isWinner && (
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-sm">
                    <Trophy className="w-4 h-4" />
                    <span className="font-medium">Gagnant</span>
                  </div>
                )}
              </div>
              <time className="text-sm text-gray-500 tabular-nums">
                {draw.time}
              </time>
            </div>
            
            <div className="divide-y divide-gray-100">
              {draw.players.map((player, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-sm font-medium shrink-0">
                      {index + 1}
                    </span>
                    <span className="font-medium text-gray-900 truncate">
                      {player}
                    </span>
                  </div>
                  <div className="ml-auto text-sm text-gray-500 shrink-0">
                    N°{draw.number}
                  </div>
                </div>
              ))}
              
              {[...Array(Math.max(0, 8 - draw.players.length))].map((_, index) => (
                <div 
                  key={`empty-${index}`}
                  className="flex items-center gap-3 px-4 py-2.5 bg-gray-50"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-400 text-sm font-medium shrink-0">
                      {draw.players.length + index + 1}
                    </span>
                    <span className="text-gray-400 italic">
                      Place disponible
                    </span>
                  </div>
                  <div className="ml-auto text-sm text-gray-400 shrink-0">
                    N°{draw.number}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}