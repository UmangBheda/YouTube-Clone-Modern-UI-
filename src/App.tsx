/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * LIBRARIES EXPLAINED:
 * 1. 'react-router-dom': The standard for navigating between different "pages" in a React App.
 * 2. 'react-redux': This allows our components to talk to our global "Brain" (Store). 
 *    If one page updates a video count, every other page knows about it immediately.
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Home from './pages/Home';
import VideoDetails from './pages/VideoDetails';
import Search from './pages/Search';

export default function App() {
  return (
    <Provider store={store}>
      {/*
       * BLOCK 1: REDUX PROVIDER
       * We wrap everything in <Provider>. This "broadcasts" our global data 
       * (like your account info or current search) to every single child component.
       */}
      <Router>
        {/*
         * BLOCK 2: ROUTER
         * The <Router> watches the address bar in your browser. 
         * If you type "/search", it tells React to change what is visible on the screen.
         */}
        
        {/* The main container: We use flexbox (flex-col) to stack the Navbar on top of the content */}
        <div className="flex flex-col min-h-screen bg-yt-black text-white">
          
          {/* NAVBAR: Stays at the top of every single page */}
          <Navbar />

          <div className="flex flex-1">
            {/* 
              BLOCK 3: ROUTES 
              This is like an 'if-else' statement for your URL. 
            */}
            <Routes>
              
              {/* IF path is "/" (the Home page) */}
              <Route
                path="/"
                element={
                  <div className="flex flex-1">
                    {/* On Home, we want both the Sidebar (left) and the video grid (Home) */}
                    <Sidebar />
                    <Home />
                  </div>
                }
              />
              
              {/* IF path is "/search/something" */}
              <Route
                path="/search/:query"
                element={
                  <div className="flex flex-1">
                    <Sidebar />
                    <Search />
                  </div>
                }
              />

              {/* 
                IF path is "/video/123" 
                Notice we don't include <Sidebar /> here because YouTube usually hides 
                the main sidebar when you are watching a video to give it more space.
              */}
              <Route path="/video/:id" element={<VideoDetails />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}
