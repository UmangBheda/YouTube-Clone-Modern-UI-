/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const VideoSkeleton = () => (
  <div className="flex flex-col gap-3 animate-pulse">
    <div className="aspect-video bg-white/5 rounded-xl w-full"></div>
    <div className="flex gap-3 mt-2">
      <div className="w-9 h-9 rounded-full bg-white/5 shrink-0"></div>
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-4 bg-white/5 rounded w-full"></div>
        <div className="h-3 bg-white/5 rounded w-2/3"></div>
      </div>
    </div>
  </div>
);

export const SearchSkeleton = () => (
  <div className="flex flex-col sm:flex-row gap-4 animate-pulse w-full">
    <div className="w-full sm:w-[360px] aspect-video rounded-xl bg-white/5 shrink-0"></div>
    <div className="flex flex-col flex-1 gap-3 py-1">
      <div className="h-6 bg-white/5 rounded w-3/4"></div>
      <div className="h-4 bg-white/5 rounded w-1/4"></div>
      <div className="flex items-center gap-2 mt-4">
        <div className="w-6 h-6 rounded-full bg-white/5"></div>
        <div className="h-3 bg-white/5 rounded w-32"></div>
      </div>
      <div className="h-3 bg-white/5 rounded w-full mt-2 hidden md:block"></div>
    </div>
  </div>
);

export const RelatedSkeleton = () => (
  <div className="flex gap-2 animate-pulse w-full">
    <div className="w-40 aspect-video rounded-lg bg-white/5 shrink-0"></div>
    <div className="flex-1 flex flex-col gap-2">
      <div className="h-4 bg-white/5 rounded w-full"></div>
      <div className="h-3 bg-white/5 rounded w-2/3"></div>
    </div>
  </div>
);
