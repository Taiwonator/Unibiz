import { NextPageWithLayout } from './_app';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';
import TabbedArea, { tabsFixture } from '@components/core/TabbedArea';
import Control, { TextInput } from '@components/core/Form/Control';
import { Search, UniSelect } from '@components/core/Form';

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
    <div className="space-y-4 container-lg py-4">
      <div>loading...</div>
    </div>
  );
};

export default Home;

// - - - - - - - -- - -- - - - --

// PRIMITIVES
// Container ✅
// Stack ✅
// Modal ✅
// Alerts ✅
// Scrollable Area ✅
// Icons ✅
// Grey Section ✅
// Button ✅

// CORE
// Navigation ✅
// Form Items
// DropDownItems (For Nav Dropdwon and Model itelsm) ✅
// List Item ✅
// Tabbed Area ✅

// Layouts to be made
// - - - - - - -- - - - - - - - - -

// Process
// Society Admin
// Society Attendee
// Union Admin
// Super Admin
