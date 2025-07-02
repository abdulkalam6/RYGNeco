import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-black via-purple-900 to-black">
      <Card className="w-full max-w-md shadow-2xl rounded-xl border border-purple-700 bg-black/50 backdrop-blur-md text-white">
        <CardHeader className="text-center space-y-4">
          {/* Anime Logo */}
          <div className="mx-auto w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-purple-600 animate-pulse-slow">
            <img
              src="/logo.jpeg"
              alt="TaskFlow Logo"
              className="object-cover w-full h-full"
            />
          </div>
          <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
            TaskFlow
          </CardTitle>
          <CardDescription className="text-purple-300 text-sm italic">
            Your anime-style productivity tracker 👾
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-center text-lg py-5 bg-black/70 border border-purple-500 rounded-full text-white placeholder-purple-400"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full py-5 text-lg font-semibold rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:brightness-110 text-white transition-all duration-300"
            >
              Start Tracking
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
