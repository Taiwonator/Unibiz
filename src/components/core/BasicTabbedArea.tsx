import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import cx from 'classnames';
import { cloneElement } from 'react';
import { useRouter } from 'next/router';
import embellishPathname from '@lib/pathname-embellisher';
import useAlert from '@hooks/useAlert';

export interface Tab {
  alwaysActive?: boolean;
  id: string;
  disabled?: boolean;
  label: string;
  usesDisabledCondition?: boolean;
  Component: ReactElement;
}

interface Config {
  tabs: Tab[];
  disabledCondition?: boolean;
}

interface BasicTabbedAreaProps {
  config: Config;
  useTabState: () => [string, Dispatch<SetStateAction<string>>];
  props?: any;
}

const BasicTabbedArea: React.FC<BasicTabbedAreaProps> = ({
  config,
  useTabState,
  props,
}) => {
  const { disabledCondition } = config;
  const [activeTab, setActiveTab] = useTabState();
  const router = useRouter();
  const { dispatchAlert } = useAlert();

  const handleTabClick = (tab: Tab, disabled: boolean) => {
    console.log('disabled: ', disabled);
    if (!disabled) {
      if (tab.id !== activeTab) {
        if (!disabled) {
          setActiveTab(tab.id);
          router.push(
            `${embellishPathname(router.query, router.pathname)}#${tab.id}`
          );
        } else {
          dispatchAlert({
            text: 'This tab seems to be disabled',
            type: 'info',
          });
        }
      }
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const id = window.location.hash.substring(1);
      setActiveTab(id);
      router.replace(
        `${embellishPathname(router.query, router.pathname)}#${id}`
      );
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [router, setActiveTab]);

  return (
    <div className="space-y-4">
      <div className="space-x-8">
        {config.tabs.map((tab: Tab) => {
          const disabled: boolean =
            !!tab.disabled ||
            (!!tab.usesDisabledCondition && !!disabledCondition);
          return (
            <button
              key={tab.id}
              className={cx(
                'tab',
                tab.id === activeTab && 'tab-bordered tab-active',
                tab.alwaysActive && 'tab-active',
                disabled && 'text-grey3'
              )}
              onClick={() => handleTabClick(tab, disabled)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div>
        {config.tabs.map((tab: Tab) => (
          <div
            className={cx(activeTab === tab.id ? 'block' : 'hidden')}
            key={`${tab.label}_content`}
          >
            {cloneElement(tab.Component, {
              config,
              props,
              useTabState,
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BasicTabbedArea;
