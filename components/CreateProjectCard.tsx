import React from 'react';
import { PlusIcon } from './Icons';

interface CreateProjectCardProps {
    onClick: () => void;
}

const CreateProjectCard: React.FC<CreateProjectCardProps> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="h-full min-h-[420px] w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-[#30363d] rounded-lg hover:bg-gray-100 dark:hover:bg-[#161B22] hover:border-blue-500 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent group"
    >
      <div className="flex items-center justify-center w-14 h-14 bg-gray-200 dark:bg-[#21262d] rounded-full mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20">
        <PlusIcon className="w-7 h-7 text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Create New Project</h3>
      <p className="mt-1 text-sm text-center text-gray-500 dark:text-gray-400 max-w-xs">
        Add a new project to your portfolio to showcase your work.
      </p>
    </button>
  );
};

export default CreateProjectCard;
