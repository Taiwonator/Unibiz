import { ReactNode, useEffect, useState, cloneElement } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import path from 'node:path/win32';
import { ReactElement } from 'react';
import embellishPathname from '@lib/pathname-embellisher';

interface TabbedAreaProps {
  activeTab: string;
  className?: string;
  classNames?: {
    linksContainer?: string;
    linksContainerInner?: string;
    tabsContainer?: string;
    tabsContainerInner?: string;
  };
  disabledCondition?: boolean;
  updateTab: (id: string) => void;
  tabs: TabProps[];
  others?: any;
}

export interface TabProps {
  alwaysActive?: boolean;
  default?: boolean;
  disabled?: boolean;
  usesDisabledCondition?: boolean;
  id: string;
  label: string;
  Component: ReactElement;
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

const TabbedArea: React.FC<TabbedAreaProps> = ({
  activeTab,
  className,
  classNames,
  disabledCondition,
  updateTab,
  tabs,
  others,
}) => {
  const router = useRouter();

  useEffect(() => {
    const handleHashChange = () => {
      const id = window.location.hash.substring(1);
      updateTab(id);
      router.replace(
        `${embellishPathname(router.query, router.pathname)}#${id}`
      );
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [router, updateTab]);

  return (
    <div className={className}>
      <div className={classNames?.linksContainer}>
        <div
          className={cx(
            'tabs gap-8 items-center',
            classNames?.linksContainerInner
          )}
        >
          {tabs.map((tab) => {
            const disabled =
              !tab.disabled && tab.usesDisabledCondition
                ? !disabledCondition
                : false;
            return (
              <>
                <a
                  key={tab.id}
                  href={disabled ? `#${activeTab}` : `#${tab.id}`}
                  className={cx(
                    'tab',
                    tab.id === activeTab && 'tab-bordered tab-active',
                    tab.alwaysActive && 'tab-active',
                    disabled && 'text-grey3'
                  )}
                  onClick={() => {
                    if (!disabled) updateTab(tab.id);
                  }}
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
            );
          })}
        </div>
      </div>
      <div className={classNames?.tabsContainer}>
        <div className={cx('carousel w-full', classNames?.tabsContainerInner)}>
          {tabs.map((tab, i) => {
            return (
              <div
                key={tab.id + 'tab'}
                id={`${tab.id}`}
                className="carousel-item w-full"
              >
                {cloneElement(tab.Component, { tab, tabs, updateTab, others })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabbedArea;
