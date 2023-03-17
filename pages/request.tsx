import { Control, UniSelect } from '@components/core/Form';
import MinimialLayout from '@components/layout/MinimalLayout';
import retreiveFirstName from '@lib/first-name-retreiver';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { FaThumbsUp } from 'react-icons/fa';
import { authOptions } from './api/auth/[...nextauth]';
import { NextPageWithLayout } from './_app';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

const Request: NextPageWithLayout = (props: any) => {
  const { user, unis } = props;

  const [uniDomain, setUniDomain] = useState<string | null>(null);

  const schema = yup.object().shape({
    uni: yup.string().required(),
  });

  const { register, getValues, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRequest = () => {
    const uni = unis.find((uni: any) => uni.name === getValues('uni'));
    const domain = uni.domains[0] || null;
    setUniDomain(domain);
  };

  return (
    <MinimialLayout>
      <div className="container-sm flex flex-col items-center justify-center py-8 min-h-[90vh] space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <h2 className="font-extrabold text-2xl inline-flex gap-2 items-center">
            Welcome {user && user.name && retreiveFirstName(user?.name)}
            <FaThumbsUp className="text-positive" />
          </h2>
          <p className="text-sm text-center">
            Which university are you currently part off?
          </p>
        </div>
        <form
          className="space-y-4 w-full"
          onChange={handleSubmit(handleRequest)}
          onSubmit={handleSubmit(handleRequest)}
        >
          <UniSelect
            options={unis}
            placeholder="Select a university"
            uniDomain={uniDomain}
            {...register('uni')}
          />

          <button className="btn bg-black w-full mt-8">Find Society</button>
        </form>
      </div>
    </MinimialLayout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  const unisRes = await fetch(
    'http://universities.hipolabs.com/search?country=United%20Kingdom'
  );
  const unis = await unisRes.json();

  const user = {
    ...session?.user,
    image: session?.user.image || null,
  };

  return {
    props: {
      unis,
      user,
    },
  };
}

export default Request;
