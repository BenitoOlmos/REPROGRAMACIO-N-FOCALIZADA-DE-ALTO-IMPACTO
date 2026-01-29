
import React, { useState, useEffect } from 'react';
import { User, UserRole, Phase, TestResult } from './types';
import Dashboard from './views/Dashboard';
import Login from './views/Login';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [results, setResults] = useState<TestResult[]>([]);
  const [daysElapsed, setDaysElapsed] = useState(0);

  useEffect(() => {
    if (user) {
      const regDate = new Date(user.registrationDate);
      const now = new Date();
      const diff = Math.floor((now.getTime() - regDate.getTime()) / (1000 * 60 * 60 * 24));
      setDaysElapsed(diff);
      
      // Si es un cliente, inicializar con datos demo de evolución
      if (user.role === UserRole.CLIENT) {
        setResults([
          {
            id: '1',
            userId: user.id,
            phase: Phase.ONBOARDING,
            score: 45,
            responses: {},
            createdAt: new Date(user.registrationDate)
          }
        ]);
      }
    } else {
      setResults([]);
      setDaysElapsed(0);
    }
  }, [user]);

  const handleLogin = (u: User) => setUser(u);
  const handleLogout = () => setUser(null);

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Dashboard 
        user={user} 
        daysElapsed={daysElapsed} 
        testResults={results}
        onAddTestResult={(res) => setResults(prev => [...prev, res])}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default App;
