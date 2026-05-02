import React from 'react';
import Skeleton from './Skeleton';

export const MealCardSkeleton = () => (
  <div className="bg-cocoa border border-white/5 rounded-2xl p-5 space-y-4">
    <div className="flex justify-between items-start">
      <Skeleton className="w-24 h-6" />
      <Skeleton className="w-10 h-10 rounded-xl" />
    </div>
    <div className="space-y-2">
      <Skeleton className="w-3/4 h-5" />
      <Skeleton className="w-full h-4" />
    </div>
    <div className="flex gap-2 pt-2">
      <Skeleton className="w-16 h-6 rounded-full" />
      <Skeleton className="w-16 h-6 rounded-full" />
    </div>
    <div className="pt-4 flex justify-between items-center">
      <Skeleton className="w-20 h-5" />
      <Skeleton className="w-24 h-10 rounded-xl" />
    </div>
  </div>
);

export const StatSkeleton = () => (
  <div className="bg-cocoa border border-white/5 rounded-2xl p-5">
    <div className="flex items-center gap-4">
      <Skeleton className="w-12 h-12 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="w-16 h-4" />
        <Skeleton className="w-20 h-7" />
      </div>
    </div>
  </div>
);

export const ProfileSkeleton = () => (
  <div className="space-y-10">
    <div className="flex items-center gap-6">
      <Skeleton className="w-20 h-20 rounded-2xl" />
      <div className="space-y-3">
        <Skeleton className="w-48 h-8" />
        <Skeleton className="w-64 h-4" />
      </div>
    </div>
    <div className="flex gap-3">
      {[1, 2, 3, 4].map(i => <Skeleton key={i} className="w-24 h-10 rounded-xl" />)}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Skeleton className="h-64 rounded-2xl" />
      <Skeleton className="h-64 rounded-2xl" />
    </div>
  </div>
);
