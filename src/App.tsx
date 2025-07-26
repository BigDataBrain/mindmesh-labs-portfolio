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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setAuthLoading] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>(
    localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  );
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    // Theme setup
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#010409';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f0f2f5';
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  useEffect(() => {
    const checkSession = async () => {
        const session = await api.getSession();
        setIsAuthenticated(!!session);
        setAuthLoading(false);
    };
    checkSession();

    const { subscription } = api.onAuthStateChange((_event, session) => {
        setIsAuthenticated(!!session);
        if (_event === 'SIGNED_IN') {
             setCurrentView('admin');
        }
        if (_event === 'SIGNED_OUT') {
            setCurrentView('public');
        }
    });

    return () => {
        subscription.unsubscribe();
    };
}, []);

  const handleLoginSuccess = () => {
    // onAuthStateChange will handle setting authenticated state and view
  };

  const handleLogout = async () => {
    await api.logout();
    // onAuthStateChange will handle setting authenticated state and view
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

  if (isBooting || isAuthLoading) {
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
