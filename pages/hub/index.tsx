import { NextPageWithLayout } from '../_app';
import SocietyAdminLayout from '@components/layout/SocietyAdminLayout';
import useNavigation from 'src/hooks/useNavigation';
import { useCallback, useEffect, useState } from 'react';
import useApp from '@hooks/useApp';
import { RxBadge } from 'react-icons/rx';
import { FaCertificate, FaThumbsUp } from 'react-icons/fa';
import { Society, Union } from 'generated/graphql';
import { Group } from '@context/AppContext';
import { Control, UniSelect } from '@components/core/Form';
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

const Hub: NextPageWithLayout = (props: any) => {
  const { unions } = props;

  const schema = yup.object().shape({
    name: yup.string().required(),
    shortName: yup.string().required(),
    description: yup.string().required(),
  });

  const { setActiveNavItem } = useNavigation();
  const { aGroup, getAUserType, isVerified, isASociety, isAUnion } = useApp();
  const { UniSelectComponent, setUnion, getUnionDomain } = useUniSelect();
  const [initialImageUrl, setInitialImageUrl] = useState(null);
  const { client } = useQueryHelpers();

  const {
    register,
    getValues,
    reset,
    handleSubmit,
    formState: { isDirty, dirtyFields },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
        if (isASociety) {
          initialValues = {
            name: data.FindGroupById.name,
            shortName: data.FindGroupById.shortName,
            description: data.FindGroupById.description,
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
    reset({ ...defaultValues });
  }, [aGroup, reset]);

  const handleChange = useCallback(() => {
    const union = unions.find(
      (union: Union) => union.name === getValues('union')
    );
    setUnion(union);
    // console.log(getValues(), initialValues);
  }, [getValues, setUnion, unions]);

  useEffect(() => {
    resetFormValues();
    handleChange();
  }, [aGroup, reset, setUnion, handleChange, resetFormValues]);

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
        <div className="flex justify-between">
          <h2 className="text-2xl inline-flex items-center space-x-2">
            {isVerified(aGroup) && <FaCertificate className="text-positive" />}
            <span>{aGroup?.name}</span>
          </h2>
          <div className="space-x-4">
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
          onSubmit={handleSubmit(handleChange)}
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
          {getAUserType() === 'society_admin' && (
            <UniSelectComponent
              placeholder="Select a university"
              options={unions}
              uniDomain={getUnionDomain()}
              disabled
              {...register('union')}
            />
          )}
          <button
            className={cx(
              'btn flex bg-black ml-auto',
              !isDirty && 'bg-grey4 btn-disabled text-white'
            )}
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
