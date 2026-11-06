import { useState, useEffect } from 'react';
import Auth from './components/Auth';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import BMICalculator from './pages/BMICalculator';
import NutritionGuide from './pages/NutritionGuide';
import HealthVideos from './pages/HealthVideos';
import YogaExercise from './pages/YogaExercise';
import SymptomChecker from './pages/SymptomChecker';
import Consultation from './pages/Consultation';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import { getCurrentUser, initializeStore, User } from './store/authStore';

export function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeStore();
    const u = getCurrentUser();
    if (u) setUser(u);
    setLoading(false);
  }, []);

  const handleAuth = () => {
    const u = getCurrentUser();
    if (u) { setUser(u); setCurrentPage('dashboard'); }
  };

  const handleLogout = () => { setUser(null); setCurrentPage('dashboard'); };

  const handleUserUpdate = (updated: User) => { setUser(updated); };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-emerald-600 font-semibold">Loading HealthMate...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth onAuth={handleAuth} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard user={user} onPageChange={setCurrentPage} />;
      case 'bmi': return <BMICalculator />;
      case 'nutrition': return <NutritionGuide />;
      case 'videos': return <HealthVideos />;
      case 'yoga': return <YogaExercise />;
      case 'symptoms': return <SymptomChecker />;
      case 'consultation': return <Consultation user={user} />;
      case 'profile': return <Profile user={user} onUpdate={handleUserUpdate} />;
      case 'admin': return user.role === 'admin' ? <AdminDashboard /> : <Dashboard user={user} onPageChange={setCurrentPage} />;
      default: return <Dashboard user={user} onPageChange={setCurrentPage} />;
    }
  };

  return (
    <Layout user={user} currentPage={currentPage} onPageChange={setCurrentPage} onLogout={handleLogout}>
      {renderPage()}
    </Layout>
  );
}
