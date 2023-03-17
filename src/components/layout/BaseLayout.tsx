import { ReactNode, useEffect } from 'react';
import Alert from '@components/primitive/Alert';
import useAlert from 'src/hooks/useAlert';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const { alert, closeAlert } = useAlert();

  return (
    <AuthProtect>
      <div className="absolute left-[50%] top-20 w-screen z-20 container-md -translate-x-[50%]">
        <Alert type={alert.type} open={alert.open} onClose={() => closeAlert()}>
          {alert.text}
        </Alert>
      </div>
      <div>{children}</div>
    </AuthProtect>
  );
};

interface AuthProtectProps {
  children: React.ReactNode;
}

const AuthProtect = ({ children }: AuthProtectProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) router.replace('/auth/signin');
  }, [router, session, status]);

  return <>{children}</>;
};

export default BaseLayout;
