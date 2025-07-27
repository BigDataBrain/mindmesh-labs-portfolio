import React, { useState } from 'react';
import { api } from '../services/api';
import { MoonIcon, SunIcon } from '../components/Icons';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onGoToPublic: () => void;
  theme: string;
  toggleTheme: () => void;
}

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input
        {...props}
        className="bg-gray-100 dark:bg-[#010409] border border-gray-300 dark:border-[#30363d] text-gray-900 dark:text-gray-300 rounded-md block w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
);

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onGoToPublic, theme, toggleTheme }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    const { error: loginError } = await api.login(email, password);
    
    setIsLoading(false);
    if (loginError) {
      setError(loginError.message || 'Invalid login credentials. Please try again.');
    } else {
      // The onAuthStateChange listener in App.tsx will handle the view change
      onLoginSuccess();
    }
  };


  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-[#0D1117] ${theme}`}>
       <button 
          onClick={toggleTheme}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#161B22]"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
        </button>
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-[#161B22] rounded-lg shadow-lg border border-gray-200 dark:border-[#30363d]">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">MindMesh Labs</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Admin Panel Login</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
             <InputField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <InputField
                type="password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
       <button onClick={onGoToPublic} className="mt-6 text-sm text-gray-600 dark:text-gray-400 hover:underline">
        &larr; Back to Portfolio
      </button>
    </div>
  );
};

export default LoginPage;
