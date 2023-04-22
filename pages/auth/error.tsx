import MinimialLayout from '@components/layout/MinimalLayout';
import Link from '@components/primitive/Link';
import { useRouter } from 'next/router';
import { FaArrowLeft, FaSadCry } from 'react-icons/fa';
import cx from 'classnames';

const Error: React.FC = () => {
  const router = useRouter();
  const handleOnClick = () => {
    router.back();
  };
  return (
    <MinimialLayout>
      <div className="flex justify-center items-center w-screen h-[75vh]">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="inline-flex items-center gap-2 text-xl font-bold">
            An error has occured <FaSadCry className="text-errordark" />
          </h1>
          <p className="text-sm max-w-[20em]">
            We are sorry for the inconvience, please go back where you came from
          </p>
          <button
            className={cx(
              'inline-flex items-center gap-2 font-bold transition-all',
              'hover:text-positive'
            )}
            onClick={() => handleOnClick()}
          >
            <FaArrowLeft className="text-positive" /> Go back
          </button>
        </div>
      </div>
    </MinimialLayout>
  );
};

export default Error;
