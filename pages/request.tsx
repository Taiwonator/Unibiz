import { Control, UniSelect } from '@components/core/Form';
import { fixtures } from '@components/core/Form/UniSelect/fixtures';
import MinimialLayout from '@components/layout/MinimalLayout';
import retreiveFirstName from '@lib/first-name-retreiver';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { FaArrowRight, FaThumbsUp } from 'react-icons/fa';
import { authOptions } from './api/auth/[...nextauth]';
import { NextPageWithLayout } from './_app';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { initUrqlClient } from 'next-urql';
import { GetAllUnionsQuery } from 'src/graphql/union/queries.graphql';
import { Society, Uni, Union } from 'generated/graphql';
import Link from '@components/primitive/Link';
import useAlert from 'src/hooks/useAlert';
import useUniSelect from '@hooks/useUniSelect';

const Request: NextPageWithLayout = (props: any) => {
  const { user, unions } = props;

  const { dispatchAlert } = useAlert();
  const { UniSelectComponent, setUnion, getUnionDomain } = useUniSelect();

  const [selectedUnion, setSelectedUnion] = useState<Union | null>(null);
  const [selectedSociety, setSelectedSociety] = useState<Society | null>(null);
  const [showSocietySelector, setShowSocietySelector] = useState(false);
  const [showHomeButton, setShowHomeButton] = useState(false);

  const schema = yup.object().shape({
    union: yup.string().required(),
    society: yup.string(),
  });

  const { register, getValues, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChange = () => {
    const union = unions.find(
      (union: Union) => union.name === getValues('union')
    );
    setUnion(union);
    setSelectedUnion(union);
    if (selectedUnion) {
      const society =
        selectedUnion.societies?.find(
          (society) => society?.name === getValues('society')
        ) || {};
      setSelectedSociety(society);
    }
  };

  type Request = 'union' | 'society';
  const handleRequest = (type: Request) => {
    if (type === 'union') {
      dispatchAlert({
        text: `union request has been sent (${selectedUnion?.name})`,
        type: 'success',
        time: 5000,
      });
      setShowHomeButton(true);
    } else {
      console.log('selectedSociety', selectedSociety);
      dispatchAlert({
        text: `society request has been sent (${selectedSociety?.name})`,
        type: 'success',
        time: 5000,
      });
      setShowHomeButton(true);
    }
  };

  console.log('unions":', unions);

  return (
    <MinimialLayout>
      <div className="container-md flex flex-col items-center justify-center py-8 min-h-[90vh] space-y-12">
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
          onChange={handleSubmit(handleChange)}
        >
          <UniSelectComponent
            options={unions}
            placeholder="Select a university"
            uniDomain={getUnionDomain()}
            {...register('union')}
          />
          {selectedUnion?.societies?.length && showSocietySelector ? (
            <Control
              type="select"
              placeholder="Find your society"
              options={selectedUnion?.societies?.map((s: any) => ({
                label: s.name,
                value: s.name,
              }))}
              {...register('society')}
            />
          ) : !selectedUnion?.societies?.length && showSocietySelector ? (
            <div className="flex space-x-1 text-sm mx-auto justify-center">
              <p className="text-center">No societies found,</p>
              <Link href="#">
                create the first one
                <FaArrowRight className="text-positive" />
              </Link>
            </div>
          ) : null}
          <div className="grid grid-flow-col space-x-2 w-full relative">
            {!showSocietySelector ? (
              <button
                className="btn btn-outline border-solid w-full hover:bg-positive"
                onClick={() => setShowSocietySelector(true)}
                disabled={!selectedUnion}
              >
                Find your Society
              </button>
            ) : showSocietySelector && selectedUnion?.societies?.length ? (
              <button
                className="btn btn-outline border-solid w-full"
                onClick={handleSubmit(() => handleRequest('society'))}
                disabled={!selectedSociety}
              >
                Request Society Access
              </button>
            ) : null}
            <button
              className="btn bg-black w-full"
              onClick={handleSubmit(() => handleRequest('union'))}
              disabled={!selectedUnion}
            >
              Request Union Access
            </button>
          </div>
        </form>
        {showHomeButton && (
          <div className="container-sm">
            <div className="divider before:bg-black after:bg-black" />
            <Link href="/events">
              Visit the admin portal
              <FaArrowRight className="text-positive" />
            </Link>
          </div>
        )}
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

  const client = initUrqlClient(
    { url: 'http://localhost:4000/graphql' },
    false
  );
  const unionQueryResults = await client
    ?.query(GetAllUnionsQuery, {})
    .toPromise();

  const user = {
    ...session?.user,
    image: session?.user.image || null,
  };

  return {
    props: {
      unis,
      user,
      unions: unionQueryResults?.data.Union,
    },
  };
}

export default Request;

// user to add themselves to union requests or society requests
