import { LoadingElement } from '@components/primitive/Loading';
import cx from 'classnames';
import { Event } from 'generated/graphql';
import moment from 'moment';
import Image from 'next/image';
import { FaCertificate, FaEdit, FaHeart } from 'react-icons/fa';
import { RxHeart } from 'react-icons/rx';
import NextLink from 'next/link';
import useApp from '@hooks/useApp';

interface EventHeroProps {
  className?: string;
  event?: Partial<Event>;
}

const EventHero: React.FC<EventHeroProps> = ({ className, event }) => {
  const { aGroup } = useApp();
  if (!event)
    return <div className="grid relative min-h-[320px] bg-skeleton" />;

  const { name, society, bannerUrl, date, registerLink } = event;
  const hasUnion = (event: any) => !!event.society.union;

  return (
    <div className={cx('grid relative min-h-[320px]', className)}>
      {bannerUrl && (
        <Image
          src={bannerUrl}
          fill
          style={{
            objectFit: 'cover',
            zIndex: '-1',
          }}
          alt="placeholder"
          className="bg-grey0"
        />
      )}
      {!bannerUrl && (
        <LoadingElement className="absolute h-full w-full left-0 top-0 -z-10" />
      )}

      <div className="container-lg py-8 flex flex-col justify-between w-full h-full">
        <div className="flex flex-row justify-between">
          <div className="inline-flex relative items-center gap-2 text-white px-6 py-2 bg-black/75 rounded-md font-bold md:text-2xl">
            {hasUnion(event) && (
              <FaCertificate className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 text-positive" />
            )}
            <h3>{event?.society?.name}</h3>
            {hasUnion(event) && (
              <>
                <p className="text-purple">|</p>
                <h3>{event?.society?.union?.shortName}</h3>
              </>
            )}
          </div>

          {aGroup?.id === event?.society?.id && (
            <div className="tooltip" data-tip="Edit event">
              <NextLink href={`/events/edit/${event.id}`}>
                <button className="btn btn-circle !rounded-full bg-white text-black ml-auto hover:text-white">
                  <FaEdit />
                </button>
              </NextLink>
            </div>
          )}
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex rounded-md overflow-hidden">
            <div className="bg-purple text-white text-center py-2 px-6 space-y-1 md:space-y-0">
              <p className="font-bold text-2xl leading-[0.95em] md:text-5xl">
                {moment(Number(date)).date()}
              </p>
              <p className="leading-[0.95em] md:text-xl">
                {moment(Number(date)).format('MMM').toUpperCase()}
              </p>
            </div>
            <div className="bg-white text-black flex items-center px-4 space-x-4">
              <p className="text-xl font-bold md:text-5xl">{name}</p>
              {aGroup?.id !== event?.society?.id && (
                <button>
                  <RxHeart className="text-red text-2xl md:text-6xl" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventHero;
