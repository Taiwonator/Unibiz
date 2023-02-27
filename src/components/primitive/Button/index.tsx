import { ReactNode } from 'react';
import cx from 'classnames';

type ButtonType = 'primary' | 'secondary' | 'positive' | 'negative' | 'blank';
interface ButtonProps {
  children: ReactNode;
  type?: ButtonType;
  className?: string;
  onClick?: () => void;
  isIcon?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type = 'primary',
  isIcon,
  onClick,
}) => {
  const typeCnMap = {
    primary: 'bg-black text-white hover:bg-darkgrey active:bg-grey px-6 py-3',
    secondary:
      'border-black border-solid border-4 bg-white hover:bg-black hover:text-white active:bg-darkgrey px-6 py-3',
    positive:
      'border-black border-solid border-4 bg-green text-white hover:saturate-150 active:saturate-100 px-6 py-3',
    negative:
      'border-black border-solid border-4 bg-red text-white  hover:saturate-150 active:saturate-100 px-6 py-3',
    blank: '',
  };
  return (
    <button
      className={cx(
        'inline-flex items-center gap-2 font-bold rounded-lg text-body-m transition ease-in-out',
        isIcon && 'px-3',
        typeCnMap[type],
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
