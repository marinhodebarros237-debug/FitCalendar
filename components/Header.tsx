import React from 'react';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { DumbbellIcon } from './icons/DumbbellIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface HeaderProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  onGenerateClick: () => void;
}

const getWeekDateRange = (date: Date) => {
  const start = new Date(date);
  start.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)
  
  const end = new Date(start);
  end.setDate(start.getDate() + 6); // End of week (Saturday)

  const startDay = start.getDate();
  const startMonth = start.toLocaleString('pt-BR', { month: 'long' });
  const endDay = end.getDate();
  const endMonth = end.toLocaleString('pt-BR', { month: 'long' });

  if (startMonth === endMonth) {
    return `${startDay} - ${endDay} de ${startMonth}`;
  }
  return `${startDay} de ${startMonth} - ${endDay} de ${endMonth}`;
}

export const Header: React.FC<HeaderProps> = ({ currentDate, setCurrentDate, onGenerateClick }) => {
  const changeWeek = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (offset * 7));
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const weekDateRange = getWeekDateRange(currentDate);

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
      <div className="flex items-center space-x-2">
        <DumbbellIcon className="w-8 h-8 text-indigo-400" />
        <h1 className="text-2xl sm:text-3xl font-bold text-white capitalize">
          Fit<span className="text-indigo-400">Calendar</span>
        </h1>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={goToToday}
          className="px-4 py-2 text-sm font-medium text-gray-200 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
        >
          Hoje
        </button>
        <div className="flex items-center bg-gray-800 rounded-md">
            <button onClick={() => changeWeek(-1)} className="p-2 text-gray-400 hover:text-white transition-colors rounded-l-md hover:bg-gray-700">
                <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <span className="px-4 w-48 text-center text-sm font-semibold capitalize">{weekDateRange}</span>
            <button onClick={() => changeWeek(1)} className="p-2 text-gray-400 hover:text-white transition-colors rounded-r-md hover:bg-gray-700">
                <ChevronRightIcon className="w-5 h-5" />
            </button>
        </div>
      </div>
      <button
        onClick={onGenerateClick}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 transition-all"
      >
        <SparklesIcon className="w-5 h-5" />
        Gerar Treino com IA
      </button>
    </header>
  );
};