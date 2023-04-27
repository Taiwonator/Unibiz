import { NextPageWithLayout } from '../_app';
import SocietyAdminLayout from '@components/layout/SocietyAdminLayout';
import useNavigation from 'src/hooks/useNavigation';
import { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import retreiveFirstName from '@lib/first-name-retreiver';
import { Control, Search, UniSelect } from '@components/core/Form';
import ScrollableArea from '@components/core/ScrollableArea';
import {
  Event,
  EventType,
  GetAllEventsDocument,
  GetAllEventsQueryVariables,
  useGetAllEventsQuery,
  useGetAllSocietiesQuery,
  useGetAllUnionsQuery,
} from 'generated/graphql';
import ListItem from '@components/core/ListItem';
import { retrieveDays } from '@lib/days-retreiver';
import useApp from '@hooks/useApp';
import NextLink from 'next/link';
import { LoadingElement } from '@components/primitive/Loading';
import { OperationContext, RequestPolicy, useQuery } from 'urql';
import {
  GetAllEventsQuery,
  GetEventBySocietyId,
  GetEventByUnionId,
  GetUnverifiedEventsQuery,
} from 'src/graphql/event/queries.graphql';
import { useQueryHelpers } from '@hooks/useQueryHelpers';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import { Bottom } from '@components/primitive/Overlay';
import useModal from '@hooks/useModal';
import useUniSelect from '@hooks/useUniSelect';
import cx from 'classnames';
import { Tag as RemovableTag } from './create';
import {
  FaAccessibleIcon,
  FaEdit,
  FaMagic,
  FaStar,
  FaThumbsUp,
  FaTrash,
} from 'react-icons/fa';
import { useRouter } from 'next/router';
import { DeleteEventMutation } from 'src/graphql/user/mutations.graphql';
import { RecommendEventMutation } from 'src/graphql/event/mutations.graphql';
import { GetUserByIdQuery } from 'src/graphql/user/queries.graphql';

const Events: NextPageWithLayout = () => {
  const { setActiveNavItem } = useNavigation();
  const { isASociety, isAGuest, isAUnion, aGroup } = useApp();
  const [ref, inView] = useInView();
  const { data: session } = useSession();
  const { user } = session || {};

  const [filter, setFilter] = useState<any>({ open: false, tags: [] });
  const { client } = useQueryHelpers();
  const [displayedEvents, setDisplayedEvents] = useState<any>([]);

  const { watch, register, reset } = useForm();
  const searchValue = watch('search');
  const unionId = watch('union');
  const societyId = watch('society');
  const selectedTag = watch('selectedTag');

  const [unionsResult] = useGetAllUnionsQuery();
  const { UniSelectComponent, getUnionDomain } = useUniSelect();

  const [recommendedEvents, setRecommendedEvents] = useState<Event[] | null>(
    null
  );
  const [recomendationChecked, setRecomendationChecked] = useState(false);
  const { dispatchModal } = useModal();

  const [societiesRes] = useGetAllSocietiesQuery({
    variables: { verified: false },
  });

  useEffect(() => {
    setActiveNavItem('events');
    if (localStorage.getItem('preventMagic') === String(true)) {
      setRecomendationChecked(true);
    }
  }, []);

  useEffect(() => {
    // Find recomendations
    const getRecommendations = async () => {
      if (user) {
        const userRes = await client
          ?.query(GetUserByIdQuery, { id: user.id })
          .toPromise();
        console.log(userRes);

        if (!userRes.error && userRes.data) {
          const eventsRes = await client
            ?.mutation(RecommendEventMutation, {
              likedEventIds: userRes.data.FindUserById.interestedEventIds,
            })
            .toPromise();
          console.log(eventsRes);
          if (!eventsRes.error && eventsRes.data) {
            if (!!eventsRes.data.RecommendEvent.length) {
              setRecommendedEvents(eventsRes.data.RecommendEvent);
            }
          }
        }
      }
    };
    getRecommendations();
  }, [user]);

  const handleRecommendButtonClick = () => {
    setRecomendationChecked(true);
    localStorage.setItem('preventMagic', JSON.stringify(true));
    if (recommendedEvents) {
      dispatchModal(
        <div className="space-y-4">
          <h3 className="text-lg font-bold uppercase inline-flex items-center gap-2">
            Magic Suggestions
            <FaMagic className="text-black" />
          </h3>
          <ScrollableArea className="w-full" disabled>
            <div className="space-y-2">
              {recommendedEvents.map((event: Partial<Event>, i: number) => (
                <NextLink
                  key={event.id}
                  className="block w-full text-left"
                  href={`/events/${event.id}`}
                >
                  <ListItem
                    labels={{
                      middleLeft: (
                        <p className="inline-flex gap-2 items-center">
                          <span className="font-bold">#{i + 1}</span>{' '}
                          {event.name}
                          {i === 0 && (
                            <div className="tooltip" data-tip="Best Guess">
                              <FaThumbsUp className="text-positive" />
                            </div>
                          )}
                        </p>
                      ),
                      bottomLeft: (
                        <p className="text-left text-xs border border-black text-black px-2 py-1 inline-flex">{`${retrieveDays(
                          event?.date as string
                        )}`}</p>
                      ),
                    }}
                    imageUrl={event.thumbnailUrl as string}
                  />
                </NextLink>
              ))}
            </div>
          </ScrollableArea>
        </div>
      );
    }
  };

  const unverifiedSocieties = useMemo(() => {
    if (!societiesRes.error) {
      return societiesRes.data?.Society;
    } else {
      return [];
    }
  }, [societiesRes.data?.Society, societiesRes.error]);

  useEffect(() => {
    const updateEvents = async () => {
      let args: GetAllEventsQueryVariables = {
        tags: filter.tags.length ? filter.tags : null,
      };
      if (isASociety && aGroup) {
        args = {
          ...args,
          societyId: aGroup.id,
        };
      } else if (isAUnion && aGroup) {
        args = {
          ...args,
          unionId: aGroup.id,
        };
      } else if (isAGuest) {
        args = {
          ...args,
          societyId,
          unionId,
        };
      }

      try {
        const res = await client?.query(GetAllEventsQuery, args).toPromise();
        if (!res.error) {
          setDisplayedEvents(res.data.Event);
        }
      } catch (err) {
        throw err;
      }
    };

    updateEvents();
  }, [
    isASociety,
    isAUnion,
    isAGuest,
    client,
    aGroup,
    unionId,
    societyId,
    filter,
    displayedEvents,
  ]);

  const unions = useMemo(() => {
    const realUnions = unionsResult?.data?.Union?.map((u: any) => {
      const { id, name, societies } = u;
      return {
        id,
        name,
        societies,
      };
    });
    return realUnions;
    // return [
    // ...realUnions,
    // {
    //   id: 'unverified',
    //   name: 'Unverified Universities',
    //   societies: unverifiedSocieties,
    // },
    // ];
  }, [unionsResult?.data?.Union]);

  const handleClearFilter = () => {
    setFilter({ open: false, tags: [] });
    reset({ societyId: null, unionId: null });
  };

  useEffect(() => {
    if (selectedTag) {
      if (!filter.tags.includes(selectedTag)) {
        setFilter((prev: any) => ({
          ...prev,
          tags: [...prev.tags, selectedTag],
        }));
      }
    }
    reset((prev) => ({ ...prev, selectedTag: '' }));
  }, [selectedTag, reset, filter.tags]);

  const getSocietyOptions = () => {
    return unions
      ?.find((u) => u.id === watch('union'))
      ?.societies?.map((s: any) => ({
        label: s.name,
        value: s.id,
      }));
  };

  return (
    <>
      <div className="bg-grey0 py-10 pt-16">
        <div className="relative container-lg min-h-[80vh] space-y-8">
          <div className="space-y-4">
            <div className="space-y-2 md:flex md:items-center md:space-x-2 md:space-y-0">
              <div className="flex space-x-2 md:flex-1">
                <Search
                  placeholder="Seach for event..."
                  {...register('search')}
                />
                {filter.open && (
                  <button
                    className="btn px-12 bg-black"
                    onClick={() => handleClearFilter()}
                  >
                    Clear Filter
                  </button>
                )}
                {!filter.open && (
                  <button
                    className="btn px-12 bg-black"
                    onClick={() =>
                      setFilter((prev: any) => ({ ...prev, open: true }))
                    }
                  >
                    Filter By
                  </button>
                )}
              </div>
              <button
                onClick={handleRecommendButtonClick}
                className={cx(
                  'btn bg-grey3 w-full md:w-[unset]',
                  recommendedEvents?.length &&
                    (recomendationChecked ? '!bg-black' : 'rainbow')
                )}
              >
                <FaMagic />
              </button>
            </div>
            {filter.open && (
              <div className="space-y-4">
                {isAGuest && (
                  <UniSelectComponent
                    options={unions as any}
                    placeholder="Select a university"
                    uniDomain={getUnionDomain()}
                    {...register('union')}
                  />
                )}

                {watch('union') && isAGuest && (
                  <Control
                    type="select"
                    placeholder="Find your society"
                    options={getSocietyOptions()}
                    {...register('society')}
                  />
                )}

                <div className="space-y-4">
                  <input value={filter.tags} hidden />
                  <Control
                    type="select"
                    placeholder="Select an tag"
                    options={Object.values(EventType).map((eType) => ({
                      label: eType,
                      value: eType,
                    }))}
                    {...register('selectedTag')}
                  />
                  <div className="flex space-x-2 overflow-x-scroll">
                    {filter?.tags.map((tag: any) => (
                      <RemovableTag
                        className="bg-positive text-xs"
                        key={tag}
                        text={tag}
                        onClick={() =>
                          setFilter((prev: any) => ({
                            ...prev,
                            tags: prev?.tags.filter((t: any) => t !== tag),
                          }))
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <ScrollableArea disabled>
            <EventList
              state={{
                loading: !displayedEvents?.length || !aGroup,
                searchValue,
              }}
              events={displayedEvents}
            />
          </ScrollableArea>
          {isASociety && (
            <>
              <div ref={ref}>
                <NextLink href={'/events/create'} target="_blank">
                  <button className="flex btn bg-black px-8 ml-auto">
                    Create Event
                  </button>
                </NextLink>
              </div>
              {!inView && (
                <Bottom>
                  <div className="flex justify-end">
                    <NextLink href={'/events/create'} target="_blank">
                      <button className="flex btn bg-black px-8 ml-auto">
                        Create Event
                      </button>
                    </NextLink>
                  </div>
                </Bottom>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

interface EventList {
  events: Partial<Event>[];
  state?: {
    loading?: boolean;
    searchValue?: string;
    unionId?: string;
  };
}

const EventList: React.FC<EventList> = ({ events, state }) => {
  const [futureEvents, setFutureEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const { isASociety, isAGuest, aGroup } = useApp();

  const getPastAndFutureEvents = useMemo(() => {
    return () => [sortFutureEvents(events), sortPastEvents(events)];
  }, [events]);

  const setEvents = useMemo(() => {
    return () => {
      const [f, s] = getPastAndFutureEvents();
      setFutureEvents(f);
      setPastEvents(s);
    };
  }, [getPastAndFutureEvents]);

  useEffect(() => {
    if (events) {
      setEvents();
    }
  }, [events, setEvents]);

  useEffect(() => {
    const [f, p] = getPastAndFutureEvents();
    if (state && state?.searchValue) {
      setFutureEvents(
        f.filter((event: any) =>
          event?.name.toLowerCase().includes(state?.searchValue?.toLowerCase())
        )
      );
      setPastEvents(
        p.filter((event: any) =>
          event?.name.toLowerCase().includes(state?.searchValue?.toLowerCase())
        )
      );
    } else {
      setEvents();
    }
  }, [state?.searchValue, state, setEvents, getPastAndFutureEvents]);

  return (
    <div>
      {state?.loading ? (
        <LoadingElement className="h-80 w-full" />
      ) : (
        <div className="space-y-12">
          <div className="space-y-16 md:space-y-4">
            {futureEvents?.map((event: Partial<Event>) => {
              return <EventComponent key={event?.id} {...event} editable />;
            })}
          </div>
          {isASociety && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold md:text-2xl">Past Events</h3>
              <div className="opacity-50">
                {pastEvents?.map((event: Partial<Event>) => {
                  return <EventComponent key={event?.id} {...event} editable />;
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface EventComponentProps extends Partial<Event> {
  editable?: boolean;
  isPublic?: boolean;
}

export const EventComponent: React.FC<EventComponentProps> = ({
  id,
  tags,
  name,
  society,
  thumbnailUrl,
  date,
  editable,
  isPublic,
}) => {
  const router = useRouter();
  const { context, client } = useQueryHelpers();
  const { dispatchModal, generateProceedOrCancelComponent } = useModal();
  const { isASociety } = useApp();

  const unionName = society?.union
    ? (('     |     ' + society?.union?.shortName) as string)
    : '';

  const handleEditEvent = (id: string) => {
    router.push(`/events/edit/${id}`);
  };

  const handleDeleteEvent = (id: string) => {
    dispatchModal(
      generateProceedOrCancelComponent({
        options: {
          prompt: `Deleting event: ${name}`,
          action: () => deleteEvent(id),
        },
      })
    );
  };

  const deleteEvent = async (id: string) => {
    try {
      const res = await client
        ?.mutation(DeleteEventMutation, { eventId: id })
        .toPromise();
      if (!res.error && res.data) {
        // console.log(res);
        router.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col items-start md:flex-row">
      <NextLink
        className="w-full"
        href={isPublic ? `/public/events/${id}` : `/events/${id}`}
        target="_blank"
      >
        <ListItem
          labels={{
            topLeft: <Tags tags={tags} />,
            middleLeft: name as string,
            bottomLeft: retrieveDays(date as string),
          }}
          imageUrl={thumbnailUrl as string}
          uni={{
            name: society ? society?.shortName + unionName : 'Deleted Society',
            verified: !!society?.union,
          }}
        />
      </NextLink>
      {editable && isASociety && (
        <div className="flex pt-1">
          <label
            tabIndex={0}
            htmlFor="my-modal"
            className="p-2 hover:text-positive"
            onClick={() => {
              handleEditEvent(id as string);
            }}
          >
            <FaEdit />
          </label>
          <button
            className="p-2 hover:text-red"
            onClick={() => handleDeleteEvent(id as string)}
          >
            <FaTrash />
          </button>
        </div>
      )}
    </div>
  );
};

interface TagsProps {
  tags: any;
}

export const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <div className="space-y-2 md:flex md:space-x-2 md:space-y-0">
      {tags?.map((tag: EventType) => (
        <Tag key={tag} text={tag || ''} />
      ))}
    </div>
  );
};

interface TagProps {
  text: string;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ className, text }) => {
  return (
    <div
      className={cx(
        'bg-black px-2 py-1 rounded-sm font-bold text-white max-w-10',
        className
      )}
    >
      {text}
    </div>
  );
};

Events.getLayout = (page) => <SocietyAdminLayout>{page}</SocietyAdminLayout>;

export default Events;

const sortFutureEvents = (events: any) => {
  if (events) {
    const todayTimestamp = moment().startOf('day').valueOf();
    const futureEvents = events.filter(
      (event: any) => Number(event.date) >= todayTimestamp
    );
    return futureEvents.sort((a: any, b: any) => a.date - b.date);
  }
};

const sortPastEvents = (events: any) => {
  if (events) {
    const todayTimestamp = moment().startOf('day').valueOf();
    const pastEvents = events.filter(
      (event: any) => Number(event.date) < todayTimestamp
    );
    return pastEvents.sort((a: any, b: any) => b.date - a.date);
  }
};

// guest - see all events (no past events)

// society_admin - see society events
// union_admin - see union events

// society SELECT
// union SELECT
// tags
