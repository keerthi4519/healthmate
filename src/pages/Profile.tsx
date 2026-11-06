import { useState } from 'react';
import { User, Edit3, Save, FileText, Video, Activity, Calendar, CheckCircle } from 'lucide-react';
import { User as UserType, updateUser } from '../store/authStore';

interface ProfileProps { user: UserType; onUpdate: (u: UserType) => void; }

export default function Profile({ user, onUpdate }: ProfileProps) {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: user.name, age: String(user.age || ''), gender: user.gender || 'Male',
    weight: String(user.weight || ''), height: String(user.height || ''),
  });

  const handleSave = () => {
    const updated: UserType = {
      ...user,
      name: form.name,
      age: parseInt(form.age) || user.age,
      gender: form.gender,
      weight: parseFloat(form.weight) || user.weight,
      height: parseFloat(form.height) || user.height,
    };
    updateUser(updated);
    onUpdate(updated);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const bmi = user.weight && user.height ? (user.weight / ((user.height / 100) ** 2)).toFixed(1) : '--';

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {saved && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Profile updated successfully!</span>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
              <span className={`inline-flex mt-2 text-xs px-3 py-1 rounded-full font-medium ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'}`}>
                {user.role === 'admin' ? '⚙️ Administrator' : '🩺 Patient'}
              </span>
            </div>
            <div className="mt-6 space-y-3">
              {[
                { label: 'Member Since', value: user.joinedDate, icon: Calendar },
                { label: 'BMI', value: bmi, icon: Activity },
                { label: 'Reports', value: String(user.reports?.length || 0), icon: FileText },
                { label: 'Consultations', value: String(user.consultations?.length || 0), icon: Video },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500">{item.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{item.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-800">Personal Information</h3>
              {!editing ? (
                <button onClick={() => setEditing(true)} className="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl">
                  <Edit3 className="w-4 h-4" />Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => setEditing(false)} className="text-sm font-medium text-gray-500 px-3 py-2 rounded-xl hover:bg-gray-100">Cancel</button>
                  <button onClick={handleSave} className="flex items-center gap-2 text-sm font-medium text-white bg-emerald-600 px-4 py-2 rounded-xl hover:bg-emerald-700">
                    <Save className="w-4 h-4" />Save
                  </button>
                </div>
              )}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your name' },
                { label: 'Age (years)', key: 'age', type: 'number', placeholder: '25' },
                { label: 'Weight (kg)', key: 'weight', type: 'number', placeholder: '70' },
                { label: 'Height (cm)', key: 'height', type: 'number', placeholder: '170' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                  {editing ? (
                    <input type={field.type} value={form[field.key as keyof typeof form]}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                      placeholder={field.placeholder} />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-700">
                      {form[field.key as keyof typeof form] || '—'}
                    </div>
                  )}
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender</label>
                {editing ? (
                  <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white">
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-700">{form.gender || '—'}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <div className="px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-400">{user.email}</div>
              </div>
            </div>
          </div>

          {/* Reports */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-gray-800">Health Reports</h3>
            </div>
            {user.reports && user.reports.length > 0 ? (
              <div className="space-y-3">
                {user.reports.map((r, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{r.name}</p>
                        <p className="text-xs text-gray-500">{r.type} • {r.date}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${r.status === 'normal' ? 'bg-green-100 text-green-700' : r.status === 'abnormal' ? 'bg-red-100 text-red-700' : r.status === 'reviewed' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <FileText className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                <p className="text-sm text-gray-400">No reports uploaded yet</p>
              </div>
            )}
          </div>

          {/* Consultations */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Video className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-gray-800">Consultation History</h3>
            </div>
            {user.consultations && user.consultations.length > 0 ? (
              <div className="space-y-3">
                {user.consultations.map((c, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-purple-500" />
                        <span className="text-sm font-semibold text-gray-800">{c.doctor || 'Awaiting Doctor'}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${c.status === 'completed' ? 'bg-green-100 text-green-700' : c.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                        {c.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1"><span className="font-medium">Symptoms:</span> {c.symptoms}</p>
                    <p className="text-xs text-gray-500">Date: {c.date} • Duration: {c.duration}</p>
                    {c.prescription && <p className="text-xs text-green-700 mt-2 bg-green-50 p-2 rounded-lg"><span className="font-medium">Prescription:</span> {c.prescription}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Video className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                <p className="text-sm text-gray-400">No consultations yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
