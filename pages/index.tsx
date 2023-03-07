import { NextPageWithLayout } from './_app';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const Home: NextPageWithLayout = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session?.user) {
    switch (session?.user.type) {
      case 'society_organiser':
        router.push('/society');
        break;
      case 'union_rep':
        router.push('/union');
        break;
      default:
        router.push('/society');
        break;
    }
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default Home;
