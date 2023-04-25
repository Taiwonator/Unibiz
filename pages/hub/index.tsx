import { NextPageWithLayout } from '../_app';
import SocietyAdminLayout from '@components/layout/SocietyAdminLayout';
import useNavigation from 'src/hooks/useNavigation';
import { useCallback, useEffect, useState } from 'react';
import useApp from '@hooks/useApp';
import { RxBadge } from 'react-icons/rx';
import { FaCertificate, FaStar, FaThumbsUp } from 'react-icons/fa';
import {
  EditSocietyMutationVariables,
  EditUnionMutationVariables,
  Society,
  Union,
} from 'generated/graphql';
import { Group } from '@context/AppContext';
import { Control, ControlShell, UniSelect } from '@components/core/Form';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { initUrqlClient } from 'next-urql';
import { GetAllUnionsQuery } from 'src/graphql/union/queries.graphql';
import { useForm } from 'react-hook-form';
import { fixtures } from '@components/core/Form/UniSelect/fixtures';
import useUniSelect from '@hooks/useUniSelect';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import cx from 'classnames';
import NextLink from 'next/link';
import Image from 'next/image';
import { useQueryHelpers } from '@hooks/useQueryHelpers';
import { GetGroupById } from 'src/graphql/group/queries.graphql';
import { LoadingElement } from '@components/primitive/Loading';
import { optionalImageSchema } from 'pages/events/edit/[eid]';
import useModal from '@hooks/useModal';
import useConfirmNavigation from '@hooks/useConfirmNavigation';
import useS3 from '@hooks/useS3';
import { EditSocietyMutation } from 'src/graphql/society/mutations.graphql';
import { useRouter } from 'next/router';
import { EditUnionMutation } from 'src/graphql/union/mutations.graphql';

