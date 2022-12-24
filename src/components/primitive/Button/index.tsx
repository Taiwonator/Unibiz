import { ReactNode } from 'react';
import cx from 'classnames';

interface ButtonProps {
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button className="opacity-50">{children}</button>;
};

export default Button;
