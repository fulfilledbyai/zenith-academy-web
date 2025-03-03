
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewsForm } from '@/components/admin/NewsForm';

const Admin = () => {
  // Simple authentication state - would be replaced with a proper auth system in production
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('adminAuth') === 'true');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Simple login handler - this would be replaced with a proper auth system in production
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check (this is just for demo purposes)
    // In a real application, this would use a proper authentication system
    if (password === 'admin123') {
      localStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rustyRed"
                  required
                />
              </div>
              {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
              <button
                type="submit"
                className="w-full bg-rustyRed text-white py-2 px-4 rounded-md hover:bg-rustyRed/90 transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Logout
          </button>
        </div>

        <Tabs defaultValue="news" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="news">News Management</TabsTrigger>
            {/* Additional tabs can be added here as the admin panel expands */}
          </TabsList>
          <TabsContent value="news" className="space-y-6">
            <NewsForm />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
