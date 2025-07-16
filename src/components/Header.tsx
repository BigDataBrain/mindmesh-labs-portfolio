import React, { useState } from 'react';
import { RefreshIcon, MoonIcon, SunIcon, LogoutIcon, GlobeAltIcon } from './Icons';
import AboutMePopover from './AboutMePopover';

interface HeaderProps {
  onRefresh?: () => void;
  title?: string;
  subtitle?: string;
  aboutMe?: string;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  showLogout?: boolean;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onRefresh, 
  title, 
  subtitle,
  aboutMe,
  theme, 
  toggleTheme, 
  showLogout = false, 
  onLogout 
}) => {
  const [isPopoverVisible, setPopoverVisible] = useState(false);

  return (
    <header className="flex justify-between items-start">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        {onRefresh && (
          <button 
            onClick={onRefresh}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#161B22]"
            aria-label="Refresh data"
          >
            <RefreshIcon className="w-5 h-5" />
          </button>
        )}
        {aboutMe && (
          <div className="relative" onMouseEnter={() => setPopoverVisible(true)} onMouseLeave={() => setPopoverVisible(false)}>
            <button
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#161B22]"
              aria-label="About me"
            >
              <GlobeAltIcon className="w-5 h-5" />
            </button>
            <AboutMePopover isVisible={isPopoverVisible} text={aboutMe} />
          </div>
        )}
        <button 
          onClick={toggleTheme}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#161B22]"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
        </button>
        {showLogout && (
           <button 
            onClick={onLogout}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#161B22]"
            aria-label="Logout"
          >
            <LogoutIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;