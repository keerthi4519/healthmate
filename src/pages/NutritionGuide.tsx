import { useState } from 'react';
import { Utensils, Leaf, Drumstick, Egg, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { healthTips } from '../data/healthData';

export default function NutritionGuide() {
  const [dietType, setDietType] = useState<'vegetarian' | 'nonVegetarian' | 'eggetarian'>('vegetarian');
  const [goal, setGoal] = useState<'loss' | 'gain'>('loss');
  const [expandedDay, setExpandedDay] = useState<string | null>('Monday');

  const data = healthTips[dietType];
  const plan = goal === 'loss' ? data.weeklyPlanWeightLoss : data.weeklyPlanWeightGain;

  const dietOptions = [
    { id: 'vegetarian' as const, label: 'Vegetarian', icon: Leaf, color: 'emerald' },
    { id: 'nonVegetarian' as const, label: 'Non-Vegetarian', icon: Drumstick, color: 'red' },
    { id: 'eggetarian' as const, label: 'Eggetarian', icon: Egg, color: 'amber' },
  ];

  const colorMap: Record<string, { btn: string; active: string; badge: string; tag: string }> = {
    emerald: { btn: 'border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100', active: 'bg-emerald-600 text-white border-emerald-600', badge: 'bg-emerald-100 text-emerald-800', tag: 'bg-emerald-500' },
    red: { btn: 'border-red-200 text-red-700 bg-red-50 hover:bg-red-100', active: 'bg-red-600 text-white border-red-600', badge: 'bg-red-100 text-red-800', tag: 'bg-red-500' },
    amber: { btn: 'border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100', active: 'bg-amber-600 text-white border-amber-600', badge: 'bg-amber-100 text-amber-800', tag: 'bg-amber-500' },
  };
  const dietColor = dietOptions.find(d => d.id === dietType)?.color || 'emerald';
  const colors = colorMap[dietColor];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Utensils className="w-6 h-6" />
          <h2 className="text-xl font-bold">Nutrition Guide</h2>
        </div>
        <p className="text-emerald-100 text-sm">Personalized nutrition plans based on your diet type and health goals</p>
      </div>

      {/* Diet Type Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4">Choose Your Diet Type</h3>
        <div className="grid grid-cols-3 gap-3">
          {dietOptions.map(opt => {
            const Icon = opt.icon;
            const c = colorMap[opt.color];
            return (
              <button key={opt.id} onClick={() => setDietType(opt.id)}
                className={`flex flex-col items-center gap-2 p-4 border-2 rounded-2xl transition-all font-medium text-sm ${dietType === opt.id ? c.active : c.btn}`}>
                <Icon className="w-6 h-6" />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Energy Needs Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4">Energy Needs by Age Group</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 rounded-l-xl text-gray-600 font-semibold">Age Group</th>
                <th className="text-center p-3 text-gray-600 font-semibold">Calories/Day</th>
                <th className="text-center p-3 text-gray-600 font-semibold">Protein</th>
                <th className="text-center p-3 text-gray-600 font-semibold">Carbs</th>
                <th className="text-center p-3 rounded-r-xl text-gray-600 font-semibold">Fat</th>
              </tr>
            </thead>
            <tbody>
              {data.energyNeeds.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-3 font-medium text-gray-800">{row.ageGroup}</td>
                  <td className="p-3 text-center"><span className={`px-2 py-1 rounded-lg text-xs font-bold ${colors.badge}`}>{row.calories} kcal</span></td>
                  <td className="p-3 text-center text-gray-600">{row.protein}</td>
                  <td className="p-3 text-center text-gray-600">{row.carbs}</td>
                  <td className="p-3 text-center text-gray-600">{row.fat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Macro & Micro Nutrients */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">Macronutrients</h3>
          {Object.entries(data.macronutrients).map(([key, val]) => (
            <div key={key} className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700 capitalize">{key}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${colors.badge}`}>{val.percentage}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {val.sources.map((s, i) => (
                  <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">Micronutrients</h3>
          <div className="space-y-3">
            {data.micronutrients.map((m, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2 h-2 rounded-full ${colors.tag}`} />
                  <span className="text-sm font-semibold text-gray-800">{m.name}</span>
                </div>
                <p className="text-xs text-gray-500 mb-1"><span className="font-medium">Sources:</span> {m.sources}</p>
                <p className="text-xs text-blue-600 font-medium">💡 {m.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Plan */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-600" />
            <h3 className="font-bold text-gray-800">Weekly Meal Plan</h3>
          </div>
          <div className="flex gap-2">
            {(['loss', 'gain'] as const).map(g => (
              <button key={g} onClick={() => setGoal(g)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${goal === g ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {g === 'loss' ? '⬇ Weight Loss' : '⬆ Weight Gain'}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          {plan.map((day) => (
            <div key={day.day} className="border border-gray-100 rounded-xl overflow-hidden">
              <button onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${colors.tag} flex items-center justify-center text-white text-xs font-bold`}>
                    {day.day.slice(0, 2)}
                  </div>
                  <span className="font-semibold text-gray-800">{day.day}</span>
                </div>
                {expandedDay === day.day ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {expandedDay === day.day && (
                <div className="px-4 pb-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[{ label: '🌅 Breakfast', val: day.breakfast }, { label: '☀️ Lunch', val: day.lunch }, { label: '🌙 Dinner', val: day.dinner }, { label: '🍎 Snack', val: day.snack }].map((m, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs font-semibold text-gray-500 mb-1">{m.label}</p>
                      <p className="text-sm text-gray-700">{m.val}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Additional Health & Nutrition Tables */}
      <div className="space-y-6">
        {/* Nutrient Deficiency / Excess Effects */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 overflow-hidden">
          <h3 className="text-xl font-bold text-emerald-800 mb-4">Nutrient Deficiency / Excess Effects</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-emerald-100 text-emerald-900 border-b border-emerald-200">
                  <th className="p-3 font-semibold w-1/3">Nutrient</th>
                  <th className="p-3 font-semibold w-1/3">Deficiency Leads To</th>
                  <th className="p-3 font-semibold w-1/3">Excess Leads To</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">Iron</td>
                  <td className="p-3 text-gray-600">Anemia, fatigue</td>
                  <td className="p-3 text-gray-600">Organ damage, constipation</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">Vitamin D</td>
                  <td className="p-3 text-gray-600">Bone pain, muscle weakness</td>
                  <td className="p-3 text-gray-600">Calcium buildup (toxicity)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">Vitamin B12</td>
                  <td className="p-3 text-gray-600">Nerve damage, tiredness</td>
                  <td className="p-3 text-gray-600">Rare (usually excreted)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">Calcium</td>
                  <td className="p-3 text-gray-600">Weak bones, osteoporosis</td>
                  <td className="p-3 text-gray-600">Kidney stones</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">Vitamin A</td>
                  <td className="p-3 text-gray-600">Vision issues</td>
                  <td className="p-3 text-gray-600">Liver damage, birth defects</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">Protein</td>
                  <td className="p-3 text-gray-600">Muscle loss, poor healing</td>
                  <td className="p-3 text-gray-600">Kidney strain</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Harmful Foods & Healthy Replacements */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 overflow-hidden">
          <h3 className="text-xl font-bold text-emerald-800 mb-4">Harmful Foods & Healthy Replacements</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-emerald-100 text-emerald-900 border-b border-emerald-200">
                  <th className="p-3 font-semibold w-1/3">Harmful Food</th>
                  <th className="p-3 font-semibold w-1/3">Side Effects</th>
                  <th className="p-3 font-semibold w-1/3">Healthy Replacement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">Soft drinks / Colas</td>
                  <td className="p-3 text-gray-600">Obesity, diabetes, tooth decay</td>
                  <td className="p-3 text-gray-600">Infused water, coconut water, lemon water</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">Fried snacks (chips, pakoras)</td>
                  <td className="p-3 text-gray-600">High cholesterol, heart disease</td>
                  <td className="p-3 text-gray-600">Roasted chickpeas, baked veggie chips</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">Sweets with refined sugar</td>
                  <td className="p-3 text-gray-600">Insulin spikes, weight gain</td>
                  <td className="p-3 text-gray-600">Fruits, dates, jaggery-based sweets</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">Instant noodles</td>
                  <td className="p-3 text-gray-600">High sodium, poor nutrition</td>
                  <td className="p-3 text-gray-600">Whole wheat pasta, veggie noodles</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">White bread</td>
                  <td className="p-3 text-gray-600">Blood sugar spikes, no fiber</td>
                  <td className="p-3 text-gray-600">Whole grain or multigrain bread</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
