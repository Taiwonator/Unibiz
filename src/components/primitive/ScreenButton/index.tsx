import cx from 'classnames';
import { ReactNode } from 'react';

interface ScreenButtonProps {
  children: ReactNode;
}

const ScreenButton: React.FC<ScreenButtonProps> = ({ children }) => {
  return (
    <button
      className={cx(
        'w-full h-full border-black border-solid border-4 rounded-lg flex items-center justify-center flex-col transition-all',
        'hover:text-white hover:bg-black',
        'focus-visible:text-white focus-visible:bg-black',
        'active:bg-black/90'
      )}
    >
      {children}
    </button>
  );
};

export default ScreenButton;
