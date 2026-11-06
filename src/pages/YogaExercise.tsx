import { useState } from 'react';
import { Activity, Play, Clock, BarChart2, X, Heart, Zap, Wind } from 'lucide-react';
import { getVideos } from '../store/contentStore';

export default function YogaExercise() {
  const [activeTab, setActiveTab] = useState<'yoga' | 'exercise'>('yoga');
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [playingTitle, setPlayingTitle] = useState('');
  
  const allVideos = getVideos();

  const yogaBenefits = [
    { icon: Heart, label: 'Stress Relief', desc: 'Reduces cortisol and promotes relaxation' },
    { icon: Zap, label: 'Flexibility', desc: 'Improves muscle flexibility and joint mobility' },
    { icon: Wind, label: 'Breathing', desc: 'Enhances lung capacity and breathwork' },
    { icon: Activity, label: 'Balance', desc: 'Builds core strength and body balance' },
  ];

  const exerciseBenefits = [
    { icon: Heart, label: 'Cardio Health', desc: 'Strengthens heart and improves circulation' },
    { icon: Zap, label: 'Strength', desc: 'Builds muscle mass and bone density' },
    { icon: Wind, label: 'Weight Loss', desc: 'Burns calories and boosts metabolism' },
    { icon: Activity, label: 'Endurance', desc: 'Increases stamina and energy levels' },
  ];

  const videos = allVideos[activeTab];
  const benefits = activeTab === 'yoga' ? yogaBenefits : exerciseBenefits;

  const gradients = {
    yoga: 'from-purple-600 to-indigo-600',
    exercise: 'from-orange-500 to-red-600',
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className={`bg-gradient-to-r ${gradients[activeTab]} rounded-2xl p-6 text-white transition-all duration-500`}>
        <div className="flex items-center gap-3 mb-2">
          <Activity className="w-6 h-6" />
          <h2 className="text-xl font-bold">Yoga & Exercise</h2>
        </div>
        <p className="text-white/80 text-sm">Guided yoga flows and exercise routines to balance body, mind and energy.</p>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-lg font-bold text-gray-800">About Yoga & Exercises</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Yoga is a time-tested practice that combines breathing, physical postures and meditation to bring
              balance to the body and mind. It improves flexibility, strengthens muscles and calms the nervous
              system. Exercises, especially when paired with yoga, help build endurance, correct posture and
              regulate internal systems like hormones and metabolism.
            </p>
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-2">Benefits of Yoga & Exercise</h4>
              <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-600">
                <ul className="space-y-1 list-disc list-inside">
                  <li>Improves posture &amp; flexibility</li>
                  <li>Strengthens lungs &amp; breathing capacity</li>
                  <li>Reduces anxiety and stress levels</li>
                  <li>Balances hormones &amp; supports menstrual health</li>
                </ul>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Builds strength and overall body tone</li>
                  <li>Enhances blood flow &amp; detoxification</li>
                  <li>Supports healthy weight gain or loss</li>
                  <li>Improves sleep quality and daily energy</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
            <h4 className="text-sm font-semibold text-amber-800 mb-2">Who should avoid certain asanas?</h4>
            <ul className="space-y-1 text-xs text-amber-800 list-disc list-inside">
              <li>Pregnant women – avoid strong backbends and deep twists.</li>
              <li>People with back, knee or neck injuries – avoid strain-inducing poses.</li>
              <li>High BP or heart issues – avoid fast flows and inverted poses.</li>
              <li>During menstruation – avoid inversions like shoulder stands and headstands.</li>
            </ul>
            <p className="text-[11px] text-amber-700 mt-3">
              Always listen to your body and consult a certified yoga therapist or doctor before starting
              a new practice, especially if you have medical conditions.
            </p>
          </div>
        </div>
      </div>

      {/* Tab Selection */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { id: 'yoga' as const, label: '🧘 Yoga', desc: 'Mind, body & soul balance', videos: allVideos.yoga.length },
          { id: 'exercise' as const, label: '💪 Exercise', desc: 'Strength & cardio workouts', videos: allVideos.exercise.length },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`p-5 rounded-2xl border-2 text-left transition-all ${activeTab === tab.id
              ? tab.id === 'yoga' ? 'border-purple-500 bg-purple-50' : 'border-orange-500 bg-orange-50'
              : 'border-gray-200 bg-white hover:border-gray-300'}`}>
            <div className="text-2xl mb-2">{tab.label.split(' ')[0]}</div>
            <p className={`font-bold ${activeTab === tab.id ? (tab.id === 'yoga' ? 'text-purple-700' : 'text-orange-700') : 'text-gray-800'}`}>
              {tab.label.split(' ').slice(1).join(' ')}
            </p>
            <p className="text-xs text-gray-500 mt-1">{tab.desc}</p>
            <p className={`text-xs mt-2 font-medium ${activeTab === tab.id ? (tab.id === 'yoga' ? 'text-purple-600' : 'text-orange-600') : 'text-gray-400'}`}>
              {tab.videos} videos available
            </p>
          </button>
        ))}
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {benefits.map((b, i) => {
          const Icon = b.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
              <div className={`inline-flex p-2 rounded-xl mb-2 ${activeTab === 'yoga' ? 'bg-purple-100 text-purple-600' : 'bg-orange-100 text-orange-600'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-sm font-semibold text-gray-800">{b.label}</p>
              <p className="text-xs text-gray-400 mt-1">{b.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Video Grid */}
      <div>
        <h3 className="font-bold text-gray-800 mb-4">{activeTab === 'yoga' ? '🧘 Yoga Sessions' : '💪 Exercise Workouts'}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((video, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
              <div className="relative aspect-video bg-gray-900 cursor-pointer overflow-hidden"
                onClick={() => { setPlayingVideo(video.id); setPlayingTitle(video.title); }}>
                <img
                  src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/320x180/2d1b69/ffffff?text=Yoga+Video'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className={`${activeTab === 'yoga' ? 'bg-purple-600' : 'bg-orange-600'} rounded-full p-2 ml-auto shadow-lg`}>
                    <Play className="w-5 h-5 text-white fill-white" />
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Clock className="w-3 h-3" />{video.duration}
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">{video.title}</h4>
                <p className="text-xs text-gray-400 mb-3">{video.channel}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-lg font-medium ${video.level === 'Beginner' ? 'bg-green-100 text-green-700' : video.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                    <BarChart2 className="inline w-3 h-3 mr-1" />{video.level}
                  </span>
                  <button onClick={() => { setPlayingVideo(video.id); setPlayingTitle(video.title); }}
                    className={`flex items-center gap-1.5 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${activeTab === 'yoga' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-orange-600 hover:bg-orange-700'}`}>
                    <Play className="w-3 h-3 fill-white" />Start
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Player Modal */}
      {playingVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setPlayingVideo(null)}>
          <div className="w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold text-sm">{playingTitle}</h3>
              <button onClick={() => setPlayingVideo(null)} className="text-white bg-white/20 p-2 rounded-lg hover:bg-white/30">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1&rel=0`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={playingTitle}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
