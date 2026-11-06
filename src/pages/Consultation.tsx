import { useState, useRef, useEffect } from 'react';
import { Video, Upload, Clock, User, FileText, Camera, CheckCircle } from 'lucide-react';
import { User as UserType, addConsultation, Consultation as ConsultationType } from '../store/authStore';

interface ConsultationProps { user: UserType; }

// Simple in-page video recorder using MediaRecorder
function VideoRecorder({ onRecordingComplete }: { onRecordingComplete: (url: string | null) => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
      // Note: We don't revoke the URL here anymore because we need it to persist for the admin dashboard demo
    };
  }, [stream]);

  const startCamera = async () => {
    setError(null);
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        videoRef.current.play().catch(() => undefined);
      }
      const recorder = new MediaRecorder(s);
      const chunks: BlobPart[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedUrl(url);
        onRecordingComplete(url);
      };
      setMediaRecorder(recorder);
    } catch (e) {
      setError('Unable to access camera. Please check permissions.');
    }
  };

  const startRecording = async () => {
    if (!stream || !mediaRecorder) {
      await startCamera();
    }
    if (mediaRecorder && mediaRecorder.state !== 'recording') {
      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
      <p className="text-xs text-amber-700 font-semibold mb-2 flex items-center gap-1">
        <Camera className="w-4 h-4" />Video Recording (Optional)
      </p>
      <p className="text-xs text-amber-600 mb-3">
        Record a short video (30–60 seconds) describing your symptoms. This preview is stored only in your browser in this demo.
      </p>
      <div className="grid sm:grid-cols-2 gap-4 items-start">
        <div>
          <div className="aspect-video bg-black/80 rounded-xl overflow-hidden flex items-center justify-center">
            <video ref={videoRef} className="w-full h-full" muted playsInline />
          </div>
          <div className="flex gap-2 mt-3">
            {!isRecording ? (
              <button
                type="button"
                onClick={startRecording}
                className="bg-amber-600 text-white text-xs px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium"
              >
                Start Recording
              </button>
            ) : (
              <button
                type="button"
                onClick={stopRecording}
                className="bg-red-600 text-white text-xs px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Stop Recording
              </button>
            )}
          </div>
          {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-700 mb-2">Recorded Preview</p>
          {recordedUrl ? (
            <video src={recordedUrl} controls className="w-full rounded-xl border border-gray-200" />
          ) : (
            <div className="h-full min-h-32 flex items-center justify-center text-xs text-gray-400 bg-white/60 rounded-xl border border-dashed border-gray-200">
              No recording yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Consultation({ user }: ConsultationProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: user.name || '',
    age: String(user.age || ''),
    gender: user.gender || 'Male',
    symptoms: '',
    duration: '',
    existingConditions: '',
    medications: '',
    urgency: 'normal',
    preferredDate: '',
    notes: '',
  });
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const names = Array.from(e.target.files).map(f => f.name);
      setUploadedFiles(prev => [...prev, ...names]);
    }
  };

  const handleSubmit = () => {
    const consultation: ConsultationType = {
      id: `c-${Date.now()}`,
      patientName: form.name,
      age: parseInt(form.age) || user.age || 0,
      gender: form.gender,
      symptoms: form.symptoms,
      duration: form.duration,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      uploadedFiles: uploadedFiles.length > 0 ? uploadedFiles : undefined,
      videoUrl: recordedVideoUrl || undefined,
    };
    addConsultation(user.id, consultation);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Consultation Booked!</h2>
          <p className="text-gray-500 mb-6">Your consultation request has been submitted successfully. A doctor will review your case and contact you shortly.</p>
          <div className="bg-blue-50 rounded-xl p-4 text-left mb-6">
            <p className="text-sm font-semibold text-blue-800 mb-2">What happens next?</p>
            <div className="space-y-2">
              {['A doctor will review your symptoms within 30 minutes', 'You will receive a video call link on your registered email', 'Keep your health reports ready for the consultation', 'A prescription will be shared after the consultation'].map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">{i + 1}</div>
                  <p className="text-sm text-blue-700">{s}</p>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => { setSubmitted(false); setStep(1); setForm({ ...form, symptoms: '', duration: '', notes: '' }); }}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all">
            Book Another Consultation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Video className="w-6 h-6" />
          <h2 className="text-xl font-bold">Online Doctor Consultation</h2>
        </div>
        <p className="text-purple-100 text-sm">Consult with qualified doctors from the comfort of your home</p>
      </div>

      {/* Steps */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          {[{ n: 1, label: 'Patient Info' }, { n: 2, label: 'Symptoms' }, { n: 3, label: 'Upload Files' }, { n: 4, label: 'Schedule' }].map((s, i) => (
            <div key={s.n} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s.n ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {step > s.n ? '✓' : s.n}
                </div>
                <span className={`text-xs mt-1 font-medium hidden sm:block ${step >= s.n ? 'text-purple-700' : 'text-gray-400'}`}>{s.label}</span>
              </div>
              {i < 3 && <div className={`flex-1 h-0.5 mx-2 max-w-16 ${step > s.n ? 'bg-purple-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 text-lg mb-4">Patient Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" placeholder="Patient name" /></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Age</label>
                <input type="number" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" placeholder="Age" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender</label>
                <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white">
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Urgency Level</label>
                <select value={form.urgency} onChange={e => setForm({ ...form, urgency: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white">
                  <option value="normal">Normal (within 24 hrs)</option>
                  <option value="urgent">Urgent (within 2 hrs)</option>
                  <option value="emergency">Emergency (immediate)</option>
                </select>
              </div>
            </div>
            {form.urgency === 'emergency' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-700 font-semibold">🚨 Emergency?</p>
                <p className="text-xs text-red-600 mt-1">For life-threatening emergencies, please call <strong>108</strong> immediately or visit the nearest emergency room.</p>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 text-lg mb-4">Describe Your Symptoms</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Main Symptoms *</label>
              <textarea value={form.symptoms} onChange={e => setForm({ ...form, symptoms: e.target.value })} rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none"
                placeholder="Describe your symptoms in detail (e.g., fever with chills since 2 days, headache, loss of appetite...)" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">How long have you had these symptoms?</label>
                <select value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white">
                  <option value="">Select duration</option>
                  <option>Less than 24 hours</option><option>1-3 days</option><option>4-7 days</option>
                  <option>1-2 weeks</option><option>More than 2 weeks</option><option>Chronic (months/years)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Existing Medical Conditions</label>
                <input value={form.existingConditions} onChange={e => setForm({ ...form, existingConditions: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  placeholder="Diabetes, Hypertension, etc." />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Medications</label>
              <input value={form.medications} onChange={e => setForm({ ...form, medications: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                placeholder="List any medications you are currently taking" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h3 className="font-bold text-gray-800 text-lg mb-4">Upload Health Documents</h3>
            <div className="border-2 border-dashed border-purple-200 rounded-2xl p-8 text-center hover:border-purple-400 transition-colors">
              <input type="file" multiple accept="image/*,.pdf,.doc,.docx" className="hidden" id="fileUpload" onChange={handleFileUpload} />
              <label htmlFor="fileUpload" className="cursor-pointer">
                <Upload className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-700">Drop files or click to upload</p>
                <p className="text-xs text-gray-400 mt-1">Lab reports, X-rays, prescriptions (PDF, JPG, PNG)</p>
              </label>
            </div>
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                {uploadedFiles.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                    <FileText className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-700 flex-1">{f}</span>
                    <span className="text-xs text-green-600 font-medium">✓ Uploaded</span>
                  </div>
                ))}
              </div>
            )}

            {/* Video Recording Section */}
            <VideoRecorder onRecordingComplete={(url) => setRecordedVideoUrl(url)} />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <h3 className="font-bold text-gray-800 text-lg mb-4">Schedule Appointment</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Date & Time</label>
              <input type="datetime-local" value={form.preferredDate} onChange={e => setForm({ ...form, preferredDate: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Notes for Doctor</label>
              <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none"
                placeholder="Any specific concerns or questions for the doctor..." />
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-5">
              <h4 className="font-semibold text-gray-700 mb-3 text-sm">Consultation Summary</h4>
              <div className="space-y-2">
                {[
                  { label: 'Patient', value: form.name },
                  { label: 'Age / Gender', value: `${form.age} yrs / ${form.gender}` },
                  { label: 'Symptoms', value: form.symptoms || 'Not specified' },
                  { label: 'Duration', value: form.duration || 'Not specified' },
                  { label: 'Files Uploaded', value: `${uploadedFiles.length} file(s)` },
                  { label: 'Video Preview', value: recordedVideoUrl ? 'Recorded ✓' : 'None' },
                  { label: 'Urgency', value: form.urgency },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-gray-500 font-medium">{item.label}:</span>
                    <span className="text-gray-800 font-semibold text-right max-w-48 truncate">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-green-50 rounded-xl border border-green-100">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-green-600" />
                <p className="text-xs font-semibold text-green-800">Expected Response Time</p>
              </div>
              <p className="text-xs text-green-700">{form.urgency === 'emergency' ? 'Immediate (within 30 minutes)' : form.urgency === 'urgent' ? 'Within 2 hours' : 'Within 24 hours'}</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
          <button onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}
            className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium disabled:opacity-40 hover:bg-gray-50 transition-all">
            ← Back
          </button>
          {step < 4 ? (
            <button onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition-all">
              Continue →
            </button>
          ) : (
            <button onClick={handleSubmit}
              className="px-8 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-sm font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg">
              Submit Consultation
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
