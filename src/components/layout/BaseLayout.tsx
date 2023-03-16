import { ReactNode } from 'react';
import Alert from '@components/primitive/Alert';
import useAlert from 'src/hooks/useAlert';

interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const { alert, closeAlert } = useAlert();

  return (
    <>
      <div className="absolute left-[50%] top-20 w-screen z-20 container-md -translate-x-[50%]">
        <Alert type="error" open={alert.open} onClose={() => closeAlert()}>
          {alert.text}
        </Alert>
      </div>
      <div>{children}</div>
    </>
  );
};

export default BaseLayout;
