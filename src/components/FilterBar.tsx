import React from 'react';
import { SearchIcon, ChevronDownIcon } from './Icons';

interface FilterBarProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  techFilter: string;
  onTechFilterChange: (value:string) => void;
  availableTechs: string[];
  sortBy: string;
  onSortByChange: (value: string) => void;
}

const CustomSelect: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  ariaLabel: string;
}> = ({ value, onChange, children, ariaLabel }) => (
  <div className="relative w-full">
    <select
      value={value}
      onChange={onChange}
      aria-label={ariaLabel}
      className="appearance-none w-full bg-white dark:bg-[#0D1117] border border-gray-300 dark:border-[#30363d] rounded-md px-4 py-2 text-sm text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#161B22] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
    >
      {children}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
      <ChevronDownIcon className="w-4 h-4" />
    </div>
  </div>
);

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchTermChange,
  techFilter,
  onTechFilterChange,
  availableTechs,
  sortBy,
  onSortByChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
      <div className="relative w-full md:max-w-xs">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by name or description..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="bg-gray-50 dark:bg-[#010409] border border-gray-300 dark:border-[#30363d] text-gray-900 dark:text-gray-300 rounded-md block w-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-2 md:gap-4 w-full md:w-auto">

        <CustomSelect value={techFilter} onChange={(e) => onTechFilterChange(e.target.value)} ariaLabel="Filter by technology">
          <option value="All">All Technologies</option>
          {availableTechs.map(tech => (
            <option key={tech} value={tech}>{tech}</option>
          ))}
        </CustomSelect>

        <CustomSelect value={sortBy} onChange={(e) => onSortByChange(e.target.value)} ariaLabel="Sort by">
          <option value="Most Recent">Most Recent</option>
          <option value="Complexity High to Low">Complexity High to Low</option>
          <option value="Complexity Low to High">Complexity Low to High</option>
        </CustomSelect>
      </div>
    </div>
  );
};

export default FilterBar;