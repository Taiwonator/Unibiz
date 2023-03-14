import { NextPageWithLayout } from './_app';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import cx from 'classnames';
import Image from 'next/image';
import Navigation from '@components/structure/Navigation';
import SocietyAdminLayout from '@components/layout/SocietyAdminLayout';

const Home: NextPageWithLayout = () => {
  // const { data: session } = useSession();
  // const router = useRouter();
  // if (session?.user) {
  //   switch (session?.user.type) {
  //     case 'society_organiser':
  //       router.push('/society');
  //       break;
  //     case 'union_rep':
  //       router.push('/union');
  //       break;
  //     default:
  //       router.push('/society');
  //       break;
  //   }
  // }
  return (
    <>
      <div className="container-lg">Hello there</div>
    </>
  );
};

Home.getLayout = (page: ReactNode) => (
  <SocietyAdminLayout>{page}</SocietyAdminLayout>
);

export default Home;

// interface ContainerProps {
//   children: ReactNode;
// }

// const Container: React.FC<ContainerProps> = ({ children }) => {
//   return <div className={cx('max-w-screen-xl mx-auto px-6')}>{children}</div>;
// };
// Components to be made
// - - - - - - - -- - -- - - - --

// PRIMITIVES
// Container
// Stack
// Modal
// Alerts
// Scrollable Area
// Icons
// Grey Section
// Button

// CORE
// Navigation
// Form Items
// DropDownItems (For Nav Dropdwon and Model itelsm)
// List Item
// Tabbed Area

// Layouts to be made
// - - - - - - -- - - - - - - - - -

// Process
// Society Admin
// Society Attendee
// Union Admin
// Super Admin
