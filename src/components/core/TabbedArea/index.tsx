import { ReactNode, useEffect, useState } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface TabbedAreaProps {
  tabs: TabProps[];
}

interface TabProps {
  alwaysActive?: boolean;
  default?: boolean;
  id: string;
  dependantId?: string;
  label: string;
  Component: ReactNode;
}

export const tabsFixture: TabProps[] = [
  {
    alwaysActive: true,
    id: 'unions',
    label: 'Unions',
    Component: (
      <div>
        This is the content for Tab 1<a href="#societies">Go to Socieites</a>
      </div>
    ),
  },
  {
    id: 'societies',
    label: 'Societies',
    Component: (
      <div>
        This is the content for Tab 2<a href="#unions">Go back to Union</a>
      </div>
    ),
  },
  {
    id: 'faqs',
    label: 'FAQs',
    Component: (
      <div>
        This is the content for Tab 3<a href="#unions">Go back to Union</a>
      </div>
    ),
  },
];

const TabbedArea: React.FC<TabbedAreaProps> = ({ tabs }) => {
  const router = useRouter();

  const currId = router.asPath.split('#')[1];
  const [activeTab, setActiveTab] = useState(currId || tabs[0].id);

  useEffect(() => {
    const handleHashChange = () => {
      const id = window.location.hash.substring(1);
      setActiveTab(id);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div>
      <div className="tabs gap-8 items-center">
        {tabs.map((tab) => (
          <>
            <a
              key={tab.id}
              href={`#${tab.id}`}
              className={cx(
                'tab',
                tab.id === activeTab && 'tab-bordered tab-active',
                tab.alwaysActive && 'tab-active'
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </a>
            {tab.alwaysActive && (
              <a href={`#${tab.id}`}>
                {tab.id !== activeTab ? (
                  <FaChevronLeft />
                ) : (
                  <FaChevronRight className="opacity-50" />
                )}
              </a>
            )}
          </>
        ))}
      </div>
      <div className="carousel w-full">
        {tabs.map((tab, i) => (
          <div
            key={tab.id + 'tab'}
            id={`${tab.id}`}
            className="carousel-item w-full"
          >
            {tab.Component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabbedArea;
