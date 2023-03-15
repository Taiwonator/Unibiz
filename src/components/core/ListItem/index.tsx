import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

interface ListItemProps {
  texts: {
    topLeft?: string;
    middleLeft?: string;
    bottomLeft?: string;
  };
  uni?: {
    name?: string;
    verified?: boolean;
  };
}

const ListItem: React.FC<ListItemProps> = ({ texts = {}, uni = {} }) => {
  return (
    <div>
      <div className="flex">
        <div className="relative w-[200px]">
          <Image
            src="http://via.placeholder.com/640x360"
            width={640}
            height={360}
            style={{
              objectFit: 'cover',
            }}
            alt="placeholder"
          />
        </div>
        <div className="grid flex-1 py-2 px-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="uppercase text-xs">{texts?.topLeft}</p>
              <h3 className="text-lg font-medium">{texts?.middleLeft}</h3>
            </div>
            {uni.name && (
              <span className="inline-flex items-center gap-1 text-sm">
                {uni.verified && <FaStar className="text-positive" />}{' '}
                {uni.name}
              </span>
            )}
          </div>
          <div className="self-end text-sm">{texts?.bottomLeft}</div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;

// const listItemsList = [
//   {
//     texts: {
//       topLeft: 'Faith',
//       middleLeft: 'Worship Society',
//       bottomLeft: '2 days to go',
//     },
//     uni: { name: 'LBORO', verified: true },
//   },
//   {
//     texts: {
//       topLeft: 'Prayer',
//       middleLeft: 'Community Service',
//       bottomLeft: '4 hours ago',
//     },
//     uni: { name: 'NYU', verified: false },
//   },
//   {
//     texts: {
//       topLeft: 'Love',
//       middleLeft: 'Marriage',
//       bottomLeft: '3 months to go',
//     },
//     uni: { name: 'MIT', verified: true },
//   },
//   {
//     texts: {
//       topLeft: 'Charity',
//       middleLeft: 'Fundraising',
//       bottomLeft: '1 week to go',
//     },
//     uni: { name: 'Stanford', verified: true },
//   },
//   {
//     texts: {
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
