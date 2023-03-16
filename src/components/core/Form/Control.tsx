import cx from 'classnames';
import { forwardRef } from 'react';

type ControlTypes =
  | 'date'
  | 'text'
  | 'number'
  | 'password'
  | 'textarea'
  | 'select'
  | 'file';

type Option = {
  label: string;
  value: string;
};

export interface ControlProps extends TextInputProps {
  className?: string;
  classNames?: {
    input?: string;
    labelBottomLeft?: string;
  };
  label?: string;
  labels?: {
    bottomLeft?: string;
  };
  options?: Option[];
  required?: boolean;
  type: ControlTypes;
}

export const Control = forwardRef<HTMLInputElement, ControlProps>(
  (props, ref) => {
    const { className, classNames, label, labels = {}, required, type } = props;

    const Component =
      type === 'select' ? SelectInput : type === 'file' ? FileInput : TextInput;

    return (
      <div className={cx(`form-control w-full`, className)}>
        {label && (
          <label className={cx('label', required && 'label-required')}>
            <span className="label-text">{label}</span>
          </label>
        )}
        <Component ref={ref} {...props} className={classNames?.input} />
        {labels?.bottomLeft && (
          <label className={cx('label pb-0')}>
            <span className={cx('label-text-alt', classNames?.labelBottomLeft)}>
              {labels.bottomLeft}
            </span>
          </label>
        )}
      </div>
    );
  }
);

Control.displayName = 'Control';

export interface TextInputProps {
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  status?: 'success' | 'error';
  type: ControlTypes;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const { className, disabled, placeholder, status, type } = props;
    const Component = type === 'textarea' ? 'textarea' : 'input';
    const statusClassNameMap = {
      success: 'input-accent',
      error: 'input-error',
    };

    return (
      <Component
        {...props}
        ref={ref}
        disabled={disabled}
        className={cx(
          `w-full`,
          status && statusClassNameMap[status],
          type === 'textarea' && 'textarea textarea-bordered',
          type !== 'textarea' && 'input input-bordered',
          className
        )}
        placeholder={placeholder}
        type={type}
      />
    );
  }
);

TextInput.displayName = 'TextInput';

export interface SelectInputProps {
  className?: string;
  disabled?: boolean;
  options?: Option[];
  placeholder?: string;
}

export const SelectInput = forwardRef<HTMLInputElement, ControlProps>(
  (props, ref) => {
    const { className, disabled, options, placeholder } = props;
    return (
      <select
        {...props}
        ref={ref}
        className={cx('select w-full', className)}
        disabled={disabled}
      >
        <option disabled selected>
          {placeholder}
        </option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

SelectInput.displayName = 'SelectInput';

interface FileInputProps {
  className?: string;
  disabled?: boolean;
}

export const FileInput: React.FC<FileInputProps> = ({
  className,
  disabled,
}) => {
  return (
    <input
      type="file"
      className={cx('file-input w-full max-w-xs', className)}
      disabled={disabled}
    />
  );
};

export default Control;
