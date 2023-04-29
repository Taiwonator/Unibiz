import { ReactNode, useEffect } from 'react';
import Alert from '@components/primitive/Alert';
import useAlert from 'src/hooks/useAlert';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { AppProvider } from '@context/AppContext';
import useApp from '@hooks/useApp';
import { useState } from 'react';
import useModal from '@hooks/useModal';
interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const { alert, closeAlert } = useAlert();
  const { Component, closeModal, isModalOpen } = useModal();

  return (
    <AuthProtect>
      <div className="fixed left-[50%] top-20 w-screen z-[100] container-md -translate-x-[50%]">
        <Alert type={alert.type} open={alert.open} onClose={() => closeAlert()}>
          {alert.text}
        </Alert>
      </div>
      <div>{children}</div>

      <input
        type="checkbox"
        id="my-modal"
        className="modal-toggle"
        checked={isModalOpen}
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal"
            className="btn btn-sm btn-circle bg-black absolute right-2 top-2"
            onClick={() => closeModal()}
          >
            ✕
          </label>
          {Component}
        </div>
      </div>
    </AuthProtect>
  );
};

interface AuthProtectProps {
  children: React.ReactNode;
}

const societyOnlyPaths: string[] = ['/health', '/dump'];
const adminOnlyPaths: string[] = ['/hub'];

const AuthProtect = ({ children }: AuthProtectProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { aGroup, isAGuest, isASociety, isAUnion } = useApp();

  useEffect(() => {
    if (status === 'loading') return;
    if (
      !session &&
      !router.pathname.includes('signup') &&
      !router.pathname.includes('public')
    )
      router.replace('/auth/signin');

    if (societyOnlyPaths.includes(router.pathname) && !isASociety) {
      router.replace('/events');
    }

    // Add union only paths

    if (adminOnlyPaths.includes(router.pathname) && isAGuest) {
      router.replace('/events');
    }

    if (router.pathname === '/') {
      router.replace('/events');
    }
  }, [isASociety, isAGuest, router, session, status]);

  return <>{children}</>;
};

export default BaseLayout;
