import cx from 'classnames';
import { ReactNode, useState } from 'react';
import Banner from './components/Banner';
import Sidebar from './components/Sidebar';
import { Plus_Jakarta_Sans } from '@next/font/google';

interface MainLayoutProps {
  children?: ReactNode;
  pageTitle?: string;
}
const plus_jakarta_sans = Plus_Jakarta_Sans({ subsets: ['latin'] });

const MainLayout: React.FC<MainLayoutProps> = ({ children, pageTitle }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isSidebarCollapsedFromSidebar, setIsSidebarCollapsedFromSidebar] =
    useState(true);

  const isCollapsed = isSidebarCollapsed && isSidebarCollapsedFromSidebar;

  return (
    <div
      className={cx(
        plus_jakarta_sans.className,
        'flex min-h-screen overflow-x-hidden'
      )}
    >
      <Sidebar
        actions={{
          triggerCollapse: () => setIsSidebarCollapsedFromSidebar(true),
          triggerUncollapse: () => setIsSidebarCollapsedFromSidebar(false),
        }}
        className={cx('py-10 px-4')}
        classNames={{
          sidebarCollapsed: 'w-20',
          sidebarUncollapsed: cx('w-[calc(100vw-((2*10)*0.25rem))]', 'md:w-80'),
        }}
        collapsed={isCollapsed}
      />
      <div className="flex flex-col flex-grow relative">
        <div
          className={cx(
            'absolute w-full h-full bg-black -z-10 opacity-0 transition-opacity ease-in-out',
            !isCollapsed && 'z-0 !opacity-75'
          )}
          onClick={() => setIsSidebarCollapsed(true)}
        />
        <Banner
          className={cx('pt-10 px-4 z-10')}
          pageTitle={pageTitle}
          sidebar={{
            isCollapsed: isSidebarCollapsed,
            triggerToggle: () => setIsSidebarCollapsed(!isSidebarCollapsed),
          }}
        />
        <main className={cx('flex-grow py-4 px-4')}>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
