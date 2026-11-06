import { symptomsData as defaultSymptoms, youtubeVideos as defaultVideos, hospitals as defaultHospitals } from '../data/healthData';

export type Symptom = (typeof defaultSymptoms)[number];
export type NewSymptom = {
  symptom: string;
  severity: Symptom['severity'];
  suggestedSpecialty: string;
  possibleConditions: string[];
  homeRemedies: string[];
  ayurvedicRemedies: string[];
  whenToSeeDoctor: string;
};
export type VideoCategory = keyof typeof defaultVideos;
export type VideoItem = (typeof defaultVideos)[VideoCategory][number];

const SYMPTOMS_KEY = 'healthmate_symptoms';
const VIDEOS_KEY = 'healthmate_videos';

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

function loadSymptoms(): Symptom[] {
  const stored = safeGetItem(SYMPTOMS_KEY);
  if (!stored) {
    const seeded = [...defaultSymptoms];
    safeSetItem(SYMPTOMS_KEY, JSON.stringify(seeded));
    return seeded;
  }
  try {
    const parsed = JSON.parse(stored) as Symptom[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      safeSetItem(SYMPTOMS_KEY, JSON.stringify(defaultSymptoms));
      return [...defaultSymptoms];
    }
    return parsed;
  } catch {
    return [...defaultSymptoms];
  }
}

function loadVideos(): typeof defaultVideos {
  const stored = safeGetItem(VIDEOS_KEY);
  if (!stored) {
    const seeded = { ...defaultVideos } as typeof defaultVideos;
    safeSetItem(VIDEOS_KEY, JSON.stringify(seeded));
    return seeded;
  }
  try {
    const parsed = JSON.parse(stored) as typeof defaultVideos;
    return parsed;
  } catch {
    return { ...defaultVideos } as typeof defaultVideos;
  }
}

let symptoms: Symptom[] = loadSymptoms();
let videos: typeof defaultVideos = loadVideos();

function persistSymptoms() {
  safeSetItem(SYMPTOMS_KEY, JSON.stringify(symptoms));
}

function persistVideos() {
  safeSetItem(VIDEOS_KEY, JSON.stringify(videos));
}

export function getSymptoms(): Symptom[] {
  return [...symptoms];
}

export function addSymptom(symptom: NewSymptom) {
  symptoms = [...symptoms, symptom as Symptom];
  persistSymptoms();
}

export function updateSymptom(index: number, updated: NewSymptom) {
  symptoms = symptoms.map((s, i) => (i === index ? (updated as Symptom) : s));
  persistSymptoms();
}

export function deleteSymptom(index: number) {
  symptoms = symptoms.filter((_, i) => i !== index);
  persistSymptoms();
}

export function getVideos(): typeof defaultVideos {
  return videos;
}

// --- Hospitals management for admin ---

export type HospitalItem = typeof defaultHospitals[number];

const HOSPITALS_KEY = 'healthmate_hospitals';

function loadHospitals(): HospitalItem[] {
  const stored = safeGetItem(HOSPITALS_KEY);
  if (!stored) {
    safeSetItem(HOSPITALS_KEY, JSON.stringify(defaultHospitals));
    return [...defaultHospitals];
  }
  try {
    const parsed = JSON.parse(stored) as HospitalItem[];
    return parsed.length ? parsed : [...defaultHospitals];
  } catch {
    return [...defaultHospitals];
  }
}

let hospitalsCache: HospitalItem[] = loadHospitals();

function persistHospitals() {
  safeSetItem(HOSPITALS_KEY, JSON.stringify(hospitalsCache));
}

export function getHospitals(): HospitalItem[] {
  return [...hospitalsCache];
}

export function addHospital(h: HospitalItem) {
  hospitalsCache = [...hospitalsCache, h];
  persistHospitals();
}

export function updateHospital(index: number, h: HospitalItem) {
  hospitalsCache = hospitalsCache.map((item, i) => (i === index ? h : item));
  persistHospitals();
}

export function deleteHospital(index: number) {
  hospitalsCache = hospitalsCache.filter((_, i) => i !== index);
  persistHospitals();
}

export function addVideo(category: VideoCategory, video: VideoItem) {
  videos = { ...videos, [category]: [...videos[category], video] } as typeof defaultVideos;
  persistVideos();
}

export function updateVideo(category: VideoCategory, index: number, updated: VideoItem) {
  videos = {
    ...videos,
    [category]: videos[category].map((v, i) => (i === index ? updated : v)),
  } as typeof defaultVideos;
  persistVideos();
}

export function deleteVideo(category: VideoCategory, index: number) {
  videos = {
    ...videos,
    [category]: videos[category].filter((_, i) => i !== index),
  } as typeof defaultVideos;
  persistVideos();
}
