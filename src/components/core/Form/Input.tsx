import { forwardRef } from 'react';

interface InputProps {
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { placeholder } = props;
  return (
    <input
      ref={ref}
      type="text"
      placeholder={placeholder}
      className="input input-bordered w-full max-w-xs"
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
