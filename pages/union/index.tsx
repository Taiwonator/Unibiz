import { NextPageWithLayout } from '../_app';
import SocietyAdminLayout from '@components/layout/SocietyAdminLayout';
import useNavigation from 'src/hooks/useNavigation';
import { ReactNode, useEffect, useState } from 'react';
import { Search } from '@components/core/Form';
import ScrollableArea from '@components/core/ScrollableArea';
import ListItem from '@components/core/ListItem';
import {
  Society,
  Union,
  useGetAllSocietiesQuery,
  useGetAllUnionsQuery,
} from 'generated/graphql';
import { retrieveDays } from '@lib/days-retreiver';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import BasicTabbedArea, { Tab } from '@components/core/BasicTabbedArea';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';
import cx from 'classnames';

const Union: NextPageWithLayout = () => {
  const tabsFixture: Tab[] = [
    {
      alwaysActive: true,
      id: 'unions',
      label: 'Unions',
      Component: <UnionsComponent />,
    },
    {
      id: 'societies',
      label: 'Societies',
      usesDisabledCondition: true,
      Component: <SocietiesComponent />,
    },
    {
      id: 'faqs',
      label: 'FAQs',
      usesDisabledCondition: true,
      Component: <FAQsComponent />,
    },
  ];

  const [tabs, setTabs] = useState(tabsFixture);

  const { setActiveNavItem } = useNavigation();
  const router = useRouter();
  const currId = router.asPath.split('#')[1];
  const [activeTab, setActiveTab] = useState(currId || tabsFixture[0].id);
  const [selectedUnion, setSelectedUnion] = useState<Union | null>(null);

  useEffect(() => {
    setActiveNavItem('student-union');
  }, []);

  return (
    <>
      <div className="relative h-60 w-screen flex justify-center items-center">
        <h3 className="text-2xl font-bold text-white bg-black px-4 py-1 rounded-md z-[1]">
          {selectedUnion ? selectedUnion.shortName : 'Select a Union'}
        </h3>
        {selectedUnion ? (
          <Image
            src="https://source.unsplash.com/random/1920x1080?sig=1"
            fill
            style={{
              objectFit: 'cover',
              zIndex: '-1',
            }}
            alt="placeholder"
          />
        ) : (
          <div className="absolute w-full h-full bg-skeleton left-0 top-0 -z-1"></div>
        )}
      </div>
      <div className="container-lg pt-16 pb-32">
        <BasicTabbedArea
          config={{ tabs, disabledCondition: !selectedUnion }}
          useTabState={() => [activeTab, setActiveTab]}
          props={{
            selectedUnion,
            setSelectedUnion,
          }}
        />
      </div>
    </>
  );
};

interface ComponentWrapperProps {
  children: ReactNode;
}

const ComponentWrapper: React.FC<ComponentWrapperProps> = ({ children }) => {
  return <div className="grid w-full py-8 px-2">{children}</div>;
};

const UnionsComponent: React.FC<any> = ({ useTabState, props }) => {
  const { setSelectedUnion } = props;
  const [_, setActiveTab] = useTabState();

  const router = useRouter();
  const [result] = useGetAllUnionsQuery();
  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const handleClick = (union: Union) => {
    setSelectedUnion(union);
    router.push('/union#societies');
    setActiveTab('societies');
  };

  return (
    <ComponentWrapper>
      <div className="w-full space-y-8">
        <Search placeholder="Search for a union" />
        <ScrollableArea>
          <div className="space-y-4">
            {data?.Union?.map((union) => (
              <ListItem
                key={union?.name}
                labels={{
                  topLeft: union?.shortName as string,
                  middleLeft: union?.name as string,
                  bottomLeft: retrieveDays(union?.createdAt as string),
                }}
                onClick={() => handleClick(union as any)}
              />
            ))}
          </div>
        </ScrollableArea>
      </div>
    </ComponentWrapper>
  );
};

const SocietiesComponent: React.FC<any> = ({ props }) => {
  const { selectedUnion } = props;
  const router = useRouter();

  const [result] = useGetAllSocietiesQuery();
  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <ComponentWrapper>
      <div className="w-full space-y-8">
        <Search placeholder="Search for a society" />
        <ScrollableArea>
          <div className="space-y-4">
            {selectedUnion && selectedUnion?.societies.length ? (
              selectedUnion.societies.map((society: Society) => (
                <div key={society?.name}>
                  <NextLink
                    href={`/union/society/${society.id}`}
                    target="_blank"
                  >
                    <ListItem
                      labels={{
                        topLeft: society?.shortName as string,
                        middleLeft: society?.name as string,
                        bottomLeft: retrieveDays(society?.createdAt as string),
                      }}
                    />
                  </NextLink>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <p className="text-center text-grey4">No societies found</p>
                <button
                  className={cx(
                    'inline-flex items-center gap-2 font-bold transition-all',
                    'hover:text-positive'
                  )}
                  onClick={() => router.back()}
                >
                  <FaArrowLeft className="text-positive" /> Go back
                </button>
              </div>
            )}
          </div>
        </ScrollableArea>
      </div>
    </ComponentWrapper>
  );
};

const FAQsComponent: React.FC = () => {
  return <ComponentWrapper>FAQs Component</ComponentWrapper>;
};

Union.getLayout = (page) => <SocietyAdminLayout>{page}</SocietyAdminLayout>;

export default Union;
