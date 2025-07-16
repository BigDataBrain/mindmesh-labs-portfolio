import React from 'react';

interface AboutMePopoverProps {
  isVisible: boolean;
  text: string;
}

const AboutMePopover: React.FC<AboutMePopoverProps> = ({ isVisible, text }) => {
  if (!isVisible) return null;

  return (
    <div 
      className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-[#161B22] border border-gray-200 dark:border-[#30363d] rounded-lg shadow-lg z-50 p-4"
      role="tooltip"
    >
      <p className="text-sm text-gray-700 dark:text-gray-300">
        {text}
      </p>
    </div>
  );
};

export default AboutMePopover;