import React from 'react';

interface FooterProps {
  onGoToAdmin: () => void;
}

const Footer: React.FC<FooterProps> = ({ onGoToAdmin }) => {
  return (
    <footer className="bg-white dark:bg-[#161B22] border-t border-gray-200 dark:border-[#30363d] mt-16">
      <div className="max-w-screen-xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; 2025 MindMesh Labs. All Rights Reserved.</p>
        <button onClick={onGoToAdmin} className="mt-2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
          Admin Panel
        </button>
      </div>
    </footer>
  );
};

export default Footer;