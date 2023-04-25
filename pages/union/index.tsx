import { NextPageWithLayout } from '../_app';
import SocietyAdminLayout from '@components/layout/SocietyAdminLayout';
import useNavigation from 'src/hooks/useNavigation';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Search } from '@components/core/Form';
import ScrollableArea from '@components/core/ScrollableArea';
import ListItem from '@components/core/ListItem';
import {
  Society,
  Union,
  useGetAllSocietiesQuery,
  useGetAllUnionsQuery,
  Faq,
  User,
} from 'generated/graphql';
import { retrieveDays } from '@lib/days-retreiver';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import BasicTabbedArea, { Tab } from '@components/core/BasicTabbedArea';
import Image from 'next/image';
import {
  FaArrowLeft,
  FaHome,
  FaInfoCircle,
  FaPlus,
  FaSearch,
} from 'react-icons/fa';
import cx from 'classnames';
import { useForm } from 'react-hook-form';
import { ConfigurationServicePlaceholders } from 'aws-sdk/lib/config_service_placeholders';
import useApp from '@hooks/useApp';
import useModal from '@hooks/useModal';
import { RxCheck } from 'react-icons/rx';
import { useSession } from 'next-auth/react';
import { useQueryHelpers } from '@hooks/useQueryHelpers';
import {
  RequestUnionFromSocietyMutation,
  RequestUnionFromUserMutation,
} from 'src/graphql/union/mutations.graphql';
import useAlert from '@hooks/useAlert';

// societyRequestFromUser
// -- in = selectedSociety.userIds.includes(user.id)
// -- requested = selectedSociety.userRequests.include(user.id) || selectedSociety.id === requestedSocietyFromUser.id
// -- out = ELSE

// unionRequestFromUser
// -- in = selectedUnion.userIds.includes(user.id)
// -- requested = selectedUnion.userRequestIds.includes(user.id) || selectedUnion.id === requestedUnionFromUser.id
// -- out = ELSE

// unionRequestFromSociety
// -- in = selectedUnion.societyIds.includes(aGroup.id)
// -- requested = selectedUnion.societyRequestIds.include(aGroup.id) || selectedUnion.id === requestedUnionFromSociety.id
// -- out = ELSE

// requestSociety
// requestUnionFromUser
// requestUnionFromSociety

interface RequestButtonProps {
  from: 'SOCIETY' | 'USER';
  selectedUnion: Union | null;
}

