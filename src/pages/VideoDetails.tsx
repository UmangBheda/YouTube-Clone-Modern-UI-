/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useParams, Link } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';
import { ThumbsUp, ThumbsDown, Share2, MoreHorizontal, Download } from 'lucide-react';
import { useVideoDetails } from '../hooks/useYoutubeData';
import { RelatedSkeleton } from '../components/ui/Shimmer';

export default function VideoDetails() {
  const { id } = useParams<{ id: string }>();
  const { video, relatedVideos, loading } = useVideoDetails(id);

  if (loading) return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6 max-w-[1700px] mx-auto">
      <div className="flex-1">
        <div className="aspect-video bg-white/5 rounded-xl animate-pulse"></div>
        <div className="mt-4 h-8 bg-white/5 rounded w-3/4 animate-pulse"></div>
        <div className="mt-6 flex flex-col gap-2">
           <div className="h-4 bg-white/5 rounded w-1/4 animate-pulse"></div>
           <div className="h-20 bg-white/5 rounded w-full animate-pulse mt-2"></div>
        </div>
      </div>
      <div className="lg:w-[400px] flex flex-col gap-4">
        {[...Array(6)].map((_, i) => (
          <RelatedSkeleton key={i} />
        ))}
      </div>
    </div>
  );

  if (!video) return <div className="p-10 text-center">Video not found.</div>;

  const snippet = video.snippet;
  const stats = video.statistics;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6 max-w-[1700px] mx-auto">
      <div className="flex-1 lg:max-w-[calc(100%-420px)]">
        <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-2xl">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            className="react-player"
            width="100%"
            height="100%"
            controls
            playing
          />
        </div>

        <div className="mt-4">
          <h1 className="text-xl font-bold line-clamp-2 leading-tight">
            {snippet.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden shrink-0 font-bold">
                  {snippet.channelTitle.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-base leading-none">{snippet.channelTitle}</h3>
                  <span className="text-zinc-400 text-xs mt-1">1.2M subscribers</span>
                </div>
              </div>
              <button className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm hover:bg-zinc-200 transition-colors ml-2">
                Subscribe
              </button>
            </div>

            <div className="flex items-center gap-2">
               <div className="flex items-center bg-white/10 rounded-full overflow-hidden">
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 border-r border-white/10 transition-colors">
                  <ThumbsUp size={20} />
                  <span className="text-sm font-bold">
                    {stats?.likeCount ? (parseInt(stats.likeCount) / 1000).toFixed(1) + 'K' : 'Like'}
                  </span>
                </button>
                <button className="px-4 py-2 hover:bg-white/10 transition-colors">
                  <ThumbsDown size={20} />
                </button>
              </div>

              <button className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors">
                <Share2 size={20} />
                <span className="text-sm font-bold">Share</span>
              </button>

              <button className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors hidden sm:flex">
                <Download size={20} />
                <span className="text-sm font-bold">Download</span>
              </button>

              <button className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>

          <div className="mt-4 bg-white/10 rounded-xl p-3 text-sm">
            <div className="font-bold mb-1">
              <span>{parseInt(stats?.viewCount || '0').toLocaleString()} views</span>
              <span className="ml-2">{new Date(snippet.publishedAt).toLocaleDateString()}</span>
            </div>
            <p className="text-white whitespace-pre-wrap leading-relaxed">
              {snippet.description}
            </p>
          </div>
        </div>
      </div>

      <div className="lg:w-[400px] shrink-0">
        <h3 className="text-lg font-bold mb-4 px-1">Up Next</h3>
        <div className="flex flex-col gap-4">
          {relatedVideos.map((v) => (
            <div key={v.id} className="flex gap-2">
              <Link to={`/video/${v.id}`} className="shrink-0">
                <div className="w-40 aspect-video rounded-lg overflow-hidden bg-zinc-800">
                  <img src={v.thumbnail} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </Link>
              <div className="flex flex-col min-w-0">
                <Link to={`/video/${v.id}`}>
                  <h4 className="text-sm font-bold line-clamp-2 leading-snug">{v.title}</h4>
                </Link>
                <span className="text-xs text-zinc-400 mt-1">{v.channelTitle}</span>
                <div className="text-[11px] text-zinc-400 mt-0.5">
                  <span>{v.publishedAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
