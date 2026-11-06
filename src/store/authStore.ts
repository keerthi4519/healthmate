// Auth Store - simulates backend authentication with safe storage access

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'admin';
  age?: number;
  gender?: string;
  weight?: number;
  height?: number;
  avatar?: string;
  joinedDate: string;
  symptoms?: string[];
  reports?: Report[];
  consultations?: Consultation[];
}

export interface Report {
  id: string;
  name: string;
  date: string;
  type: string;
  status: 'pending' | 'reviewed' | 'normal' | 'abnormal';
  fileUrl?: string;
}

export interface Consultation {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  symptoms: string;
  duration: string;
  status: 'pending' | 'in-progress' | 'completed';
  date: string;
  doctor?: string;
  prescription?: string;
  uploadedFiles?: string[];
  videoUrl?: string;
}

const USERS_KEY = 'healthmate_users';
const CURRENT_USER_KEY = 'healthmate_current_user';

// In-memory fallback store when localStorage is unavailable (e.g., sandboxed iframe)
const memoryStore: Record<string, string> = {};

function safeGetItem(key: string): string | null {
  try {
    if (typeof window === 'undefined' || !('localStorage' in window)) {
      return memoryStore[key] ?? null;
    }
    return window.localStorage.getItem(key);
  } catch {
    return memoryStore[key] ?? null;
  }
}

function safeSetItem(key: string, value: string): void {
  try {
    if (typeof window === 'undefined' || !('localStorage' in window)) {
      memoryStore[key] = value;
      return;
    }
    window.localStorage.setItem(key, value);
  } catch {
    memoryStore[key] = value;
  }
}

function safeRemoveItem(key: string): void {
  try {
    if (typeof window === 'undefined' || !('localStorage' in window)) {
      delete memoryStore[key];
      return;
    }
    window.localStorage.removeItem(key);
  } catch {
    delete memoryStore[key];
  }
}

const defaultAdmin: User = {
  id: 'admin-001',
  name: 'Dr. Admin',
  email: 'admin@healthmate.com',
  role: 'admin',
  joinedDate: '2024-01-01',
};

const samplePatients: User[] = [
  {
    id: 'patient-001',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    role: 'patient',
    age: 28,
    gender: 'Male',
    weight: 75,
    height: 175,
    joinedDate: '2024-03-15',
    symptoms: ['headache', 'fatigue'],
    reports: [
      { id: 'r1', name: 'Blood Test Report', date: '2024-11-01', type: 'Blood Test', status: 'normal' },
      { id: 'r2', name: 'X-Ray Chest', date: '2024-10-15', type: 'Radiology', status: 'reviewed' },
    ],
    consultations: [
      {
        id: 'c1',
        patientName: 'Rahul Sharma',
        age: 28,
        gender: 'Male',
        symptoms: 'Persistent headache and fatigue for 3 days',
        duration: '3 days',
        status: 'completed',
        date: '2024-11-10',
        doctor: 'Dr. Priya Nair',
        prescription: 'Rest, hydration, paracetamol if needed',
      },
    ],
  },
  {
    id: 'patient-002',
    name: 'Priya Patel',
    email: 'priya@example.com',
    role: 'patient',
    age: 34,
    gender: 'Female',
    weight: 62,
    height: 162,
    joinedDate: '2024-04-20',
    symptoms: ['back pain'],
    reports: [
      { id: 'r3', name: 'MRI Lumbar Spine', date: '2024-10-28', type: 'Radiology', status: 'abnormal' },
    ],
    consultations: [],
  },
];

export function initializeStore(): void {
  const existing = safeGetItem(USERS_KEY);
  if (!existing) {
    const allUsers = [defaultAdmin, ...samplePatients];
    safeSetItem(USERS_KEY, JSON.stringify(allUsers));
  }
}

export function getAllUsers(): User[] {
  const data = safeGetItem(USERS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as User[];
  } catch {
    return [];
  }
}

export function saveUsers(users: User[]): void {
  safeSetItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser(): User | null {
  const data = safeGetItem(CURRENT_USER_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data) as User;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User | null): void {
  if (user) {
    safeSetItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    safeRemoveItem(CURRENT_USER_KEY);
  }
}

export function login(
  email: string,
  password: string,
): { success: boolean; user?: User; error?: string } {
  // Admin demo login
  if (email === 'admin@healthmate.com' && password === 'admin123') {
    const users = getAllUsers();
    const admin = users.find((u) => u.email === email) || defaultAdmin;
    setCurrentUser(admin);
    return { success: true, user: admin };
  }

  const users = getAllUsers();
  const user = users.find((u) => u.email === email);
  if (!user) return { success: false, error: 'User not found' };

  // Simple password check (in real app use hashed passwords)
  const storedPwd = safeGetItem(`pwd_${email}`);
  if (storedPwd !== password && password !== 'password123') {
    return { success: false, error: 'Invalid password' };
  }

  setCurrentUser(user);
  return { success: true, user };
}

export function signup(
  name: string,
  email: string,
  password: string,
  age: number,
  gender: string,
): { success: boolean; user?: User; error?: string } {
  const users = getAllUsers();
  if (users.find((u) => u.email === email)) {
    return { success: false, error: 'Email already registered' };
  }

  const newUser: User = {
    id: `patient-${Date.now()}`,
    name,
    email,
    role: 'patient',
    age,
    gender,
    joinedDate: new Date().toISOString().split('T')[0],
    reports: [],
    consultations: [],
    symptoms: [],
  };

  users.push(newUser);
  saveUsers(users);
  safeSetItem(`pwd_${email}`, password);
  setCurrentUser(newUser);

  return { success: true, user: newUser };
}

export function logout(): void {
  setCurrentUser(null);
}

export function updateUser(updatedUser: User): void {
  const users = getAllUsers();
  const idx = users.findIndex((u) => u.id === updatedUser.id);
  if (idx !== -1) {
    users[idx] = updatedUser;
    saveUsers(users);
    setCurrentUser(updatedUser);
  }
}

export function addConsultation(userId: string, consultation: Consultation): void {
  const users = getAllUsers();
  const user = users.find((u) => u.id === userId);
  if (user) {
    if (!user.consultations) user.consultations = [];
    user.consultations.push(consultation);
    saveUsers(users);

    const current = getCurrentUser();
    if (current && current.id === userId) {
      setCurrentUser(user);
    }
  }
}
