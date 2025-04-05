import Lottie from 'lottie-react';
import { Suspense } from 'react';
import MainLoading from '@assets/lottieFiles/mainLoading1.json';
const MainSuspense = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: '100vh' }}
        >
          <div className="w-25">
            <Lottie animationData={MainLoading} />
          </div>
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default MainSuspense;
