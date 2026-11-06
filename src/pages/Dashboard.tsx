import { Heart, Activity, Stethoscope, Video, TrendingUp, Calendar, Award, AlertTriangle } from 'lucide-react';
import { User } from '../store/authStore';

interface DashboardProps { user: User; onPageChange: (page: string) => void; }

export default function Dashboard({ user, onPageChange }: DashboardProps) {
  const bmi = user.weight && user.height ? (user.weight / ((user.height / 100) ** 2)).toFixed(1) : null;
  const getBmiStatus = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (bmi < 25) return { label: 'Normal', color: 'text-green-600', bg: 'bg-green-50' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { label: 'Obese', color: 'text-red-600', bg: 'bg-red-50' };
  };
  const bmiStatus = bmi ? getBmiStatus(parseFloat(bmi)) : null;

  const quickActions = [
    { id: 'bmi', label: 'BMI Calculator', icon: Activity, color: 'from-blue-500 to-blue-600', desc: 'Check your BMI & weight status' },
    { id: 'nutrition', label: 'Health Tips', icon: Heart, color: 'from-emerald-500 to-teal-600', desc: 'Nutrition guide & meal plans' },
    { id: 'videos', label: 'Food Videos', icon: Video, color: 'from-orange-500 to-red-500', desc: 'Healthy food preparation' },
    { id: 'symptoms', label: 'Symptom Checker', icon: Stethoscope, color: 'from-pink-500 to-rose-500', desc: 'Check symptoms & get cures' },
    { id: 'consultation', label: 'Doctor Consultation', icon: Calendar, color: 'from-purple-500 to-indigo-600', desc: 'Book online consultation' },
  ];

  const healthTips = [
    '💧 Drink at least 8 glasses of water daily',
    '🚶 Walk 10,000 steps every day for better cardiovascular health',
    '🥗 Include 5 servings of fruits and vegetables in your diet',
    '😴 Get 7-9 hours of quality sleep for optimal health',
    '🧘 Practice 10 minutes of mindfulness or meditation daily',
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-40 h-40 bg-white/5 rounded-full -translate-y-10 translate-x-10" />
        <div className="absolute right-20 bottom-0 w-24 h-24 bg-white/5 rounded-full translate-y-8" />
        <div className="relative">
          <p className="text-emerald-100 text-sm font-medium mb-1">
            Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'} 👋
          </p>
          <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
          <p className="text-emerald-100 text-sm">Your health journey continues today. Stay consistent!</p>
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <div className="bg-white/15 rounded-xl px-3 py-2 backdrop-blur-sm">
              <p className="text-xs text-emerald-100">Member Since</p>
              <p className="text-sm font-semibold">{user.joinedDate}</p>
            </div>
            {user.age && <div className="bg-white/15 rounded-xl px-3 py-2 backdrop-blur-sm">
              <p className="text-xs text-emerald-100">Age</p>
              <p className="text-sm font-semibold">{user.age} years</p>
            </div>}
            {user.gender && <div className="bg-white/15 rounded-xl px-3 py-2 backdrop-blur-sm">
              <p className="text-xs text-emerald-100">Gender</p>
              <p className="text-sm font-semibold">{user.gender}</p>
            </div>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'BMI Score', value: bmi || '--', sub: bmiStatus?.label || 'Update profile', icon: Activity, color: 'emerald' },
          { label: 'Reports', value: String(user.reports?.length || 0), sub: 'Health reports', icon: TrendingUp, color: 'blue' },
          { label: 'Consultations', value: String(user.consultations?.length || 0), sub: 'Doctor visits', icon: Video, color: 'purple' },
          { label: 'Health Score', value: '82', sub: 'Out of 100', icon: Award, color: 'orange' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          const colors: Record<string, string> = { emerald: 'bg-emerald-50 text-emerald-600', blue: 'bg-blue-50 text-blue-600', purple: 'bg-purple-50 text-purple-600', orange: 'bg-orange-50 text-orange-600' };
          return (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className={`inline-flex p-2 rounded-xl mb-3 ${colors[stat.color]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              <p className={`text-xs font-medium mt-1 ${bmiStatus && stat.label === 'BMI Score' ? bmiStatus.color : 'text-gray-400'}`}>{stat.sub}</p>
            </div>
          );
        })}
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map(action => {
            const Icon = action.icon;
            return (
              <button key={action.id} onClick={() => onPageChange(action.id)}
                className={`bg-gradient-to-br ${action.color} p-5 rounded-2xl text-white text-left hover:scale-105 transition-all shadow-lg`}>
                <Icon className="w-7 h-7 mb-3 opacity-90" />
                <p className="font-semibold text-sm">{action.label}</p>
                <p className="text-xs opacity-80 mt-1">{action.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-amber-50 rounded-xl"><Award className="w-5 h-5 text-amber-600" /></div>
            <h3 className="font-bold text-gray-800">Daily Health Tips</h3>
          </div>
          <div className="space-y-3">
            {healthTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="text-base">{tip.split(' ')[0]}</span>
                <p className="text-sm text-gray-600 flex-1">{tip.split(' ').slice(1).join(' ')}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-purple-50 rounded-xl"><Calendar className="w-5 h-5 text-purple-600" /></div>
              <h3 className="font-bold text-gray-800">Recent Consultations</h3>
            </div>
            {user.consultations && user.consultations.length > 0 ? (
              <div className="space-y-3">
                {user.consultations.slice(-2).map((c, i) => (
                  <div key={i} className="p-3 bg-purple-50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-800">{c.doctor || 'Pending Doctor'}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.status === 'completed' ? 'bg-green-100 text-green-700' : c.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                        {c.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{c.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <Video className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400">No consultations yet</p>
                <button onClick={() => onPageChange('consultation')} className="mt-2 text-xs text-purple-600 font-medium hover:underline">Book Now</button>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-5 border border-orange-100">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-orange-800 mb-1">Health Reminder</p>
                <p className="text-xs text-orange-600">Don't forget your annual health checkup! Regular screenings can detect issues early.</p>
                <button onClick={() => onPageChange('consultation')} className="mt-2 text-xs font-semibold text-orange-700 underline">Schedule Checkup</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
