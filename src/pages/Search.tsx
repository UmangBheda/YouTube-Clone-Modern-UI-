/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useParams, Link } from 'react-router-dom';
import { useSearch } from '../hooks/useYoutubeData';
import { SlidersHorizontal } from 'lucide-react';
import { SearchSkeleton } from '../components/ui/Shimmer';

export default function Search() {
  const { query } = useParams<{ query: string }>();
  const { results, loading } = useSearch(query || '');

  return (
    <div className="flex-1 max-w-[1200px] mx-auto p-4 lg:p-6 pb-20">
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-4">
        <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-full text-sm font-bold transition-colors">
          <SlidersHorizontal size={18} />
          <span>Filters</span>
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col gap-6 w-full">
          {[...Array(6)].map((_, i) => (
            <SearchSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {results.length > 0 ? (
            results.map((video) => (
              <div key={video.id} className="flex flex-col sm:flex-row gap-4 group">
                <Link to={`/video/${video.id}`} className="shrink-0">
                  <div className="w-full sm:w-[360px] aspect-video rounded-xl overflow-hidden bg-zinc-800">
                    <img src={video.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                  </div>
                </Link>
                <div className="flex flex-col flex-1 min-w-0 py-1">
                  <Link to={`/video/${video.id}`}>
                    <h3 className="text-lg md:text-xl font-medium leading-tight line-clamp-2">{video.title}</h3>
                  </Link>
                  <div className="text-xs text-zinc-400 mt-2 flex items-center gap-1">
                     <span>{video.publishedAt}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                     <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden text-[10px] font-bold">
                       {video.channelTitle.charAt(0)}
                     </div>
                     <span className="text-xs text-zinc-400 font-medium">{video.channelTitle}</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2 hidden md:block">
                    {video.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <h2 className="text-xl font-bold">No results found for "{query}"</h2>
              <p className="text-zinc-400 mt-2">Try different keywords or check your spelling.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
