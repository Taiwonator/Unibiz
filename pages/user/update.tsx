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
import {
  CreateSocietyMutationVariables,
  UpdateUserNameMutationVariables,
} from 'generated/graphql';
import { useQueryHelpers } from '@hooks/useQueryHelpers';
import { CreateSocietyMutation } from 'src/graphql/society/mutations.graphql';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import useConfirmNavigation from '@hooks/useConfirmNavigation';
import { UpdateUserNameMutation } from 'src/graphql/user/mutations.graphql';
import { useEffect } from 'react';
import { GetUserByIdQuery } from 'src/graphql/user/queries.graphql';

const Update: NextPageWithLayout = () => {
  const { dispatchModal, generateProceedOrCancelComponent } = useModal();
  const router = useRouter();

  const schema = yup.object().shape({
    name: yup.string().required(),
  });
  const {
    register,
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

  useEffect(() => {
    const updateUser = async () => {
      if (user) {
        const userRes = await client
          ?.query(GetUserByIdQuery, { id: user.id })
          .toPromise();
        if (!userRes.error) {
          reset({ name: userRes.data.FindUserById.name });
        }
      }
    };
    updateUser();
  }, [user, reset, client]);

  const handleUpdate = (data: any) => {
    dispatchModal(
      generateProceedOrCancelComponent({
        options: {
          prompt: `Updating name...`,
          action: () => updateName(data),
        },
      })
    );
  };

  const updateName = async (data: any) => {
    if (user) {
      const variables: UpdateUserNameMutationVariables = {
        userId: user.id,
        name: data.name,
      };
      try {
        const updateUserNameRes = await client
          ?.mutation(UpdateUserNameMutation, variables)
          .toPromise();
        if (!updateUserNameRes.error) router.push('/events');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="bg-grey0 py-10 pt-16">
      <div className="container-md min-h-screen space-y-16">
        <div className="grid grid-flow-row md:space-x-2 md:grid-flow-col">
          <form className="min-h-[50vh] py-16 space-y-16">
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
            </div>
            <button
              className={cx(
                'btn flex bg-black ml-auto',
                !isDirty && 'bg-grey4 btn-disabled text-white'
              )}
              onClick={handleSubmit(handleUpdate)}
            >
              Update Name
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Update.getLayout = (page) => <SocietyAdminLayout>{page}</SocietyAdminLayout>;

export default Update;
