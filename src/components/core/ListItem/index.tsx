import Image from 'next/image';
import cx from 'classnames';
import { FaStar } from 'react-icons/fa';
import { LoadingElement } from '@components/primitive/Loading';
import { ReactNode } from 'react';

interface ListItemProps {
  labels: {
    topLeft?: ReactNode;
    middleLeft?: ReactNode;
    bottomLeft?: ReactNode;
  };
  uni?: {
    name?: string;
    verified?: boolean;
  };
  imageUrl?: string;
  onClick?: () => void;
}

const ListItem: React.FC<ListItemProps> = ({
  labels = {},
  imageUrl,
  onClick,
  uni = {},
}) => {
  return (
    <div className={cx('transition-all', 'hover:bg-grey1')} onClick={onClick}>
      <div className="md:flex">
        <div className="relative w-full h-0 pb-[100%] bg-grey2 flex-shrink-0 flex-grow md:h-[unset] md:pb-0 md:max-w-[100px] overflow-hidden">
          {!imageUrl && <LoadingElement className="pb-[100%]" />}
          {imageUrl && (
            <Image
              src={imageUrl || ''}
              width={640}
              height={360}
              style={{
                objectFit: 'cover',
              }}
              alt="placeholder"
              className="absolute h-full w-full"
            />
          )}
        </div>
        <div className="grid flex-1 py-4 px-4 space-y-2 md:py-2 md:px-4">
          <div className="flex flex-row items-start md:flex-row md:items-start justify-between">
            <div className="order-1 space-y-2">
              <p className="uppercase text-xs">{labels?.topLeft}</p>
              <h3 className="text-lg font-medium">{labels?.middleLeft}</h3>
            </div>
            {uni.name && (
              <span className="inline-flex items-center gap-1 text-sm order-2 my-1 ">
                {uni.verified && (
                  <div className="tooltip" data-tip="Verified">
                    <FaStar className="text-positive" />
                  </div>
                )}{' '}
                {uni.name}
              </span>
            )}
          </div>
          <div className="self-end text-sm">{labels?.bottomLeft}</div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;

// const listItemsList = [
//   {
//     labels: {
//       topLeft: 'Faith',
//       middleLeft: 'Worship Society',
//       bottomLeft: '2 days to go',
//     },
//     uni: { name: 'LBORO', verified: true },
//   },
//   {
//     labels: {
//       topLeft: 'Prayer',
//       middleLeft: 'Community Service',
//       bottomLeft: '4 hours ago',
//     },
//     uni: { name: 'NYU', verified: false },
//   },
//   {
//     labels: {
//       topLeft: 'Love',
//       middleLeft: 'Marriage',
//       bottomLeft: '3 months to go',
//     },
//     uni: { name: 'MIT', verified: true },
//   },
//   {
//     labels: {
//       topLeft: 'Charity',
//       middleLeft: 'Fundraising',
//       bottomLeft: '1 week to go',
//     },
//     uni: { name: 'Stanford', verified: true },
//   },
//   {
//     labels: {
//       topLeft: 'Spirituality',
//       middleLeft: 'Meditation',
//       bottomLeft: 'Ongoing',
//     },
//     uni: { name: 'Harvard', verified: false },
//   },
// ];

{
  /* <ScrollableArea>
  <div className="w-full space-y-4">
    {listItemsList.map((item, i) => (
      <ListItem key={i} {...item} />
    ))}
  </div>
</ScrollableArea>; */
}
