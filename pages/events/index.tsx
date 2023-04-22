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
  useGetAllEventsQuery,
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

const Events: NextPageWithLayout = () => {
  const { setActiveNavItem } = useNavigation();
  const { isASociety, isAGuest, isAUnion, aGroup } = useApp();
  const [ref, inView] = useInView();

  useEffect(() => {
    setActiveNavItem('events');
  }, []);

  const [filter, setFilter] = useState({ open: false, tags: [] });
  const { client } = useQueryHelpers();
  const [displayedEvents, setDisplayedEvents] = useState<any>([]);

  const { watch, register, reset } = useForm();
  const searchValue = watch('search');
  const unionId = watch('union');
  const societyId = watch('society');
  const selectedTag = watch('selectedTag');

  const [unionsResult] = useGetAllUnionsQuery();
  const { UniSelectComponent, getUnionDomain } = useUniSelect();

  useEffect(() => {
    const updateEvents = async () => {
      if (isASociety && aGroup) {
        // set events to society specific events
        try {
          const getSocietyEventsRes = await client
            ?.query(GetAllEventsQuery, {
              societyId: aGroup.id,
              tags: filter.tags.length ? filter.tags : null,
            })
            .toPromise();
          if (!getSocietyEventsRes.error) {
            setDisplayedEvents(getSocietyEventsRes.data.Event);
          }
        } catch (err) {
          throw err;
        }
      } else if (isAUnion && aGroup) {
        try {
          const getUnionEventsRes = await client
            ?.query(GetAllEventsQuery, {
              unionId: aGroup.id,
              tags: filter.tags.length ? filter.tags : null,
            })
            .toPromise();
          if (!getUnionEventsRes.error) {
            setDisplayedEvents(getUnionEventsRes.data.Event);
          }
        } catch (err) {
          throw err;
        }
      } else if (isAGuest) {
        console.log('filter: ', filter.tags.length ? filter.tags : null);
        try {
          const getAllEventsRes = await client
            ?.query(GetAllEventsQuery, {
              societyId,
              unionId,
              tags: filter.tags.length ? filter.tags : null,
            })
            .toPromise();
          if (!getAllEventsRes.error) {
            console.log('guest: ', getAllEventsRes);

            setDisplayedEvents(getAllEventsRes.data.Event);
          }
        } catch (err) {
          throw err;
        }
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
  ]);

  const unions = useMemo(
    () =>
      unionsResult?.data?.Union?.map((u: any) => {
        const { id, name, societies } = u;
        return {
          id,
          name,
          societies,
        };
      }),
    [unionsResult?.data?.Union]
  );

  const handleClearFilter = () => {
    setFilter({ open: false, tags: [] });
    reset({ societyId: null, unionId: null });
  };

  useEffect(() => {
    if (selectedTag && !filter.tags.includes(selectedTag)) {
      setFilter((prev) => ({
        ...prev,
        tags: [...prev.tags, selectedTag],
      }));
    }
    reset((prev) => ({ ...prev, selectedTag: '' }));
  }, [selectedTag, reset, filter.tags]);

  return (
    <>
      <div className="bg-grey0 py-10 pt-16">
        <div className="relative container-lg min-h-[80vh] space-y-8">
          <div className="space-y-4">
            <div className="flex space-x-2">
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
                  onClick={() => setFilter((prev) => ({ ...prev, open: true }))}
                >
                  Filter By
                </button>
              )}
            </div>
            {filter.open && (
              <div className="space-y-4">
                {isAGuest && (
                  <UniSelectComponent
                    options={unions}
                    placeholder="Select a university"
                    uniDomain={getUnionDomain()}
                    {...register('union')}
                  />
                )}

                {watch('union') && isAGuest && (
                  <Control
                    type="select"
                    placeholder="Find your society"
                    options={unions
                      ?.find((u) => u.id === watch('union'))
                      ?.societies?.map((s: any) => ({
                        label: s.name,
                        value: s.id,
                      }))}
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
                  <div className="flex space-x-2">
                    {filter?.tags.map((tag) => (
                      <RemovableTag
                        className="bg-positive text-xs"
                        key={tag}
                        text={tag}
                        onClick={() =>
                          setFilter((prev) => ({
                            ...prev,
                            tags: prev?.tags.filter((t) => t !== tag),
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
                loading: !displayedEvents?.length,
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
  };
}

const EventList: React.FC<EventList> = ({ events, state }) => {
  const [futureEvents, setFutureEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const { isASociety } = useApp();

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
          <div className="space-y-4">
            {futureEvents?.map((event: Partial<Event>) => {
              return <EventComponent key={event?.id} {...event} />;
            })}
          </div>
          {isASociety && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold md:text-2xl">Past Events</h3>
              <div className="opacity-50">
                {pastEvents?.map((event: Partial<Event>) => {
                  return <EventComponent key={event?.id} {...event} />;
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const EventComponent: React.FC<Partial<Event>> = ({
  id,
  tags,
  name,
  society,
  thumbnailUrl,
  date,
}) => {
  const unionName = society?.union
    ? (('     |     ' + society?.union?.shortName) as string)
    : '';

  return (
    <div>
      <NextLink href={`/events/${id}`} target="_blank">
        <ListItem
          labels={{
            topLeft: <Tags tags={tags} />,
            middleLeft: name as string,
            bottomLeft: retrieveDays(date as string),
          }}
          imageUrl={thumbnailUrl as string}
          uni={{
            name: society?.shortName + unionName,
            verified: !!society?.union,
          }}
        />
      </NextLink>
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
        'bg-black px-2 py-1 rounded-sm font-bold text-white',
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
