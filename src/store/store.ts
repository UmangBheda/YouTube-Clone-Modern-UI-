/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { configureStore } from '@reduxjs/toolkit';
import videoReducer from './videoSlice';
import searchReducer from './searchSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    videos: videoReducer,
    search: searchReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { setSelectedCategory } from './videoSlice';