const Hub: NextPageWithLayout = (props: any) => {
  const { unions } = props;

  const schema = yup.object().shape({
    name: yup.string(),
    shortName: yup.string(),
    description: yup.string(),
    image: optionalImageSchema,
  });

  const router = useRouter();
  const { uploadToS3, uploadResponse } = useS3();
  const { setActiveNavItem } = useNavigation();
  const { aGroup, getAUserType, isVerified, isASociety, isAUnion } = useApp();
  const { UniSelectComponent, setUnion, getUnionDomain } = useUniSelect();
  const [initialImageUrl, setInitialImageUrl] = useState(null);
  const { client } = useQueryHelpers();
  const [currentGroup, setCurrentGroup] = useState<any>({});

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

  useEffect(() => {
    setActiveNavItem('hub');
  }, []);

  const resetFormValues = useCallback(async () => {
    let initialValues: any;
    if (aGroup) {
      const res = await client
        ?.query(GetGroupById, { id: aGroup.id })
        .toPromise();
      const { data, error } = res;
      if (!error) {
        setCurrentGroup(data.FindGroupById);
        if (isASociety) {
          initialValues = {
            name: data.FindGroupById.name,
            shortName: data.FindGroupById.shortName,
            description: data.FindGroupById.description,
            union: data.FindGroupById.union
              ? data.FindGroupById.union.id
              : null,
          };
        } else if (isAUnion) {
          initialValues = {
            name: data.FindGroupById.name,
            shortName: data.FindGroupById.shortName,
          };
        }

        reset({ ...initialValues });
        setInitialImageUrl(data.FindGroupById.imageUrl);
      }
    }

    const defaultValues: any = {
      name: aGroup?.name,
      shortName: aGroup?.shortName,
      union: ((aGroup as Society)?.union || {}).name || '',
    };
    // setInitialValues({
    //   ...defaultValues,
    // });
    // reset({ ...defaultValues });
  }, [aGroup, reset]);

  const { dispatchModal, generateProceedOrCancelComponent } = useModal();

  const handleChange = useCallback(() => {
    const union = unions.find(
      (union: Union) => union.name === getValues('union')
    );
    setUnion(union);
  }, [getValues, setUnion, unions]);

  useEffect(() => {
    resetFormValues();
    handleChange();
  }, [aGroup, reset, setUnion, handleChange, resetFormValues]);

  const handleEdit = (data: any) => {
    const confirm = () =>
      dispatchModal(
        generateProceedOrCancelComponent({
          options: {
            prompt: `Are you sure you'd like to edit`,
            action: () => editGroup(data),
          },
        })
      );

    if (isASociety && !!data.union && !!currentGroup.union) {
      if (currentGroup.union.id !== data.union) {
        dispatchModal(
          generateProceedOrCancelComponent({
            options: {
              prompt: `You will be removed from ${currentGroup.union.shortName} and request to join your new society.`,
              action: confirm,
            },
          })
        );
      } else {
        confirm();
      }
    } else {
      confirm();
    }
  };

  const editGroup = async (data: any) => {
    // update image
    const file = data.image?.[0];
    let res;
    if (file) {
      res = await uploadToS3([file]);
    }

    // update text fields
    if (aGroup && aGroup.id && isASociety) {
      const variables: Partial<EditSocietyMutationVariables> = {
        societyId: aGroup.id,
        name: data.name,
        shortName: data.shortName,
        description: data.description,
        imageUrl: res?.urls[0],
      };
      try {
        const editSocietyResult = await client
          ?.mutation(EditSocietyMutation, variables)
          .toPromise();
        // console.log('edited:', editSocietyResult);
        router.reload();
      } catch (err) {
        console.log(err);
      }
    } else if (aGroup && aGroup.id && isAUnion) {
      const variables: Partial<EditUnionMutationVariables> = {
        unionId: aGroup.id,
        name: data.name,
        shortName: data.shortName,
        imageUrl: res?.urls[0],
      };
      try {
        const editUnionResult = await client
          ?.mutation(EditUnionMutation, variables)
          .toPromise();
        // console.log('edited:', editUnionResult);
        router.reload();
      } catch (err) {
        console.log(err);
      }
    }

    // update society...
  };

  return (
    <>
      <div className="relative min-h-[320px] w-screen flex justify-center items-center">
        <h3 className="text-2xl font-bold text-white bg-orange px-4 py-1 rounded-md bg-black">
          {aGroup?.shortName}
          {!initialImageUrl && (
            <LoadingElement className="absolute h-full w-full left-0 top-0 -z-10" />
          )}
          {initialImageUrl && (
            <Image
              src={initialImageUrl}
              fill
              style={{
                objectFit: 'cover',
                zIndex: '-1',
              }}
              alt="placeholder"
            />
          )}
        </h3>
      </div>
      <div className="container-lg pt-16">
        <div className="flex flex-col space-y-8 justify-between md:flex-row md:space-y-0">
          <div className="flex flex-col items-start space-y-4">
            {currentGroup.union && (
              <div className="inline-flex bg-black px-2 py-1 rounded-sm font-bold text-white">
                {currentGroup.union.shortName}
              </div>
            )}
            <h2 className="text-2xl inline-flex items-center space-x-2">
              {isVerified(aGroup) && isASociety && (
                <div
                  className="tooltip tooltip-right"
                  data-tip={
                    currentGroup && currentGroup.union
                      ? `${currentGroup.union.name} Society`
                      : 'Unverified'
                  }
                >
                  <div className="tooltip" data-tip="Verified">
                    <FaStar className="text-positive" />
                  </div>
                </div>
              )}
              <span>{aGroup?.name}</span>
            </h2>
          </div>

          <div className="flex flex-col space-y-4 md:space-x-2 md:flex-row md:space-y-0">
            {isAUnion && (
              <>
                <NextLink
                  href="/hub/faqs"
                  className="btn btn-outline border-solid bg-white text-black"
                >
                  FAQs
                </NextLink>
                <NextLink
                  href="/hub/societies"
                  className="btn btn-outline border-solid bg-white text-black"
                >
                  Manage Societies
                </NextLink>
              </>
            )}
            <NextLink
              href="/hub/team"
              className="btn btn-outline border-solid bg-white text-black"
            >
              Manage Team
            </NextLink>
            <NextLink
              href={
                getAUserType() === 'society_admin'
                  ? `/union/society/${aGroup?.id}`
                  : '/union'
              }
              className="btn bg-black"
              target="_blank"
            >
              See Page
            </NextLink>
          </div>
        </div>
      </div>
      <div className="bg-grey0 mt-16">
        <form
          className="container-lg min-h-[50vh] py-16 space-y-16"
          onChange={handleChange}
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
          {isASociety && (
            <>
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
              {/* {getAUserType() === 'society_admin' && (
                <UniSelectComponent
                  placeholder="Select a university"
                  options={unions}
                  uniDomain={getUnionDomain()}
                  {...register('union')}
                />
              )} */}
            </>
          )}
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
            onClick={handleSubmit(handleEdit)}
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
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

  return {
    props: {
      unis,
      unions: unionQueryResults?.data.Union,
    },
  };
}

Hub.getLayout = (page) => <SocietyAdminLayout>{page}</SocietyAdminLayout>;

export default Hub;
