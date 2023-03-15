import cx from 'classnames';

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

export const Control: React.FC<ControlProps> = (props) => {
  const { className, classNames, label, labels = {}, required, type } = props;

  const Component =
    type === 'select' ? SelectInput : type === 'file' ? FileInput : TextInput;

  return (
    <div className={cx(`form-control w-full max-w-xs`, className)}>
      {label && (
        <label className={cx('label', required && 'label-required')}>
          <span className="label-text">{label}</span>
        </label>
      )}
      <Component {...props} className={classNames?.input} />
      {labels?.bottomLeft && (
        <label className={cx('label')}>
          <span className={cx('label-text-alt', classNames?.labelBottomLeft)}>
            {labels.bottomLeft}
          </span>
        </label>
      )}
    </div>
  );
};

export interface TextInputProps {
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  status?: 'success' | 'error';
  type: ControlTypes;
}

export const TextInput: React.FC<TextInputProps> = ({
  className,
  disabled,
  placeholder,
  status,
  type,
}) => {
  const Component = type === 'textarea' ? 'textarea' : 'input';
  const statusClassNameMap = {
    success: 'input-accent',
    error: 'input-error',
  };
  return (
    <Component
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
};

export interface SelectInputProps {
  className?: string;
  disabled?: boolean;
  options?: Option[];
}

export const SelectInput: React.FC<SelectInputProps> = ({
  className,
  disabled,
  options,
}) => {
  return (
    <select
      className={cx('select w-full max-w-xs', className)}
      disabled={disabled}
    >
      <option disabled selected>
        Pick your favorite Simpson
      </option>
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

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
