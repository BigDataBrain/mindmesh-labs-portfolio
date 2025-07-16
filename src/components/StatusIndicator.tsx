import React from 'react';

interface StatusIndicatorProps {
  isActive: boolean;
  onToggle: () => void;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ isActive, onToggle }) => {
  const uniqueId = React.useId();
  return (
    <div className="flex items-center space-x-3">
       <label htmlFor={`status-toggle-${uniqueId}`} className="flex items-center cursor-pointer">
            <div className="relative">
                <input
                    type="checkbox"
                    id={`status-toggle-${uniqueId}`}
                    className="sr-only"
                    checked={isActive}
                    onChange={onToggle}
                />
                <div className={`block w-12 h-7 rounded-full transition-colors ${isActive ? 'bg-blue-600' : 'bg-gray-300 dark:bg-[#21262d]'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${isActive ? 'translate-x-full' : ''}`}></div>
            </div>
        </label>
      <span className="text-sm font-medium text-gray-800 dark:text-gray-300">{isActive ? 'Active' : 'Inactive'}</span>
    </div>
  );
};

export default StatusIndicator;