import cx from 'classnames';
import { ReactNode, useState } from 'react';
import Banner from '../Banner';
import Sidebar from '../Sidebar';
import { Plus_Jakarta_Sans, Inter } from '@next/font/google';

interface PageLayoutProps {
  children?: ReactNode;
}
const plus_jakarta_sans = Inter({ subsets: ['latin'] });

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  // TODO: Values are related although formula doesn't make so much sense to me
  const sidebarXPaddingCns = 'px-10 md:px-4';
  const sidebarUncollapsedWidthCns = 'min-w-[calc(100vw-((5*10)*0.25rem))]';

  return (
    <div className={cx(plus_jakarta_sans.className, 'flex min-h-screen')}>
      <Sidebar
        className={cx('py-10', sidebarXPaddingCns)}
        classNames={{
          menuItemUncollapsed: cx(sidebarUncollapsedWidthCns),
        }}
        collapsed={isSidebarCollapsed}
      />
      <div className="flex flex-col flex-grow">
        <Banner
          className={cx('py-10', sidebarXPaddingCns)}
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
