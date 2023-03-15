import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { getProviders, signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import MinimialLayout from '@components/layout/MinimalLayout';
import { FaArrowRight, FaGoogle } from 'react-icons/fa';
import Link from '@components/primitive/Link';
import { TextInput } from '@components/core/Form';

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const credentialsProvider = Object.values(providers).find(
    (p) => p.id === 'credentials'
  );
  console.log('provider: ', credentialsProvider);
  return (
    <MinimialLayout>
      <div className="container-sm flex flex-col items-center justify-center h-[80vh] space-y-6">
        <div className="flex flex-col items-center">
          <Link href="/api/auth/signup" className="text-sm">
            Sign up
          </Link>
          <h2 className="font-extrabold text-2xl">Log in to Unibiz</h2>
        </div>
        <form className="space-y-2">
          <TextInput type="text" />
          <button
            onClick={() => signIn(credentialsProvider?.id)}
            className="btn bg-black w-full"
          >
            Contiue with Email
          </button>
        </form>
        <div className="divider before:bg-black after:bg-black" />
        {Object.values(providers)
          .slice(0, 1)
          .map((provider) => (
            <div className="w-full" key={provider.name}>
              <button
                className="btn w-full bg-white !border-2 border-solid text-black gap-2 border-black hover:text-white hover:bg-positive hover:border-none"
                onClick={() => signIn(provider.id)}
              >
                <FaGoogle />
                Sign in with {provider.name}
              </button>
            </div>
          ))}
      </div>
    </MinimialLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
