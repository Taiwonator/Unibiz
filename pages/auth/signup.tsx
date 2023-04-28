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
import useAlert from '@hooks/useAlert';

export default function SignIn() {
  const { closeAlert, dispatchAlert } = useAlert();
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    // userType: yup.string().required(),
    password: yup
      .string()
      .min(8, (obj) => {
        const valueLength = obj.value.length;
        return `Password (length: ${valueLength}) cannot be more than ${obj.min}`;
      })
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match.')
      .required('Please confirm your password.'),
  });

  const router = useRouter();
  const [_, executeMutation] = useCreateUserMutation();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSignUp = async () => {
    console.log('hello there');
    try {
      const createUserRes = await executeMutation({
        name: getValues('name'),
        email: getValues('email'),
        password: getValues('password'),
      });
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
          dispatchAlert({
            text: 'An error has occured',
            type: 'error',
          });
        }
      }
    } catch (error: any) {
      dispatchAlert({
        text: 'An error has occured',
        type: 'error',
      });
    }
  };

  console.log(errors);

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
            labels={{
              bottomLeft: errors && errors.name && (
                <span className="text-red font-bold">
                  {String(errors?.name?.message)}
                </span>
              ),
            }}
            type="text"
            {...register('name')}
          />

          <Control
            placeholder="james.doe@gmai.com"
            label="Email"
            type="text"
            labels={{
              bottomLeft: errors && errors.email && (
                <span className="text-red font-bold">
                  {String(errors?.email?.message)}
                </span>
              ),
            }}
            {...register('email')}
          />

          <Control
            placeholder="**********"
            label="Password"
            type="password"
            labels={{
              bottomLeft:
                errors && errors.password ? (
                  <span className="text-red font-bold">
                    {String(errors?.password?.message)}
                  </span>
                ) : (
                  'Password must be at least 8 characters long'
                ),
            }}
            {...register('password')}
          />

          <Control
            placeholder="**********"
            label="Repeat Password"
            type="password"
            labels={{
              bottomLeft:
                errors && errors.confirmPassword ? (
                  <span className="text-red font-bold">
                    {String(errors?.confirmPassword?.message)}
                  </span>
                ) : (
                  'Password must be at least 8 characters long'
                ),
            }}
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
