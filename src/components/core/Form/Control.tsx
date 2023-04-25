import cx from 'classnames';
import { forwardRef, LegacyRef } from 'react';

type ControlTypes =
  | 'date'
  | 'time'
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

export const ControlShell: React.FC<any> = (props) => {
  const {
    className,
    classNames,
    label,
    labels = {},
    required,
    children,
  } = props;

  return (
    <div className={cx(`form-control w-full`, className)}>
      {label && (
        <label className={cx('label', required && 'label-required')}>
          <span className="label-text">{label}</span>
        </label>
      )}
      {children}
      {labels?.bottomLeft && (
        <label className={cx('label pb-0')}>
          <span className={cx('label-text-alt', classNames?.labelBottomLeft)}>
            {labels.bottomLeft}
          </span>
        </label>
      )}
    </div>
  );
};

Control.displayName = 'Control';

export interface TextInputProps {
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  status?: 'success' | 'error';
  type: ControlTypes;
  value?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const { className, disabled, placeholder, status, type, value } = props;
    const Component = type === 'textarea' ? 'textarea' : 'input';
    const statusClassNameMap = {
      success: 'input-accent',
      error: 'input-error',
    };

    return (
      <Component
        {...props}
        value={value}
        ref={ref as LegacyRef<any>}
        disabled={disabled}
        className={cx(
          `w-full rounded-sm`,
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

export const SelectInput = forwardRef<
  HTMLInputElement,
  Omit<ControlProps, 'type'>
>((props, ref) => {
  const { className, disabled, options, placeholder } = props;
  return (
    <select
      {...props}
      ref={ref as LegacyRef<HTMLSelectElement>}
      className={cx('select select-bordered w-full', className)}
      disabled={disabled}
    >
      <option selected value="">
        {placeholder}
      </option>
      {options?.map((option, i) => (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

SelectInput.displayName = 'SelectInput';

interface FileInputProps {
  className?: string;
  disabled?: boolean;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (props, ref) => {
    const { className, disabled } = props;
    return (
      <input
        ref={ref as LegacyRef<HTMLInputElement>}
        type="file"
        className={cx(
          'file-input file-input-ghost file-input-bordered w-full max-w-xs',
          className
        )}
        disabled={disabled}
      />
    );
  }
);

FileInput.displayName = 'FileInput';

export default Control;