const RequestButton: React.FC<RequestButtonProps> = ({
  from,
  selectedUnion,
}) => {
  const { data: session } = useSession();
  const { user } = session || {};
  const { aGroup } = useApp();

  const { dispatchModal, generateProceedOrCancelComponent } = useModal();
  const [requestedUnionId, setRequestedUnionId] = useState<string | null>(null);
  const { client } = useQueryHelpers();
  const { dispatchAlert } = useAlert();

  const handleUnionRequestFromUser = () => {
    dispatchModal(
      generateProceedOrCancelComponent({
        options: {
          prompt: `Are you sure?`,
          action: requestUnionFromUser,
        },
      })
    );
  };

  const handleUnionRequestFromSociety = () => {
    dispatchModal(
      generateProceedOrCancelComponent({
        options: {
          prompt: `Are you sure? If accepted you will be removed from your current union`,
          action: requestUnionFromSociety,
        },
      })
    );
  };

  const requestUnionFromUser = async () => {
    if (selectedUnion && selectedUnion.id && user) {
      const res = await client
        ?.mutation(RequestUnionFromUserMutation, {
          userId: user.id,
          unionId: selectedUnion.id,
        })
        .toPromise();
      if (!res.error) {
        setRequestedUnionId(selectedUnion.id);
        dispatchAlert({
          text: 'Request was successfully sent',
          type: 'success',
        });
      } else {
        dispatchAlert({
          text: 'An error occured',
          type: 'error',
        });
      }
    }
  };

  const requestUnionFromSociety = async () => {
    if (selectedUnion && selectedUnion.id && aGroup) {
      setRequestedUnionId(selectedUnion.id);
      const res = await client
        ?.mutation(RequestUnionFromSocietyMutation, {
          societyId: aGroup.id,
          unionId: selectedUnion.id,
        })
        .toPromise();
      if (!res.error) {
        dispatchAlert({
          text: 'Request was successfully sent',
          type: 'success',
        });
      } else {
        dispatchAlert({
          text: 'An error occured',
          type: 'error',
        });
      }
    }
  };

  // USER
  switch (from) {
    case 'USER':
      if (user) {
        if (selectedUnion?.userIds?.includes(user.id)) {
          // User is in Union
          return (
            <h4 className="inline-flex items-center gap-2 text-sm font-bold text-black bg-info px-4 py-1 rounded-md z-[1]">
              <FaHome className="text-white" /> My Union
            </h4>
          );
        }
        if (
          selectedUnion?.userRequestIds?.includes(user.id) ||
          selectedUnion?.id === requestedUnionId
        ) {
          // User is in Union
          return (
            <h4 className="inline-flex items-center gap-2 text-sm font-bold text-black bg-positive px-4 py-1 rounded-md z-[1]">
              <RxCheck className="text-white" /> Requested :)
            </h4>
          );
        }
      }
      return (
        <button
          className="inline-flex items-center gap-2 text-sm font-bold text-black bg-white px-4 py-1 rounded-md z-[1] hover:bg-white/80"
          onClick={handleUnionRequestFromUser}
        >
          <FaPlus className="text-green" /> Request from user
        </button>
      );

    case 'SOCIETY':
      if (aGroup) {
        if (aGroup.id) {
          if (selectedUnion?.societyIds?.includes(aGroup.id)) {
            // Society is in Union
            return (
              <h4 className="inline-flex items-center gap-2 text-sm font-bold text-black bg-info px-4 py-1 rounded-md z-[1]">
                <FaHome className="text-white" /> Society&apos;s Union
              </h4>
            );
          }
          if (
            selectedUnion?.societyRequestIds?.includes(aGroup.id) ||
            selectedUnion?.id === requestedUnionId
          ) {
            // Society is in Union
            return (
              <h4 className="inline-flex items-center gap-2 text-sm font-bold text-black bg-positive px-4 py-1 rounded-md z-[1]">
                <RxCheck className="text-white" /> Requested :)
              </h4>
            );
          }
        }
      }
      return (
        <button
          className="inline-flex items-center gap-2 text-sm font-bold text-black bg-white px-4 py-1 rounded-md z-[1] hover:bg-white/80"
          onClick={handleUnionRequestFromSociety}
        >
          <FaPlus className="text-green" /> Request from society
        </button>
      );

    default:
      return null;
  }
};

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
  const { aGroup, isASociety } = useApp();
  const router = useRouter();
  const currId = router.asPath.split('#')[1];
  const [activeTab, setActiveTab] = useState(currId || tabsFixture[0].id);
  const [selectedUnion, setSelectedUnion] = useState<Union | null>(null);

  useEffect(() => {
    setActiveNavItem('student-union');
  }, []);

  return (
    <>
      <div className="relative h-[350px] w-screen flex justify-center items-center">
        <div className="flex flex-col items-center space-y-2">
          <h3 className="text-2xl font-bold text-white bg-black px-4 py-1 rounded-md z-[1]">
            {selectedUnion ? selectedUnion.shortName : 'Select a Union'}
          </h3>

          {selectedUnion && selectedUnion.id && (
            <div className="flex flex-col items-start absolute top-4 left-4 space-y-2 z-10 md:flex-row md:space-y-0 md:space-x-2 md:right-4 md:left-[unset]">
              <RequestButton from="USER" selectedUnion={selectedUnion} />
              {isASociety && (
                <RequestButton from="SOCIETY" selectedUnion={selectedUnion} />
              )}
            </div>
          )}
        </div>
        {selectedUnion && selectedUnion.imageUrl ? (
          <Image
            src={selectedUnion.imageUrl}
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
  const [societiesRes] = useGetAllSocietiesQuery({
    variables: { verified: false },
  });
  const [result] = useGetAllUnionsQuery();
  const { data, fetching, error } = result;
  const { watch, register, reset } = useForm();
  const searchValue = watch('search');
  const [displayedUnions, setDisplayedUnions] = useState<any>([]);

  const unverifiedSocieties = useMemo(() => {
    if (!societiesRes.error) {
      return societiesRes.data?.Society;
    } else {
      return [];
    }
  }, [societiesRes.data?.Society, societiesRes.error]);

  const unions = useMemo(() => data?.Union, [data]);
  useEffect(() => {
    const filteredUnions = unions?.filter((union: any) =>
      union?.name.toLowerCase().includes(searchValue?.toLowerCase())
    );
    console.log(filteredUnions);
    setDisplayedUnions(filteredUnions);
  }, [searchValue, unions]);

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const handleUnverifiedClick = () => {
    console.log('ddd', unverifiedSocieties);
    const fakeUnion: Union = {
      societies: unverifiedSocieties,
      shortName: 'US',
      name: 'Unverified Societies',
      imageUrl: null,
      faqs: [],
    };
    setSelectedUnion(fakeUnion);
    router.push('/union#societies');
    setActiveTab('societies');
  };

  const handleClick = (union: Union) => {
    setSelectedUnion(union);
    router.push('/union#societies');
    setActiveTab('societies');
  };

  return (
    <ComponentWrapper>
      <div className="w-full space-y-8">
        <Search placeholder="Search for a union" {...register('search')} />
        <ScrollableArea>
          <div className="space-y-4">
            {displayedUnions?.map((union: Union) => (
              <ListItem
                key={union?.name}
                labels={{
                  topLeft: (
                    <div
                      className={cx(
                        'inline-flex bg-black px-2 py-1 rounded-sm font-bold text-white'
                      )}
                    >
                      {union?.shortName as string}
                    </div>
                  ),
                  middleLeft: union?.name as string,
                  bottomLeft: <p className="text-xs">{union?.uni?.name}</p>,
                }}
                imageUrl={union?.imageUrl as string}
                onClick={() => handleClick(union as any)}
              />
            ))}
          </div>
        </ScrollableArea>
        <button
          className="btn bg-black text-white gap-2"
          onClick={() => handleUnverifiedClick()}
        >
          <FaSearch />
          Search unverified societies
        </button>
      </div>
    </ComponentWrapper>
  );
};

const SocietiesComponent: React.FC<any> = ({ props }) => {
  const { selectedUnion } = props;
  const router = useRouter();

  const [result] = useGetAllSocietiesQuery();
  const { data, fetching, error } = result;
  const { watch, register, reset } = useForm();
  const searchValue = watch('search');
  const [displayedSocieties, setDisplayedSocieties] = useState<any>([]);

  const societies = useMemo(() => selectedUnion?.societies, [selectedUnion]);

  useEffect(() => {
    const filteredSocieties = societies?.filter((society: any) =>
      society?.name.toLowerCase().includes(searchValue?.toLowerCase())
    );

    if (filteredSocieties) setDisplayedSocieties(() => [...filteredSocieties]);
  }, [searchValue, societies]);

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <ComponentWrapper>
      <div className="w-full space-y-8">
        <Search placeholder="Search for a society" {...register('search')} />
        <ScrollableArea disabled>
          <div className="space-y-4">
            {selectedUnion && selectedUnion?.societies.length ? (
              displayedSocieties?.map((society: Society) => (
                <div key={society?.id}>
                  <NextLink
                    href={`/union/society/${society.id}`}
                    target="_blank"
                  >
                    {society && (
                      <ListItem
                        labels={{
                          topLeft: (
                            <div
                              className={cx(
                                'inline-flex bg-black px-2 py-1 rounded-sm font-bold text-white'
                              )}
                            >
                              {society?.shortName as string}
                            </div>
                          ),
                          middleLeft: society?.name as string,
                          bottomLeft: `Created ${retrieveDays(
                            society?.createdAt as string
                          )}`,
                        }}
                        imageUrl={society.imageUrl as string}
                      />
                    )}
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

const FAQsComponent: React.FC<any> = ({ props }) => {
  const { selectedUnion } = props;

  const { watch, register, reset } = useForm();
  const searchValue = watch('search');
  const [displayedFaqs, setDisplayedFaqs] = useState<any>([]);

  const faqs = selectedUnion?.faqs;

  useEffect(() => {
    const filteredFaqs = faqs?.filter((faq: any) =>
      faq?.question.toLowerCase().includes(searchValue?.toLowerCase())
    );
    setDisplayedFaqs(filteredFaqs);
  }, [searchValue, faqs]);

  return (
    <ComponentWrapper>
      <div className="space-y-16">
        <Search placeholder="Search for a question" {...register('search')} />
        <h2 className="text-lg md:text-2xl">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {!!displayedFaqs &&
            displayedFaqs.map((faq: Faq, i: number) => (
              <Accordian key={i} question={faq.question} answer={faq.answer} />
            ))}
          {!faqs?.length && <p className="text-grey3">No Faqs found</p>}
        </div>
      </div>
    </ComponentWrapper>
  );
};

export interface AccrodianProps {
  question: ReactNode;
  answer: ReactNode;
  className?: string;
}

export const Accordian: React.FC<AccrodianProps> = ({
  question,
  answer,
  className,
}) => {
  return (
    <div tabIndex={0} className={cx('collapse collapse-arrow', className)}>
      <div className="collapse-title font-extrabold inline-flex gap-2 items-center hover:text-positive focus:text-positive">
        <FaInfoCircle />
        {question}
      </div>
      <div className="collapse-content">{answer}</div>
    </div>
  );
};

Union.getLayout = (page) => <SocietyAdminLayout>{page}</SocietyAdminLayout>;

export default Union;
