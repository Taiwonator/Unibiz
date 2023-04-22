import { useState } from '@storybook/addons';
import cx from 'classnames';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { SelectInput, SelectInputProps } from '../Control';
import { fixtures } from './fixtures';
import { forwardRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

interface UniSelectProps extends SelectInputProps {
  className?: string;
  classNames?: {
    input?: string;
  };
  uniDomain: string | undefined;
}

const transformFixtures = (fixtures: any) => {
  return fixtures.map((uni: any) => ({
    value: uni.id,
    label: uni.name,
  }));
};

export const UniSelect = forwardRef<HTMLInputElement, UniSelectProps>(
  (props, ref) => {
    const { className, classNames, options, uniDomain } = props;
    const uniLogo = `https://logo.clearbit.com/${uniDomain}`;

    return (
      <div className={cx('flex items-center gap-2', className)}>
        <div className="absolute ml-4">
          <div className="relative max-w-[20px] rounded-full overflow-hidden">
            {uniDomain ? (
              <Image
                src={uniLogo}
                width={100}
                height={100}
                style={{
                  objectFit: 'cover',
                }}
                alt="placeholder"
              />
            ) : (
              <FaSearch />
            )}
          </div>
        </div>
        <SelectInput
          {...props}
          className={cx('!bg-white pl-12', classNames?.input)}
          options={transformFixtures(options)}
          ref={ref}
        />
      </div>
    );
  }
);

UniSelect.displayName = 'UniSelect';
