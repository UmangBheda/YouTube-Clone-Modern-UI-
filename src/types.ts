/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VideoSnippet {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  channelId: string;
  channelAvatar?: string;
  viewCount: string;
  publishedAt: string;
  duration?: string;
  description?: string;
}

export interface ChannelInfo {
  id: string;
  title: string;
  avatar: string;
  subscriberCount: string;
}

export interface VideoState {
  videos: VideoSnippet[];
  loading: boolean;
  error: string | null;
  selectedCategory: string;
}
