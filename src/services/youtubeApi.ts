/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { axiosInstance } from './axiosInstance';
import { mockVideos } from './mockData';

const API_KEY = import.meta.env.VITE_RAPID_API_KEY;

export const fetchFromAPI = async (url: string) => {
  if (!API_KEY || API_KEY === 'YOUR_RAPID_API_KEY' || API_KEY.includes('YOUR_')) {
    console.error("RapidAPI Key is missing or invalid. Check your environment variables.");
    throw new Error("Invalid API Key");
  }
  
  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error: any) {
    if (error.response?.data?.message?.includes('not subscribed')) {
      console.error("RapidAPI Error: You are not subscribed to this API. Please subscribe to the BASIC plan on RapidAPI.");
    }
    throw error;
  }
};

const wrapWithFallback = async (apiCall: () => Promise<any>, mockReturn: any) => {
  try {
    return await apiCall();
  } catch (error) {
    console.warn("API Error, returning mock data:", error);
    return { items: mockReturn };
  }
};

export const youtubeApi = {
  getTrendingVideos: () => fetchFromAPI('/videos?part=snippet,statistics&chart=mostPopular&regionCode=US'),
  getVideosByCategory: (category: string) => fetchFromAPI(`/search?part=snippet,id&q=${category}&type=video`),
  getSearchResults: (query: string) => fetchFromAPI(`/search?part=snippet,id&q=${query}&type=video`),
  getRelatedVideos: (videoId: string) => wrapWithFallback(() => fetchFromAPI(`/search?part=snippet,id&relatedToVideoId=${videoId}&type=video`), mockVideos),
  getVideoDetails: (videoId: string) => wrapWithFallback(
    () => fetchFromAPI(`/videos?part=snippet,statistics&id=${videoId}`),
    mockVideos.filter(v => v.id === videoId).map(v => ({
      id: v.id,
      snippet: { title: v.title, description: v.description || v.title, channelTitle: v.channelTitle, publishedAt: new Date().toISOString(), thumbnails: { high: { url: v.thumbnail } } },
      statistics: { viewCount: '1000000', likeCount: '50000' }
    }))
  ),
  getChannelDetails: (channelId: string) => fetchFromAPI(`/channels?part=snippet,statistics&id=${channelId}`),
};
