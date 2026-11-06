import { useState, useEffect } from 'react';
import { Users, FileText, Video, Activity, Edit3, Trash2, Plus, Search, Save, X, BarChart2, TrendingUp, CheckCircle, Eye } from 'lucide-react';
import { getAllUsers, saveUsers, User, Consultation } from '../store/authStore';
import { getSymptoms, addSymptom, updateSymptom, deleteSymptom, NewSymptom, getHospitals, addHospital, updateHospital, deleteHospital, HospitalItem, getVideos, addVideo, updateVideo, deleteVideo, VideoCategory, VideoItem } from '../store/contentStore';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'patients' | 'consultations' | 'symptoms' | 'hospitals' | 'videos'>('overview');
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUserForm, setNewUserForm] = useState({ name: '', email: '', age: '', gender: 'Male', role: 'patient' as 'patient' | 'admin' });
  const [notification, setNotification] = useState('');
  const [viewingConsultation, setViewingConsultation] = useState<(Consultation & { patientEmail: string }) | null>(null);

  // Symptoms content managed via contentStore so admin can add/edit/delete
  const [symptoms, setSymptoms] = useState<NewSymptom[]>(getSymptoms() as unknown as NewSymptom[]);
  const [editingSymptomIndex, setEditingSymptomIndex] = useState<number | null>(null);
  const [symptomModalOpen, setSymptomModalOpen] = useState(false);
  const [symptomForm, setSymptomForm] = useState<{
    symptom: string;
    severity: string;
    suggestedSpecialty: string;
    possibleConditions: string;
    homeRemedies: string;
    ayurvedicRemedies: string;
  }>({
    symptom: '',
    severity: 'mild',
    suggestedSpecialty: '',
    possibleConditions: '',
    homeRemedies: '',
    ayurvedicRemedies: '',
  });

  useEffect(() => { setUsers(getAllUsers()); }, []);

  const showNotif = (msg: string) => { setNotification(msg); setTimeout(() => setNotification(''), 3000); };

  const patients = users.filter(u => u.role === 'patient');
  const allConsultations: (Consultation & { patientEmail: string })[] = patients.flatMap(u =>
    (u.consultations || []).map(c => ({ ...c, patientEmail: u.email }))
  );
  const allReports = patients.flatMap(u => (u.reports || []).map(r => ({ ...r, patientName: u.name })));

  const deleteUser = (id: string) => {
    const updated = users.filter(u => u.id !== id);
    saveUsers(updated); setUsers(updated); showNotif('User deleted successfully');
  };

  const saveUser = (user: User) => {
    const updated = users.map(u => u.id === user.id ? user : u);
    saveUsers(updated); setUsers(updated); setEditingUser(null); showNotif('User updated successfully');
  };

  const addUser = () => {
    const newU: User = {
      id: `patient-${Date.now()}`, name: newUserForm.name, email: newUserForm.email,
      role: newUserForm.role, age: parseInt(newUserForm.age) || 0, gender: newUserForm.gender,
      joinedDate: new Date().toISOString().split('T')[0], reports: [], consultations: []
    };
    const updated = [...users, newU];
    saveUsers(updated); setUsers(updated); setShowAddUser(false);
    setNewUserForm({ name: '', email: '', age: '', gender: 'Male', role: 'patient' });
    showNotif('User added successfully');
  };

  const updateConsultationStatus = (userId: string, cId: string, status: Consultation['status']) => {
    const updated = users.map(u => {
      if (u.id === userId) {
        return { ...u, consultations: (u.consultations || []).map(c => c.id === cId ? { ...c, status } : c) };
      }
      return u;
    });
    saveUsers(updated); setUsers(updated); showNotif('Consultation status updated');
  };

  const filteredPatients = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase()));

  const stats = [
    { label: 'Total Patients', value: patients.length, icon: Users, color: 'blue', change: '+12%' },
    { label: 'Consultations', value: allConsultations.length, icon: Video, color: 'purple', change: '+8%' },
    { label: 'Health Reports', value: allReports.length, icon: FileText, color: 'green', change: '+15%' },
    { label: 'Active Today', value: Math.floor(patients.length * 0.6), icon: Activity, color: 'orange', change: '+3%' },
  ];

  const colorMap: Record<string, string> = { blue: 'bg-blue-50 text-blue-600', purple: 'bg-purple-50 text-purple-600', green: 'bg-green-50 text-green-600', orange: 'bg-orange-50 text-orange-600' };

  // Hospitals state managed via contentStore
  const [hospitalsState, setHospitalsState] = useState<HospitalItem[]>(getHospitals());
  const [hospitalModalOpen, setHospitalModalOpen] = useState(false);
  const [editingHospitalIndex, setEditingHospitalIndex] = useState<number | null>(null);
  const [hospitalForm, setHospitalForm] = useState<HospitalItem>({
    name: '',
    location: '',
    specialty: '',
    rating: 4.5,
    type: 'Private',
    phone: '',
    emergency: true,
  });

  // Videos state managed via contentStore
  const [videosState, setVideosState] = useState(getVideos());
  const [activeVideoCategory, setActiveVideoCategory] = useState<VideoCategory>('healthyFood');
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [editingVideoIndex, setEditingVideoIndex] = useState<number | null>(null);
  const [videoForm, setVideoForm] = useState<VideoItem>({
    id: '',
    title: '',
    channel: '',
    duration: '',
    level: 'Easy',
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {notification && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3">
          <CheckCircle className="w-5 h-5" /><span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-1">
          <BarChart2 className="w-6 h-6" />
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
        </div>
        <p className="text-slate-400 text-sm">Monitor and manage all HealthMate services</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 flex gap-1 overflow-x-auto">
        {[
          { id: 'overview', label: '📊 Overview' },
          { id: 'patients', label: '👥 Patients' },
          { id: 'consultations', label: '🩺 Consultations' },
          { id: 'symptoms', label: '💊 Symptoms DB' },
          { id: 'hospitals', label: '🏥 Hospitals' },
          { id: 'videos', label: '📹 Videos' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-slate-800 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className={`inline-flex p-2 rounded-xl mb-3 ${colorMap[s.color]}`}><Icon className="w-5 h-5" /></div>
                  <p className="text-2xl font-bold text-gray-800">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                  <p className="text-xs text-green-600 font-medium mt-1"><TrendingUp className="inline w-3 h-3 mr-1" />{s.change} this month</p>
                </div>
              );
            })}
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">Recent Consultations</h3>
              {allConsultations.length > 0 ? allConsultations.slice(-5).map((c, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div><p className="text-sm font-medium text-gray-800">{c.patientName}</p>
                    <p className="text-xs text-gray-400">{c.symptoms.substring(0, 40)}...</p></div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${c.status === 'completed' ? 'bg-green-100 text-green-700' : c.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>{c.status}</span>
                </div>
              )) : <p className="text-sm text-gray-400 text-center py-4">No consultations yet</p>}
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">Recent Reports</h3>
              {allReports.length > 0 ? allReports.slice(-5).map((r, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div><p className="text-sm font-medium text-gray-800">{r.name}</p>
                    <p className="text-xs text-gray-400">{(r as { patientName?: string }).patientName} • {r.date}</p></div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${r.status === 'normal' ? 'bg-green-100 text-green-700' : r.status === 'abnormal' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{r.status}</span>
                </div>
              )) : <p className="text-sm text-gray-400 text-center py-4">No reports yet</p>}
            </div>
          </div>
        </div>
      )}

      {/* Patients */}
      {activeTab === 'patients' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search patients..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm" />
            </div>
            <button onClick={() => setShowAddUser(true)} className="flex items-center gap-2 bg-slate-800 text-white px-4 py-3 rounded-xl text-sm font-medium hover:bg-slate-700">
              <Plus className="w-4 h-4" />Add Patient
            </button>
          </div>

          {showAddUser && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">Add New Patient</h3>
                <button onClick={() => setShowAddUser(false)}><X className="w-5 h-5 text-gray-400" /></button>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <input value={newUserForm.name} onChange={e => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  placeholder="Full Name" className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-500" />
                <input value={newUserForm.email} onChange={e => setNewUserForm({ ...newUserForm, email: e.target.value })}
                  placeholder="Email" className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-500" />
                <input type="number" value={newUserForm.age} onChange={e => setNewUserForm({ ...newUserForm, age: e.target.value })}
                  placeholder="Age" className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-500" />
                <select value={newUserForm.gender} onChange={e => setNewUserForm({ ...newUserForm, gender: e.target.value })}
                  className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none bg-white">
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
                <button onClick={addUser} className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-700 col-span-full sm:col-span-1">
                  Add Patient
                </button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {['Patient', 'Age/Gender', 'BMI', 'Reports', 'Consultations', 'Joined', 'Actions'].map(h => (
                      <th key={h} className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((p, i) => {
                    const bmi = p.weight && p.height ? (p.weight / ((p.height / 100) ** 2)).toFixed(1) : '--';
                    return (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                              {p.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{p.name}</p>
                              <p className="text-xs text-gray-400">{p.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-gray-600">{p.age || '--'} / {p.gender || '--'}</td>
                        <td className="p-4"><span className={`px-2 py-1 rounded-lg text-xs font-medium ${parseFloat(bmi) < 18.5 ? 'bg-blue-100 text-blue-700' : parseFloat(bmi) < 25 ? 'bg-green-100 text-green-700' : parseFloat(bmi) < 30 ? 'bg-yellow-100 text-yellow-700' : bmi === '--' ? 'bg-gray-100 text-gray-500' : 'bg-red-100 text-red-700'}`}>{bmi}</span></td>
                        <td className="p-4 text-gray-600">{p.reports?.length || 0}</td>
                        <td className="p-4 text-gray-600">{p.consultations?.length || 0}</td>
                        <td className="p-4 text-gray-500 text-xs">{p.joinedDate}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => setEditingUser(p)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit3 className="w-4 h-4" /></button>
                            <button onClick={() => deleteUser(p.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {editingUser && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800">Edit Patient: {editingUser.name}</h3>
                  <button onClick={() => setEditingUser(null)}><X className="w-5 h-5 text-gray-400" /></button>
                </div>
                <div className="space-y-3">
                  {[{ l: 'Name', k: 'name' }, { l: 'Email', k: 'email' }].map(f => (
                    <div key={f.k}>
                      <label className="block text-xs font-medium text-gray-600 mb-1">{f.l}</label>
                      <input value={editingUser[f.k as keyof User] as string || ''}
                        onChange={e => setEditingUser({ ...editingUser, [f.k]: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-500" />
                    </div>
                  ))}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Age</label>
                      <input type="number" value={editingUser.age || ''}
                        onChange={e => setEditingUser({ ...editingUser, age: parseInt(e.target.value) })}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Gender</label>
                      <select value={editingUser.gender || ''} onChange={e => setEditingUser({ ...editingUser, gender: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none bg-white">
                        <option>Male</option><option>Female</option><option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={() => setEditingUser(null)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm">Cancel</button>
                    <button onClick={() => saveUser(editingUser)} className="flex-1 bg-slate-800 text-white py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
                      <Save className="w-4 h-4" />Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Consultations */}
      {activeTab === 'consultations' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">All Consultations ({allConsultations.length})</h3>
          </div>
          {allConsultations.length === 0 ? (
            <div className="p-10 text-center"><Video className="w-10 h-10 text-gray-200 mx-auto mb-3" /><p className="text-gray-400">No consultations yet</p></div>
          ) : (
            <div className="divide-y divide-gray-50">
              {allConsultations.map((c, i) => {
                const patient = patients.find(p => p.email === c.patientEmail);
                return (
                  <div key={i} className="p-5 hover:bg-gray-50/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-800">{c.patientName}</span>
                          <span className="text-xs text-gray-400">{c.age}y/{c.gender}</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{c.symptoms}</p>
                        <p className="text-xs text-gray-400">Duration: {c.duration} • Date: {c.date}</p>
                        {c.prescription && <p className="text-xs text-green-700 mt-1">Rx: {c.prescription}</p>}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setViewingConsultation(c)}
                          className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg mr-1"
                          title="View Report"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <select value={c.status}
                          onChange={e => patient && updateConsultationStatus(patient.id, c.id, e.target.value as Consultation['status'])}
                          className={`text-xs px-3 py-1.5 rounded-lg border-0 font-medium focus:outline-none ${c.status === 'completed' ? 'bg-green-100 text-green-700' : c.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {viewingConsultation && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Consultation Report</h3>
                  <button onClick={() => setViewingConsultation(null)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Patient Info */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">Patient Details</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="text-gray-500">Name:</span> <p className="font-medium text-gray-800">{viewingConsultation.patientName}</p></div>
                      <div><span className="text-gray-500">Email:</span> <p className="font-medium text-gray-800">{viewingConsultation.patientEmail}</p></div>
                      <div><span className="text-gray-500">Age:</span> <p className="font-medium text-gray-800">{viewingConsultation.age}</p></div>
                      <div><span className="text-gray-500">Gender:</span> <p className="font-medium text-gray-800">{viewingConsultation.gender}</p></div>
                      <div><span className="text-gray-500">Consultation Date:</span> <p className="font-medium text-gray-800">{viewingConsultation.date}</p></div>
                      <div><span className="text-gray-500">Status:</span> 
                        <p className="mt-1">
                          <span className={`text-xs px-2 py-1 rounded-md font-medium ${viewingConsultation.status === 'completed' ? 'bg-green-100 text-green-700' : viewingConsultation.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                            {viewingConsultation.status.toUpperCase()}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Medical Info */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">Medical Information</h4>
                    <div className="space-y-3 text-sm">
                      <div><span className="text-gray-500 block mb-1">Symptoms:</span> <p className="font-medium text-gray-800 bg-white p-2 rounded-lg border border-gray-100">{viewingConsultation.symptoms}</p></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div><span className="text-gray-500">Duration:</span> <p className="font-medium text-gray-800">{viewingConsultation.duration}</p></div>
                      </div>
                      {viewingConsultation.prescription && (
                        <div><span className="text-gray-500 block mb-1">Doctor's Prescription / Notes:</span> <p className="font-medium text-gray-800 bg-green-50 text-green-800 p-2 rounded-lg border border-green-100">{viewingConsultation.prescription}</p></div>
                      )}
                      
                      {/* Attached Files & Video */}
                      {(viewingConsultation.uploadedFiles || viewingConsultation.videoUrl) && (
                        <div className="mt-4 pt-3 border-t border-gray-200">
                          <h5 className="font-semibold text-gray-700 mb-2">Patient Attachments</h5>
                          
                          {viewingConsultation.uploadedFiles && viewingConsultation.uploadedFiles.length > 0 && (
                            <div className="mb-3">
                              <span className="text-xs text-gray-500 block mb-1">Uploaded Documents:</span>
                              <ul className="space-y-1">
                                {viewingConsultation.uploadedFiles.map((file, i) => (
                                  <li key={i} className="flex items-center gap-2 text-sm text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                                    <FileText className="w-4 h-4" /> {file}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {viewingConsultation.videoUrl && (
                            <div>
                              <span className="text-xs text-gray-500 block mb-1">Recorded Video Preview:</span>
                              <video src={viewingConsultation.videoUrl} controls className="w-full max-w-sm rounded-lg border border-gray-200" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button onClick={() => setViewingConsultation(null)} className="px-5 py-2 bg-slate-800 text-white rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors">
                    Close Report
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Symptoms DB */}
      {activeTab === 'symptoms' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-800">Symptoms Database ({symptoms.length} entries)</h3>
            <button
              className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-medium"
              onClick={() => {
                setEditingSymptomIndex(null);
                setSymptomForm({
                  symptom: '',
                  severity: 'mild',
                  suggestedSpecialty: '',
                  possibleConditions: '',
                  homeRemedies: '',
                  ayurvedicRemedies: '',
                });
                setSymptomModalOpen(true);
              }}
            >
              <Plus className="w-4 h-4" />Add Symptom
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {symptoms.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-800">{s.symptom}</h4>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        s.severity === 'mild'
                          ? 'bg-green-100 text-green-700'
                          : s.severity === 'moderate'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {s.severity}
                    </span>
                    <button
                      className="p-1 text-blue-500 hover:bg-blue-50 rounded"
                      onClick={() => {
                        setEditingSymptomIndex(i);
                        setSymptomForm({
                          symptom: s.symptom,
                          severity: s.severity,
                          suggestedSpecialty: s.suggestedSpecialty,
                          possibleConditions: s.possibleConditions.join(', '),
                          homeRemedies: s.homeRemedies.join('; '),
                          ayurvedicRemedies: s.ayurvedicRemedies.join('; '),
                        });
                        setSymptomModalOpen(true);
                      }}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                      onClick={() => {
                        deleteSymptom(i);
                        setSymptoms(symptoms.filter((_, index) => index !== i));
                        showNotif('Symptom removed');
                      }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-2">
                  <span className="font-medium">Conditions:</span> {s.possibleConditions.join(', ')}
                </p>
                <p className="text-xs text-gray-500">
                  <span className="font-medium">Specialty:</span> {s.suggestedSpecialty}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {s.homeRemedies.length} home remedies • {s.ayurvedicRemedies.length} ayurvedic remedies
                </p>
              </div>
            ))}
          </div>

          {symptomModalOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-xl shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800">
                    {editingSymptomIndex === null ? 'Add Symptom' : 'Edit Symptom'}
                  </h3>
                  <button onClick={() => setSymptomModalOpen(false)}>
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Symptom Name</label>
                    <input
                      value={symptomForm.symptom}
                      onChange={(e) => setSymptomForm({ ...symptomForm, symptom: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Severity</label>
                      <select
                        value={symptomForm.severity}
                        onChange={(e) =>
                          setSymptomForm({
                            ...symptomForm,
                            severity: e.target.value as 'mild' | 'moderate' | 'severe',
                          })
                        }
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none bg-white"
                      >
                        <option value="mild">Mild</option>
                        <option value="moderate">Moderate</option>
                        <option value="severe">Severe</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Suggested Specialty
                      </label>
                      <input
                        value={symptomForm.suggestedSpecialty}
                        onChange={(e) =>
                          setSymptomForm({ ...symptomForm, suggestedSpecialty: e.target.value })
                        }
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Possible Conditions (comma separated)
                    </label>
                    <input
                      value={symptomForm.possibleConditions}
                      onChange={(e) =>
                        setSymptomForm({ ...symptomForm, possibleConditions: e.target.value })
                      }
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Home Remedies (separate with ;)
                    </label>
                    <textarea
                      rows={2}
                      value={symptomForm.homeRemedies}
                      onChange={(e) =>
                        setSymptomForm({ ...symptomForm, homeRemedies: e.target.value })
                      }
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Ayurvedic Remedies (separate with ;)
                    </label>
                    <textarea
                      rows={2}
                      value={symptomForm.ayurvedicRemedies}
                      onChange={(e) =>
                        setSymptomForm({ ...symptomForm, ayurvedicRemedies: e.target.value })
                      }
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm resize-none"
                    />
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => setSymptomModalOpen(false)}
                      className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const payload: NewSymptom = {
                          symptom: symptomForm.symptom,
                          severity: symptomForm.severity as any,
                          suggestedSpecialty: symptomForm.suggestedSpecialty,
                          possibleConditions: symptomForm.possibleConditions
                            .split(',')
                            .map((c) => c.trim())
                            .filter(Boolean),
                          homeRemedies: symptomForm.homeRemedies
                            .split(';')
                            .map((c) => c.trim())
                            .filter(Boolean),
                          ayurvedicRemedies: symptomForm.ayurvedicRemedies
                            .split(';')
                            .map((c) => c.trim())
                            .filter(Boolean),
                          whenToSeeDoctor:
                            'Consult a doctor if symptoms worsen or persist beyond a few days.',
                        };

                        if (editingSymptomIndex === null) {
                          addSymptom(payload);
                          setSymptoms([...symptoms, payload]);
                          showNotif('Symptom added');
                        } else {
                          updateSymptom(editingSymptomIndex, payload);
                          const clone = [...symptoms];
                          clone[editingSymptomIndex] = payload;
                          setSymptoms(clone);
                          showNotif('Symptom updated');
                        }

                        setSymptomModalOpen(false);
                      }}
                      className="flex-1 bg-slate-800 text-white py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {editingSymptomIndex === null ? 'Save Symptom' : 'Update Symptom'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hospitals */}
      {activeTab === 'hospitals' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-800">Hospitals & Clinics ({hospitalsState.length})</h3>
            <button
              className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-medium"
              onClick={() => {
                setEditingHospitalIndex(null);
                setHospitalForm({
                  name: '',
                  location: '',
                  specialty: '',
                  rating: 4.5,
                  type: 'Private',
                  phone: '',
                  emergency: true,
                });
                setHospitalModalOpen(true);
              }}
            >
              <Plus className="w-4 h-4" />Add Hospital
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['Hospital', 'Location', 'Specialty', 'Type', 'Rating', 'Emergency', 'Actions'].map((h) => (
                    <th
                      key={h}
                      className="text-left p-4 text-xs font-semibold text-gray-500 uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hospitalsState.map((h, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-50 hover:bg-gray-50/50"
                  >
                    <td className="p-4 font-medium text-gray-800">{h.name}</td>
                    <td className="p-4 text-gray-500">{h.location}</td>
                    <td className="p-4 text-gray-500">{h.specialty}</td>
                    <td className="p-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-lg ${
                          h.type === 'Government'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {h.type}
                      </span>
                    </td>
                    <td className="p-4 text-amber-600 font-semibold">
                      ⭐ {h.rating}
                    </td>
                    <td className="p-4">
                      {h.emergency ? (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg">
                          24/7
                        </span>
                      ) : (
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-lg">
                          No
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"
                          onClick={() => {
                            setEditingHospitalIndex(i);
                            setHospitalForm(h);
                            setHospitalModalOpen(true);
                          }}
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                          onClick={() => {
                            deleteHospital(i);
                            setHospitalsState(hospitalsState.filter((_, idx) => idx !== i));
                            showNotif('Hospital removed');
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {hospitalModalOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-xl shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800">
                    {editingHospitalIndex === null ? 'Add Hospital' : 'Edit Hospital'}
                  </h3>
                  <button onClick={() => setHospitalModalOpen(false)}>
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Hospital Name
                    </label>
                    <input
                      value={hospitalForm.name}
                      onChange={(e) =>
                        setHospitalForm({ ...hospitalForm, name: e.target.value })
                      }
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Location
                    </label>
                    <input
                      value={hospitalForm.location}
                      onChange={(e) =>
                        setHospitalForm({ ...hospitalForm, location: e.target.value })
                      }
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Specialty
                    </label>
                    <input
                      value={hospitalForm.specialty}
                      onChange={(e) =>
                        setHospitalForm({ ...hospitalForm, specialty: e.target.value })
                      }
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Type
                    </label>
                    <select
                      value={hospitalForm.type}
                      onChange={(e) =>
                        setHospitalForm({ ...hospitalForm, type: e.target.value as HospitalItem['type'] })
                      }
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none bg-white"
                    >
                      <option value="Government">Government</option>
                      <option value="Private">Private</option>
                      <option value="Private (Non-profit)">Private (Non-profit)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Rating
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={hospitalForm.rating}
                      onChange={(e) =>
                        setHospitalForm({
                          ...hospitalForm,
                          rating: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Phone
                    </label>
                    <input
                      value={hospitalForm.phone}
                      onChange={(e) =>
                        setHospitalForm({ ...hospitalForm, phone: e.target.value })
                      }
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div className="col-span-2 flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      checked={hospitalForm.emergency}
                      onChange={(e) =>
                        setHospitalForm({
                          ...hospitalForm,
                          emergency: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-xs text-gray-600">
                      24/7 Emergency Available
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => setHospitalModalOpen(false)}
                    className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (editingHospitalIndex === null) {
                        addHospital(hospitalForm);
                        setHospitalsState([...hospitalsState, hospitalForm]);
                        showNotif('Hospital added');
                      } else {
                        updateHospital(editingHospitalIndex, hospitalForm);
                        const clone = [...hospitalsState];
                        clone[editingHospitalIndex] = hospitalForm;
                        setHospitalsState(clone);
                        showNotif('Hospital updated');
                      }
                      setHospitalModalOpen(false);
                    }}
                    className="flex-1 bg-slate-800 text-white py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {editingHospitalIndex === null ? 'Save Hospital' : 'Update Hospital'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Videos */}
      {activeTab === 'videos' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 bg-white p-1 rounded-xl shadow-sm border border-gray-100">
              {([
                { id: 'healthyFood', label: '🥗 Healthy Food' },
                { id: 'yoga', label: '🧘 Yoga' },
                { id: 'exercise', label: '🏃 Exercise' },
              ] as const).map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveVideoCategory(cat.id as VideoCategory)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeVideoCategory === cat.id
                      ? 'bg-slate-800 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <button
              className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-medium"
              onClick={() => {
                setEditingVideoIndex(null);
                setVideoForm({
                  id: '',
                  title: '',
                  channel: '',
                  duration: '',
                  level: 'Easy',
                });
                setVideoModalOpen(true);
              }}
            >
              <Plus className="w-4 h-4" />Add Video
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videosState[activeVideoCategory].map((v, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="relative aspect-video bg-gray-100">
                  <img
                    src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                    alt={v.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=500&q=80';
                    }}
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => {
                        setEditingVideoIndex(i);
                        setVideoForm(v);
                        setVideoModalOpen(true);
                      }}
                      className="p-1.5 bg-white/90 text-blue-600 hover:bg-white rounded-lg shadow-sm backdrop-blur-sm"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        deleteVideo(activeVideoCategory, i);
                        setVideosState(getVideos());
                        showNotif('Video removed');
                      }}
                      className="p-1.5 bg-white/90 text-red-600 hover:bg-white rounded-lg shadow-sm backdrop-blur-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 line-clamp-1">{v.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{v.channel}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
                      {v.duration}
                    </span>
                    <span className="text-xs font-medium px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md">
                      {v.level}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {videoModalOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800">
                    {editingVideoIndex === null ? 'Add Video' : 'Edit Video'}
                  </h3>
                  <button onClick={() => setVideoModalOpen(false)}>
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">YouTube Video ID (e.g. f0X1Tl8aHtA)</label>
                    <input
                      value={videoForm.id}
                      onChange={(e) => setVideoForm({ ...videoForm, id: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                    <input
                      value={videoForm.title}
                      onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Channel Name</label>
                    <input
                      value={videoForm.channel}
                      onChange={(e) => setVideoForm({ ...videoForm, channel: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Duration (e.g. 15 min)</label>
                      <input
                        value={videoForm.duration}
                        onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Level</label>
                      <select
                        value={videoForm.level}
                        onChange={(e) => setVideoForm({ ...videoForm, level: e.target.value as any })}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none bg-white"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() => setVideoModalOpen(false)}
                      className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        // Extract Youtube ID if user pastes full URL
                        const extractYoutubeId = (url: string) => {
                          const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                          const match = url.match(regExp);
                          return (match && match[2].length === 11) ? match[2] : url.trim();
                        };
                        
                        const cleanedForm = {
                          ...videoForm,
                          id: extractYoutubeId(videoForm.id)
                        };

                        if (editingVideoIndex === null) {
                          addVideo(activeVideoCategory, cleanedForm);
                          showNotif('Video added');
                        } else {
                          updateVideo(activeVideoCategory, editingVideoIndex, cleanedForm);
                          showNotif('Video updated');
                        }
                        setVideosState(getVideos());
                        setVideoModalOpen(false);
                      }}
                      className="flex-1 bg-slate-800 text-white py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {editingVideoIndex === null ? 'Save Video' : 'Update Video'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
