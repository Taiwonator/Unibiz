import cx from 'classnames';
import { useSession, signIn, signOut } from 'next-auth/react';

interface LogoProps {
  name?: string;
  collapsed?: boolean;
}

export const Profile: React.FC<LogoProps> = ({
  collapsed,
  name = 'Unauthenticated User',
}) => {
  const { data: session } = useSession();
  return (
    <div className="font-bold flex items-center gap-2">
      <span
        className={cx(
          'bg-white text-black rounded-full p-3 min-w-[48px] flex items-center justify-center'
        )}
      >
        {getInitials(name)}
      </span>
      {!collapsed && (
        <>
          <p>{name}</p>
          {session ? (
            <button className="z-30" onClick={() => signOut()}>
              sign out
            </button>
          ) : (
            <button className="z-30" onClick={() => signIn()}>
              sign in
            </button>
          )}
        </>
      )}
    </div>
  );
};

function getInitials(name: string): string {
  const nameArr = name.trim().split(' ');
  if (!nameArr.length) {
    return 'UU';
  }
  if (nameArr.length === 1) {
    return nameArr[0].charAt(0);
  } else {
    const firstInitial = nameArr[0].charAt(0);
    const secondInitial = nameArr[1].charAt(0);
    return `${firstInitial}${secondInitial}`;
  }
}
