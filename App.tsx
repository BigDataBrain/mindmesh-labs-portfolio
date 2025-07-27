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
    setAuthLoading(true);
    const checkSession = async () => {
        const session = await api.getSession();
        const loggedIn = !!session;
        setIsAuthenticated(loggedIn);
        // If logged in, default to admin view, otherwise public
        setCurrentView(loggedIn ? 'admin' : 'public');
        setAuthLoading(false);
    };
    checkSession();

    const { subscription } = api.onAuthStateChange((_event, session) => {
        const loggedIn = !!session;
        setIsAuthenticated(loggedIn);
        if (_event === 'SIGNED_IN') {
             setCurrentView('admin');
        } else if (_event === 'SIGNED_OUT') {
            setCurrentView('public');
        }
    });

    return () => {
        subscription.unsubscribe();
    };
  }, []);


  const handleLogout = async () => {
    await api.logout();
    // onAuthStateChange listener will handle setting view to public
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const goToAdminArea = () => {
      if (isAuthenticated) {
          setCurrentView('admin');
      } else {
          setCurrentView('login');
      }
  };
  
  const renderView = () => {
    // If we're booting or still checking auth, show the loader
    if (isBooting || isAuthLoading) {
        return <BootLoader onBootComplete={() => setIsBooting(false)} />;
    }

    if (currentView === 'login') {
      return <LoginPage onLoginSuccess={() => setCurrentView('admin')} onGoToPublic={() => setCurrentView('public')} theme={theme} toggleTheme={toggleTheme} />;
    }
    
    if (currentView === 'admin' && isAuthenticated) {
        return <AdminDashboard onLogout={handleLogout} onGoToPublic={() => setCurrentView('public')} theme={theme} toggleTheme={toggleTheme} />;
    }
    
    // Default to PublicPortfolio, which is also the view for logged-out users.
    return <PublicPortfolio onGoToAdmin={goToAdminArea} theme={theme} toggleTheme={toggleTheme} />;
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
