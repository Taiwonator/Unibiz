import cx from 'classnames';
import { FaSearch } from 'react-icons/fa';
import { TextInput, TextInputProps } from './Control';

interface SearchProps extends TextInputProps {
  className?: string;
  classNames?: {
    input?: string;
  };
}

export const Search: React.FC<SearchProps> = (props) => {
  const { className, classNames } = props;
  return (
    <div className={cx('flex items-center gap-2', className)}>
      <FaSearch className="absolute ml-4 mt-1 text-grey3" />
      <TextInput
        className={cx('!bg-white pl-10', classNames?.input)}
        {...props}
      />
    </div>
  );
};
