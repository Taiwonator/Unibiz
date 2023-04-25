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
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useState } from 'react';
import Router, { useRouter } from 'next/router';
import useAlert from 'src/hooks/useAlert';

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const credentialsProvider = Object.values(providers).find(
    (p) => p.id === 'credentials'
  );

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const { closeAlert, dispatchAlert } = useAlert();
  const { register, getValues, handleSubmit } = useForm();

  const handleSignIn = async () => {
    if (!showPassword) {
      try {
        await yup
          .string()
          .email()
          .required()
          .validate(getValues('email'), { abortEarly: false });
        setShowPassword(true);
        // Input values are valid
      } catch (error: any) {
        // Input values are invalid
        console.error(error.errors);
      }
    } else {
      try {
        await schema.validate(
          {
            email: getValues('email'),
            password: getValues('password'),
          },
          { abortEarly: false }
        );
        const process = await signIn(credentialsProvider?.id, {
          email: getValues('email'),
          password: getValues('password'),
          redirect: false,
        });
        const { ok } = process as any;
        if (ok) {
          closeAlert();
          router.push('/events');
        } else {
          dispatchAlert({
            text: 'Incorect email or password',
            type: 'error',
          });
        }
      } catch (error: any) {
        console.error(error.errors);
      }
    }
  };

  return (
    <MinimialLayout>
      <div className="container-sm flex flex-col items-center justify-center h-[80vh] space-y-6">
        <div className="flex flex-col items-center">
          <Link href="/auth/signup" className="text-sm">
            Sign up
            <FaArrowRight className="text-positive" />
          </Link>
          <h2 className="font-extrabold text-2xl">Log in to Unibiz</h2>
        </div>
        <form className="space-y-2">
          <TextInput type="text" {...register('email')} />
          {showPassword && (
            <TextInput type="password" {...register('password')} />
          )}
          <button
            className="btn bg-black w-full"
            onClick={handleSubmit(handleSignIn)}
          >
            {showPassword ? 'Login to admin portal' : 'Continue with Email'}
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
  const session = (await getServerSession(
    context.req as any,
    context.res as any,
    authOptions as any
  )) as any;

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
