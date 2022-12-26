import cx from 'classnames';

interface LogoProps {
  collapsed?: boolean;
}

export const Profile: React.FC<LogoProps> = ({ collapsed }) => {
  return (
    <div className="font-bold flex items-center gap-2">
      <span className={cx('bg-white text-black rounded-full p-3')}>MT</span>
      {!collapsed && <p>Michael Taiwo</p>}
    </div>
  );
};
