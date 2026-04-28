/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { youtubeApi } from '../services/youtubeApi';
import { VideoSnippet } from '../types';

import { mockVideos } from '../services/mockData';

export const fetchVideos = createAsyncThunk(
  'videos/fetchVideos',
  async (category: string) => {
    const data = await youtubeApi.getVideosByCategory(category);
    return data.items.map((item: any) => ({
      id: item.id.videoId || item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      channelTitle: item.snippet.channelTitle,
      channelId: item.snippet.channelId,
      publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
      viewCount: '1M+',
    })) as VideoSnippet[];
  }
);

interface VideoState {
  videos: VideoSnippet[];
  loading: boolean;
  error: string | null;
  selectedCategory: string;
}

const initialState: VideoState = {
  videos: [],
  loading: false,
  error: null,
  selectedCategory: 'New',
};

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    loadMockVideos: (state) => {
      state.videos = mockVideos.map(v => ({
        id: v.id,
        title: v.title,
        thumbnail: v.thumbnail,
        channelTitle: v.channelTitle,
        channelId: 'mock-channel',
        publishedAt: 'Recent',
        viewCount: '1M+'
      }));
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        const msg = action.error.message || 'Failed to fetch videos';
        state.error = msg;
        
        // If it's a subscription error, we can still show a message but maybe we want to log it
        if (msg.toLowerCase().includes('not subscribed')) {
          console.error("Critical: API Subscription Required. See UI for instructions.");
        }
      });
  },
});

export const { setSelectedCategory, loadMockVideos } = videoSlice.actions;
export default videoSlice.reducer;
