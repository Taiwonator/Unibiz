import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useModal from './useModal';

interface Options {
  condition?: boolean;
}

function useConfirmNavigation(options?: Options) {
  const router = useRouter();
  const { dispatchModal, generateProceedOrCancelComponent } = useModal();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (options?.condition)
        if (router.asPath !== url) {
          const confirmed = window.confirm(
            'Are you sure you want to leave this page? Your changes may not be saved.'
          );
          if (!confirmed) {
            router.events.emit('routeChangeError');
            throw 'routeChange aborted.';
          }

          // dispatchModal(
          //   generateProceedOrCancelComponent({
          //     options: {
          //       prompt: `Your changes will be lost`,
          //       action: () => confirm(),
          //     },
          //   })
          // );
          // const confirm = () => {
          //   router.events.emit('routeChangeError');
          //   throw 'routeChange aborted.';
          // };
        }
    };

    // Listen for the route change event
    router.events.on('routeChangeStart', handleRouteChange);

    // Cleanup the event listener
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router, options?.condition]);
}

export default useConfirmNavigation;
