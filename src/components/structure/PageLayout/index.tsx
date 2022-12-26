import cx from 'classnames';
import { ReactNode, useState } from 'react';
import Banner from '../Banner';
import Sidebar from '../Sidebar';
import { Plus_Jakarta_Sans } from '@next/font/google';

interface PageLayoutProps {
  children?: ReactNode;
}
const plus_jakarta_sans = Plus_Jakarta_Sans({ subsets: ['latin'] });

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isSidebarCollapsedFromSidebar, setIsSidebarCollapsedFromSidebar] =
    useState(true);

  const isCollapsed = isSidebarCollapsed && isSidebarCollapsedFromSidebar;

  // TODO: Values are related although formula doesn't make so much sense to me
  const sidebarXPaddingCns = 'px-4';

  return (
    <div
      className={cx(
        plus_jakarta_sans.className,
        'flex min-h-screen',
        'overflow-x-hidden'
      )}
    >
      <Sidebar
        actions={{
          triggerCollapse: () => setIsSidebarCollapsedFromSidebar(true),
          triggerUncollapse: () => setIsSidebarCollapsedFromSidebar(false),
        }}
        className={cx('py-10', sidebarXPaddingCns)}
        classNames={{
          sidebarCollapsed: 'w-20',
          sidebarUncollapsed: cx('w-[calc(100vw-((2*10)*0.25rem))]', 'md:w-80'),
        }}
        collapsed={isCollapsed}
      />
      <div className="flex flex-col flex-grow">
        <div
          className={cx(
            'absolute w-screen h-screen bg-black -z-10 opacity-0 transition-opacity ease-in-out',
            !isCollapsed && 'z-0 !opacity-75'
          )}
          onClick={() => setIsSidebarCollapsed(true)}
        />
        <Banner
          className={cx('py-10 z-10', sidebarXPaddingCns)}
          sidebar={{
            isCollapsed: isSidebarCollapsed,
            triggerToggle: () => setIsSidebarCollapsed(!isSidebarCollapsed),
          }}
        />
        <main className={cx('flex-grow min-w-[1000px]', sidebarXPaddingCns)}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
