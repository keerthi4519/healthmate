import { useState } from 'react';
import { Play, Youtube, Clock, BarChart2, X } from 'lucide-react';
import { getVideos } from '../store/contentStore';

export default function HealthVideos() {
  const [activeTab, setActiveTab] = useState<'healthyFood' | 'yoga' | 'exercise'>('healthyFood');
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  
  const allVideos = getVideos();

  const tabs = [
    { id: 'healthyFood' as const, label: '🥗 Healthy Cooking', count: allVideos.healthyFood.length },
    { id: 'yoga' as const, label: '🧘 Yoga', count: allVideos.yoga.length },
    { id: 'exercise' as const, label: '💪 Exercise', count: allVideos.exercise.length },
  ];

  const videos = allVideos[activeTab];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Youtube className="w-6 h-6" />
          <h2 className="text-xl font-bold">Health Videos</h2>
        </div>
        <p className="text-red-100 text-sm">Curated health, yoga, exercise and nutrition videos from top YouTube channels</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 flex gap-2">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-red-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}>
            {tab.label} <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'}`}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.map((video, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gray-900 overflow-hidden cursor-pointer" onClick={() => setPlayingVideo(video.id)}>
              <img
                src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/320x180/1a1a2e/ffffff?text=Video'; }}
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-red-600 rounded-full p-3 shadow-lg transform scale-0 group-hover:scale-100 transition-transform">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                <Clock className="w-3 h-3" />{video.duration}
              </div>
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                <Youtube className="w-3 h-3" />YouTube
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 flex-1">{video.title}</h4>
              </div>
              <p className="text-xs text-gray-500 mb-3">{video.channel}</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-lg font-medium ${video.level === 'Beginner' ? 'bg-green-100 text-green-700' : video.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' : video.level === 'Advanced' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                  <BarChart2 className="inline w-3 h-3 mr-1" />{video.level}
                </span>
                <button onClick={() => setPlayingVideo(video.id)}
                  className="flex items-center gap-1.5 bg-red-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors font-medium">
                  <Play className="w-3 h-3 fill-white" />Watch
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {playingVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setPlayingVideo(null)}>
          <div className="w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold">{videos.find(v => v.id === playingVideo)?.title}</h3>
              <button onClick={() => setPlayingVideo(null)} className="text-white bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1&rel=0`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Health Video"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
