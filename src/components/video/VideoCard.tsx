/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { VideoSnippet } from '../../types';
import { motion } from 'motion/react';

/**
 * PROPS DEFINITION:
 * This interface tells TypeScript exactly what "ingredients" this component needs.
 * It expects a 'video' object that follows the 'VideoSnippet' structure.
 */
interface VideoCardProps {
  video: VideoSnippet;
  key?: string | number;
}

/**
 * MAIN COMPONENT:
 * We are using a Functional Component. It takes the 'video' data and returns JSX (HTML-like code).
 */
export default function VideoCard({ video }: VideoCardProps) {
  return (
    /* 
      1. ANIMATION LAYER (Framer Motion):
      - 'initial': How the card looks when it first appears (faded out and slightly lower).
      - 'animate': The final state (full opacity and original position).
      - 'whileHover': What happens when the mouse is over it (lifts up 5 pixels).
    */
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-3 group"
    >
      {/* 
        2. THUMBNAIL SECTION:
        - We use 'Link' from react-router-dom to make the image clickable.
        - 'aspect-video' maintains a 16:9 ratio automatically.
      */}
      <Link to={`/video/${video.id}`} className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#272727]">
        <img
          src={video.thumbnail}
          alt={video.title}
          /* 'group-hover:scale-105' zooms the image slightly when the parent card is hovered */
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
        {/* If the video object has a duration (like 10:05), show the black timestamp box */}
        {video.duration && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[12px] font-medium px-1.5 py-0.5 rounded">
            {video.duration}
          </span>
        )}
      </Link>

      {/* 3. INFO SECTION (Channel Avatar, Title, etc.) */}
      <div className="flex gap-3">
        {/* CHANNEL AVATAR: Links to the channel page */}
        <Link to={`/channel/${video.channelId}`} className="shrink-0">
          <div className="w-9 h-9 rounded-full bg-zinc-700 overflow-hidden">
            {/* Logic: If we have an avatar image, show it. Otherwise, show the first letter of the channel name. */}
            {video.channelAvatar ? (
              <img src={video.channelAvatar} alt={video.channelTitle} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white text-xs font-bold uppercase">
                {video.channelTitle.charAt(0)}
              </div>
            )}
          </div>
        </Link>

        {/* TITLE AND METADATA */}
        <div className="flex flex-col flex-1 min-w-0">
          <Link to={`/video/${video.id}`}>
            {/* 'line-clamp-2' limits the title to 2 lines and adds "..." if it's too long */}
            <h3 className="font-bold text-sm line-clamp-2 leading-snug group-hover:text-white/90">
              {video.title}
            </h3>
          </Link>
          
          <div className="mt-1 text-[13px] text-zinc-400">
            {/* Channel Name */}
            <Link to={`/channel/${video.channelId}`} className="hover:text-white transition-colors">
              {video.channelTitle}
            </Link>
            
            {/* Views and Time: Separated by a dot (•) */}
            <div className="flex items-center gap-1 mt-0.5">
              <span>{video.viewCount} views</span>
              <span>•</span>
              <span>{video.publishedAt}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
