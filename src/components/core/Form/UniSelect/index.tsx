import { useState } from '@storybook/addons';
import cx from 'classnames';
import Image from 'next/image';
import { SelectInput, SelectInputProps } from '../Control';
import { fixtures } from './fixtures';

interface UniSelectProps extends SelectInputProps {
  className?: string;
  classNames?: {
    input?: string;
  };
}

const transformFixtures = (fixture: any) => {
  return fixtures.map((uni) => ({
    value: uni.name!,
    label: uni.name!,
  }));
};

export const UniSelect: React.FC<UniSelectProps> = (props) => {
  //   const [selectedUni, setSelectedUni] = useState({});

  const {
    className,
    classNames,
    options = transformFixtures(fixtures),
  } = props;

  const uniLogo = `https://logo.clearbit.com/${fixtures[1].domains[0]}`;

  return (
    <div className={cx('flex items-center gap-2', className)}>
      <div className="absolute ml-4">
        <div className="relative max-w-[20px] rounded-full overflow-hidden">
          <Image
            src={uniLogo}
            width={100}
            height={100}
            style={{
              objectFit: 'cover',
            }}
            alt="placeholder"
          />
        </div>
      </div>
      <SelectInput
        className={cx('!bg-white pl-12', classNames?.input)}
        options={options}
        {...props}
      />
    </div>
  );
};
