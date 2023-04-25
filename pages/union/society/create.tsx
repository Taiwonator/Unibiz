import { initUrqlClient } from 'next-urql';
import { GetAllUnionsQuery } from 'src/graphql/union/queries.graphql';
import SocietyAdminLayout from '@components/layout/SocietyAdminLayout';
import { NextPageWithLayout } from 'pages/_app';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { Control, ControlShell } from '@components/core/Form';
import useUniSelect from '@hooks/useUniSelect';
import useApp from '@hooks/useApp';
import { imageSchema } from 'pages/events/create';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import cx from 'classnames';
import useModal from '@hooks/useModal';
import useS3 from '@hooks/useS3';
import { CreateSocietyMutationVariables } from 'generated/graphql';
import { useQueryHelpers } from '@hooks/useQueryHelpers';
import { CreateSocietyMutation } from 'src/graphql/society/mutations.graphql';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import useConfirmNavigation from '@hooks/useConfirmNavigation';

const Create: NextPageWithLayout = (props: any) => {
  const { unions } = props;

  const { UniSelectComponent, setUnion, getUnionDomain } = useUniSelect();
  const {
    aGroup,
    setAGroupById,
    getAUserType,
    isVerified,
    isASociety,
    isAUnion,
  } = useApp();
  const { dispatchModal, generateProceedOrCancelComponent } = useModal();
  const { uploadToS3, uploadResponse } = useS3();
  const router = useRouter();

  const schema = yup.object().shape({
    name: yup.string().required(),
    shortName: yup.string().required(),
    description: yup.string().required(),
    image: imageSchema,
  });
  const {
    register,
    getValues,
    reset,
    handleSubmit,
    formState: { isDirty, dirtyFields, isSubmitted },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useConfirmNavigation({ condition: isDirty && !isSubmitted });

  const { client } = useQueryHelpers();
  const { data: session } = useSession();
  const { user } = session || {};

  const handleCreate = (data: any) => {
    dispatchModal(
      generateProceedOrCancelComponent({
        options: {
          prompt: `Creating new society`,
          action: () => createSociety(data),
        },
      })
    );
  };

  const createSociety = async (data: any) => {
    if (user) {
      const file = data.image?.[0];
      let res;
      if (file) {
        res = await uploadToS3([file]);
      }

      const variables: Partial<CreateSocietyMutationVariables> = {
        userId: user.id,
        name: data.name,
        shortName: data.shortName,
        description: data.description,
        imageUrl: res?.urls[0],
      };
      try {
        const createSocietyResult = await client
          ?.mutation(CreateSocietyMutation, variables)
          .toPromise();
        const societyId = createSocietyResult.data.createSociety.id;
        await setAGroupById(societyId, user.id);
        router.push(`/union/society/${societyId}`, undefined, {
          shallow: false,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="bg-grey0 py-10 pt-16">
      <div className="container-md min-h-screen space-y-16">
        <div className="grid grid-flow-row md:space-x-2 md:grid-flow-col">
          <form
            className="min-h-[50vh] py-16 space-y-16"
            // onChange={handleChange}
          >
            <div className="grid grid-flow-row space-y-16 md:grid-flow-col md:space-y-0 md:space-x-4">
              <Control
                label="Name"
                type="text"
                className={cx(
                  Object.keys(dirtyFields).includes('name') && 'font-bold'
                )}
                status={
                  Object.keys(dirtyFields).includes('name')
                    ? 'success'
                    : undefined
                }
                {...register('name')}
              />
              <Control
                label="Short Name"
                type="text"
                className={cx(
                  Object.keys(dirtyFields).includes('shortName') && 'font-bold'
                )}
                status={
                  Object.keys(dirtyFields).includes('shortName')
                    ? 'success'
                    : undefined
                }
                {...register('shortName')}
              />
            </div>

            <Control
              label="Description"
              type="textarea"
              status={
                Object.keys(dirtyFields).includes('description')
                  ? 'success'
                  : undefined
              }
              {...register('description')}
            />
            {/* 
            <UniSelectComponent
              placeholder="Select a university"
              options={unions}
              uniDomain={getUnionDomain()}
              {...register('union')}
            /> */}

            <ControlShell label="Image">
              <input
                className="file-input file-input-ghost file-input-bordered w-full"
                type="file"
                {...register('image')}
              />
            </ControlShell>
            <button
              className={cx(
                'btn flex bg-black ml-auto',
                !isDirty && 'bg-grey4 btn-disabled text-white'
              )}
              onClick={handleSubmit(handleCreate)}
            >
              Create Society
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Name
// Short Name
// Description
// Image Url

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = (await getServerSession(
    context.req as any,
    context.res as any,
    authOptions as any
  )) as any;

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

Create.getLayout = (page) => <SocietyAdminLayout>{page}</SocietyAdminLayout>;

export default Create;
