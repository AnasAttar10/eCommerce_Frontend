import React, { Suspense } from 'react';
import LottieHandler from '../LottieHandler/LottieHandler';

const MySuspense = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<LottieHandler type="loading" />}>{children}</Suspense>
  );
};

export default MySuspense;
