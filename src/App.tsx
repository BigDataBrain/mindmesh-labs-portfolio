import React, { useState, useEffect } from 'react';
import PublicPortfolio from './pages/PublicPortfolio';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import { api } from './services/api';
import BootLoader from './components/BootLoader';
import NeuralBackground from './components/NeuralBackground';

type View = 'public' | 'login' | 'admin';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('public');
  const [isAuthenticated, setIsAuthenticated] = useState(api.isAuthenticated());
  const [theme, setTheme] = useState<'dark' | 'light'>(
    localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  );
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#010409';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f0f2f5';
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentView('admin');
  };

  const handleLogout = () => {
    api.logout();
    setIsAuthenticated(false);
    setCurrentView('public');
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };
  
  const renderView = () => {
    if (currentView === 'login') {
      return <LoginPage onLoginSuccess={handleLoginSuccess} onGoToPublic={() => setCurrentView('public')} theme={theme} toggleTheme={toggleTheme} />;
    }
    
    if (currentView === 'admin' && isAuthenticated) {
        return <AdminDashboard onLogout={handleLogout} onGoToPublic={() => setCurrentView('public')} theme={theme} toggleTheme={toggleTheme} />;
    }
    
    return <PublicPortfolio onGoToAdmin={() => setCurrentView('login')} theme={theme} toggleTheme={toggleTheme} />;
  }

  if (isBooting) {
    return <BootLoader onBootComplete={() => setIsBooting(false)} />;
  }

  return (
    <div className={theme}>
        <NeuralBackground theme={theme} />
        <div className="bg-transparent text-gray-800 dark:text-gray-200 min-h-screen">
             {renderView()}
        </div>
    </div>
  );
};

export default App;