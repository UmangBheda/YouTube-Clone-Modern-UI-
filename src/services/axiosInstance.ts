/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import axios from 'axios';

// default to a base URL, can be overridden by environment variables
const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    maxResults: '50'
  },
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY || '',
    'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
  },
});
