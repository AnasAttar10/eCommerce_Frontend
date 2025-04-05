import Lottie from 'lottie-react';
import empty from '@assets/lottieFiles/empty.json';
import error from '@assets/lottieFiles/error.json';
import loading from '@assets/lottieFiles/loading.json';
import notFound from '@assets/lottieFiles/notFound.json';
import success from '@assets/lottieFiles/success.json';
import mainLoading from '@assets/lottieFiles/mainLoading.json';

const LottieHandlerMap = {
  empty,
  error,
  loading,
  notFound,
  mainLoading,
  success,
};
interface ILottieHandler {
  type: keyof typeof LottieHandlerMap;
  message?: string;
}
const LottieHandler = ({ type, message }: ILottieHandler) => {
  const targetLottie = LottieHandlerMap[type];
  return (
    <div>
      <div className="d-flex flex-row justify-content-center align-items-center h-75">
        <div className="w-25">
          <Lottie animationData={targetLottie} />
        </div>
      </div>
      {message && (
        <h3
          style={{
            textAlign: 'center',
            marginTop: '20px',
          }}
        >
          {message}
        </h3>
      )}
    </div>
  );
};

export default LottieHandler;
