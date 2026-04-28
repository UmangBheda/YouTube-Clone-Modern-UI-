/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Home, Compass, PlaySquare, Clock, ThumbsUp, History, Film, Gamepad2, Trophy, Music2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setSelectedCategory } from '../../store/store';

const mainLinks = [
  { name: 'Home', icon: Home },
  { name: 'Shorts', icon: Compass },
  { name: 'Subscriptions', icon: PlaySquare },
];

const secondaryLinks = [
  { name: 'Library', icon: History },
  { name: 'History', icon: History },
  { name: 'Your Videos', icon: PlaySquare },
  { name: 'Watch Later', icon: Clock },
  { name: 'Liked Videos', icon: ThumbsUp },
];

const exploreLinks = [
  { name: 'Music', icon: Music2 },
  { name: 'Gaming', icon: Gamepad2 },
  { name: 'Sports', icon: Trophy },
  { name: 'Movies', icon: Film },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state: RootState) => state.videos.selectedCategory);
  const isOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);

  if (!isOpen) {
    return (
      <aside className="w-20 hidden lg:flex flex-col h-[calc(100vh-56px)] sticky top-14 bg-yt-black items-center py-4 gap-6">
        {[Home, Compass, PlaySquare, History].map((Icon, idx) => (
          <button key={idx} className="flex flex-col items-center gap-1 hover:bg-white/10 p-2 rounded-lg w-full transition-colors">
            <Icon size={24} />
            <span className="text-[10px]">{['Home', 'Shorts', 'Subs', 'Library'][idx]}</span>
          </button>
        ))}
      </aside>
    );
  }

  return (
    <aside className="w-60 hidden lg:flex flex-col h-[calc(100vh-56px)] sticky top-14 bg-yt-black overflow-y-auto px-2 scrollbar-hide pb-4 transition-all duration-300">
      <div className="flex flex-col gap-1 py-3 border-b border-white/10">
        {mainLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => dispatch(setSelectedCategory(link.name))}
            className={`flex items-center gap-5 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors ${
              selectedCategory === link.name ? 'bg-white/10 font-bold' : ''
            }`}
          >
            <link.icon size={22} className={selectedCategory === link.name ? 'text-white' : ''} />
            <span className="text-sm">{link.name}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-1 py-3 border-b border-white/10">
        {secondaryLinks.map((link) => (
          <button
            key={link.name}
            className="flex items-center gap-5 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <link.icon size={22} />
            <span className="text-sm">{link.name}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-1 py-3 border-b border-white/10">
        <h3 className="px-3 py-1 mb-1 text-sm font-bold text-zinc-400">Explore</h3>
        {exploreLinks.map((link) => (
          <button
            key={link.name}
            className="flex items-center gap-5 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <link.icon size={22} />
            <span className="text-sm">{link.name}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
