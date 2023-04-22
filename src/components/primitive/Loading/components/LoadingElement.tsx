import cx from 'classnames';

interface LoadingElementProps {
  className?: string;
}

export const LoadingElement: React.FC<LoadingElementProps> = ({
  className,
}) => {
  return (
    <span
      className={cx('inline-flex bg-skeleton rounded-md', className)}
    ></span>
  );
};
