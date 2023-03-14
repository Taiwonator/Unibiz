import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '@components/core/Form/Input';
import Button from '@components/primitive/Button';
import { FaArrowRight } from 'react-icons/fa';
import { useCreateUserMutation } from 'generated/graphql';
import { useRouter } from 'next/router';

const Signup = () => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    type: yup.string().required(),
    password: yup.string().required(),
    passwordRepeat: yup.string().required(),
  });

  const [_, executeMutation] = useCreateUserMutation();
  const { register, getValues, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const handleSignup = async (e: any) => {
    executeMutation({
      name: getValues('name'),
      email: getValues('email'),
      type: getValues('type'),
      password: getValues('password'),
    });
    router.push('/api/auth/signin');
  };

  return (
    <div className="flex h-screen justify-center">
      <div className="my-auto">
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleSignup)}
        >
          <Input placeholder="name" {...register('name')} />
          <Input placeholder="email" {...register('email')} />
          <Input placeholder="type" {...register('type')} />
          <Input placeholder="password" {...register('password')} />
          <Input
            placeholder="repeat password"
            {...register('passwordRepeat')}
          />
          <Button>
            Sign Up
            <FaArrowRight />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
