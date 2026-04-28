/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchVideos } from '../store/videoSlice';
import { searchVideos } from '../store/searchSlice';
import { youtubeApi } from '../services/youtubeApi';
import { VideoSnippet } from '../types';

export const useVideos = (category: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { videos, loading, error } = useSelector((state: RootState) => state.videos);

  useEffect(() => {
    dispatch(fetchVideos(category));
  }, [category, dispatch]);

  return { videos, loading, error };
};

export const useSearch = (query: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { results, loading, error } = useSelector((state: RootState) => state.search);

  useEffect(() => {
    if (query) {
      dispatch(searchVideos(query));
    }
  }, [query, dispatch]);

  return { results, loading, error };
};

export const useVideoDetails = (videoId: string | undefined) => {
  const [video, setVideo] = useState<any>(null);
  const [relatedVideos, setRelatedVideos] = useState<VideoSnippet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!videoId) return;

    const loadDetails = async () => {
      setLoading(true);
      try {
        const [videoData, relatedData] = await Promise.all([
          youtubeApi.getVideoDetails(videoId),
          youtubeApi.getRelatedVideos(videoId)
        ]);

        if (videoData.items && videoData.items[0]) {
          setVideo(videoData.items[0]);
        }

        if (relatedData.items) {
          setRelatedVideos(relatedData.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
            channelTitle: item.snippet.channelTitle,
            channelId: item.snippet.channelId,
            publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
            viewCount: 'Related',
          })));
        }
      } catch (err) {
        console.error("Error loading video details:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [videoId]);

  return { video, relatedVideos, loading };
};
