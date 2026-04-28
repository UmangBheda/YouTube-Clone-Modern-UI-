/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { youtubeApi } from '../services/youtubeApi';
import { VideoSnippet } from '../types';

export const searchVideos = createAsyncThunk(
  'search/searchVideos',
  async (query: string) => {
    const data = await youtubeApi.getSearchResults(query);
    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      channelTitle: item.snippet.channelTitle,
      channelId: item.snippet.channelId,
      publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
      viewCount: 'Check channel',
      description: item.snippet.description,
    })) as VideoSnippet[];
  }
);

interface SearchState {
  results: VideoSnippet[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  results: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search videos';
      });
  },
});

export default searchSlice.reducer;
