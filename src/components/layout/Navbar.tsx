/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Bell, Video, User, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../store/uiSlice';

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleSidebar());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm('');
    }
  };

  return (
    <nav className="flex items-center justify-between px-4 py-2 sticky top-0 z-50 bg-yt-black h-14">
      <div className="flex items-center gap-4">
        <button 
          onClick={handleToggle}
          className="p-2 hover:bg-white/10 rounded-full cursor-pointer lg:block hidden transition-colors"
        >
          <Menu size={24} />
        </button>
        <Link to="/" className="flex items-center gap-1">
          <div className="bg-red-600 rounded-lg p-0.5 px-1 font-bold italic tracking-tighter text-sm">TV</div>
          <span className="font-bold text-xl tracking-tighter">YouTube</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 max-w-2xl mx-4 hidden md:flex items-center">
        <div className="flex w-full items-center bg-[#121212] border border-white/10 rounded-full overflow-hidden focus-within:border-blue-500">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent px-4 py-1.5 outline-none text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="bg-white/10 px-5 py-1.5 hover:bg-white/20 border-l border-white/10">
            <Search size={20} />
          </button>
        </div>
      </form>

      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-white/10 rounded-full cursor-pointer md:hidden">
          <Search size={24} />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-full cursor-pointer hidden sm:block">
          <Video size={24} />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-full cursor-pointer hidden sm:block">
          <Bell size={24} />
        </button>
        <button className="p-1 hover:bg-white/10 rounded-full cursor-pointer">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <User size={20} />
          </div>
        </button>
      </div>
    </nav>
  );
}
