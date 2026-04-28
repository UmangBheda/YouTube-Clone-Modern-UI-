/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useVideos } from '../hooks/useYoutubeData';
import VideoCard from '../components/video/VideoCard';
import { VideoSkeleton } from '../components/ui/Shimmer';
import { loadMockVideos } from '../store/videoSlice';

const categories = ['All', 'Music', 'Gaming', 'Mixes', 'Live', 'News', 'Comedy', 'Art', 'Sports', 'Learning', 'Fashion'];

export default function Home() {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState('All');
  const { videos, loading, error } = useVideos(activeCategory === 'All' ? 'New' : activeCategory);

  return (
    <div className="flex-1 min-w-0 pb-10">
      {error && !videos.length && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 m-4 rounded-xl text-sm flex flex-col gap-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl text-red-500">Subscription Required</h2>
            <div className="flex gap-2">
              <button 
                onClick={() => dispatch(loadMockVideos())} 
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all"
              >
                Show Demo Content
              </button>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-xs font-bold transition-all"
              >
                Retry
              </button>
            </div>
          </div>
          
          <div className="space-y-3 text-zinc-300">
            <p className="text-zinc-100">Aapka "RapidAPI Key" loaded hai, lekin aapne <b>"YouTube v3.1"</b> API subscribe nahi ki hai. Is wajah se videos load nahi ho rahi hain.</p>
            
            <div className="bg-black/40 p-4 rounded-lg border border-white/5 space-y-2">
              <p className="font-medium text-white">Yeh steps follow karein:</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Is link par jayein: <a href="https://rapidapi.com/Gajaai/api/youtube-v31/pricing" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">RapidAPI YouTube v3.1 Pricing</a></li>
                <li>Waha <b>"BASIC ($0.00)"</b> plan par <b>"Subscribe"</b> button dabayein.</li>
                <li>Subscribe karne ke baad yaha vapas aa kar <b>"Retry"</b> button dabayein.</li>
              </ol>
            </div>
            
            <p className="text-xs italic text-red-400/80">Note: Aapki screenshot mein "YouTube v3" dikh raha tha, lekin ye app "YouTube v3.1" (by Gajaai) use kar raha hai. Dono alag hain.</p>
          </div>
        </div>
      )}
      <div className="sticky top-14 z-40 bg-yt-black py-3 px-4 flex gap-3 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 px-4 mt-4">
          {[...Array(12)].map((_, i) => (
            <VideoSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 px-4 mt-4">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
