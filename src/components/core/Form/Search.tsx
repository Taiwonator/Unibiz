import cx from 'classnames';
import { FaSearch } from 'react-icons/fa';
import { TextInput, TextInputProps } from './Control';
import { forwardRef } from 'react';

interface SearchProps extends Omit<TextInputProps, 'type'> {
  className?: string;
  classNames?: {
    input?: string;
  };
}

export const Search = forwardRef<any, SearchProps>((props, ref) => {
  const { className, classNames } = props;
  return (
    <div className={cx('flex relative items-center gap-2 w-full', className)}>
      <FaSearch className="absolute ml-4 mt-1 text-grey3" />
      <TextInput
        ref={ref}
        className={cx('!bg-white pl-10', classNames?.input)}
        type="text"
        {...props}
      />
    </div>
  );
});

Search.displayName = 'Search';
