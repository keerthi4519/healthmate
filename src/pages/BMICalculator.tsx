import { useState } from 'react';
import { Calculator, Info, TrendingUp } from 'lucide-react';

export default function BMICalculator() {
  const [form, setForm] = useState({ weight: '', height: '', age: '', gender: 'Male', unit: 'metric' });
  const [result, setResult] = useState<{ bmi: number; category: string; color: string; advice: string; idealWeight: string } | null>(null);

  const calculate = () => {
    let w = parseFloat(form.weight), h = parseFloat(form.height);
    if (!w || !h) return;
    if (form.unit === 'imperial') { w = w * 0.453592; h = h * 2.54; }
    const bmi = w / ((h / 100) ** 2);
    let category = '', color = '', advice = '';
    if (bmi < 18.5) { category = 'Underweight'; color = '#3b82f6'; advice = 'You need to gain weight. Focus on nutrient-dense, calorie-rich foods and strength training.'; }
    else if (bmi < 25) { category = 'Normal Weight'; color = '#22c55e'; advice = 'Great! You are in a healthy weight range. Maintain with balanced diet and regular exercise.'; }
    else if (bmi < 30) { category = 'Overweight'; color = '#f59e0b'; advice = 'Consider losing weight through a balanced diet and regular physical activity to reduce health risks.'; }
    else { category = 'Obese'; color = '#ef4444'; advice = 'Medical guidance recommended. Focus on gradual weight loss through diet and lifestyle changes.'; }
    const idealMin = (18.5 * ((h / 100) ** 2)).toFixed(1);
    const idealMax = (24.9 * ((h / 100) ** 2)).toFixed(1);
    setResult({ bmi: parseFloat(bmi.toFixed(1)), category, color, advice, idealWeight: `${idealMin} - ${idealMax} kg` });
  };

  const bmiScale = [
    { label: 'Underweight', range: '< 18.5', color: '#3b82f6', bg: 'bg-blue-100' },
    { label: 'Normal', range: '18.5 - 24.9', color: '#22c55e', bg: 'bg-green-100' },
    { label: 'Overweight', range: '25 - 29.9', color: '#f59e0b', bg: 'bg-yellow-100' },
    { label: 'Obese', range: '≥ 30', color: '#ef4444', bg: 'bg-red-100' },
  ];

  const getPointerPosition = (bmi: number) => {
    if (bmi <= 10) return 0;
    if (bmi >= 40) return 100;
    return ((bmi - 10) / 30) * 100;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="w-6 h-6" />
          <h2 className="text-xl font-bold">BMI Calculator</h2>
        </div>
        <p className="text-blue-100 text-sm">Calculate your Body Mass Index and get personalized health insights</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">Enter Your Details</h3>

          <div className="flex gap-2 mb-4">
            {['metric', 'imperial'].map(u => (
              <button key={u} onClick={() => setForm({ ...form, unit: u })}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${form.unit === u ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {u === 'metric' ? 'Metric (kg/cm)' : 'Imperial (lb/in)'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Weight ({form.unit === 'metric' ? 'kg' : 'lbs'})
              </label>
              <input type="number" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder={form.unit === 'metric' ? '70' : '154'} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Height ({form.unit === 'metric' ? 'cm' : 'inches'})
              </label>
              <input type="number" value={form.height} onChange={e => setForm({ ...form, height: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder={form.unit === 'metric' ? '170' : '67'} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Age</label>
                <input type="number" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="25" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender</label>
                <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white">
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
            </div>
            <button onClick={calculate}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-200">
              Calculate BMI
            </button>
          </div>
        </div>

        {/* Result */}
        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4">Your BMI Result</h3>
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold mb-2" style={{ color: result.color }}>{result.bmi}</div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold text-sm" style={{ backgroundColor: result.color }}>
                    {result.category}
                  </div>
                </div>

                {/* BMI Gauge */}
                <div className="mb-4">
                  <div className="h-4 rounded-full overflow-hidden flex mb-2">
                    <div className="flex-1 bg-blue-400" />
                    <div className="flex-1 bg-green-400" />
                    <div className="flex-1 bg-yellow-400" />
                    <div className="flex-1 bg-red-400" />
                  </div>
                  <div className="relative h-2">
                    <div className="absolute w-3 h-3 bg-gray-800 rounded-full -translate-y-1/2 -translate-x-1/2 shadow-lg"
                      style={{ left: `${getPointerPosition(result.bmi)}%`, top: '-4px' }} />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>10</span><span>18.5</span><span>25</span><span>30</span><span>40+</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mt-4">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-gray-700 mb-1">Health Advice</p>
                      <p className="text-xs text-gray-600">{result.advice}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-100">
                  <p className="text-xs text-gray-600 font-medium">Ideal Weight Range</p>
                  <p className="text-sm font-bold text-green-700 mt-0.5">{result.idealWeight}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-center min-h-48">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">Enter your details to calculate BMI</p>
              </div>
            </div>
          )}

          {/* BMI Scale */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-3">BMI Categories</h3>
            <div className="space-y-2">
              {bmiScale.map((s, i) => (
                <div key={i} className={`flex items-center justify-between p-3 ${s.bg} rounded-xl`}>
                  <span className="text-sm font-medium" style={{ color: s.color }}>{s.label}</span>
                  <span className="text-sm text-gray-600 font-medium">{s.range}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
