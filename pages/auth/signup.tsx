import MinimialLayout from '@components/layout/MinimalLayout';
import { FaArrowLeft } from 'react-icons/fa';
import Link from '@components/primitive/Link';
import { Control, TextInput } from '@components/core/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useCreateUserMutation } from 'generated/graphql';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    // userType: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match.')
      .required('Please confirm your password.'),
  });

  const router = useRouter();
  const [_, executeMutation] = useCreateUserMutation();
  const { register, getValues, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSignUp = async () => {
    const createUserRes = await executeMutation({
      name: getValues('name'),
      email: getValues('email'),
      // type: getValues('userType'),
      // type: null,
      password: getValues('password'),
    });
    console.log(createUserRes);
    if (!createUserRes.error) {
      try {
        const signInRes = await signIn('credentials', {
          email: getValues('email'),
          password: getValues('password'),
          redirect: false,
        });
        console.log(signInRes);
        if (signInRes) {
          if (!signInRes.error) router.push('/events');
        }
      } catch (error: any) {
        console.error(error.errors);
      }
    }
  };

  return (
    <MinimialLayout>
      <div className="container-sm flex flex-col items-center justify-center py-8 min-h-[90vh] space-y-6">
        <div className="flex flex-col items-center">
          <h2 className="font-extrabold text-2xl">Sign up to Unibiz</h2>
        </div>
        <form className="space-y-4 w-full">
          <Control
            placeholder="James Doe"
            label="Full Name"
            labels={{ bottomLeft: 'Name must be maximum 40 characters' }}
            type="text"
            {...register('name')}
          />

          <Control
            placeholder="james.doe@gmai.com"
            label="Email"
            type="text"
            {...register('email')}
          />

          {/* <Control
            placeholder="pick a user type"
            classNames={{
              input: 'select-bordered',
            }}
            label="User Type"
            type="select"
            options={[
              {
                label: 'Society Admin',
                value: 'society_admin',
              },
              {
                label: 'Union Admin',
                value: 'union_admin',
              },
            ]}
            {...register('userType')}
          /> */}

          <Control
            placeholder="**********"
            label="Password"
            type="password"
            labels={{ bottomLeft: 'Password must follow undecided rule ;)' }}
            {...register('password')}
          />

          <Control
            placeholder="**********"
            label="Repeat Password"
            type="password"
            {...register('confirmPassword')}
          />

          <button
            className="btn bg-black w-full mt-8"
            onClick={handleSubmit(handleSignUp)}
          >
            Create Account
          </button>
        </form>
        <div className="divider before:bg-black after:bg-black" />
        <Link href="/api/auth/signin" className="text-sm">
          <FaArrowLeft className="text-positive" />I already have an account
        </Link>
      </div>
    </MinimialLayout>
  );
}
