
import { useState, useEffect } from 'react';
import Login from '@/components/Login';
import TaskDashboard from '@/components/TaskDashboard';

const Index = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('taskTrackerUser');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogin = (username: string) => {
    localStorage.setItem('taskTrackerUser', username);
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('taskTrackerUser');
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <TaskDashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
