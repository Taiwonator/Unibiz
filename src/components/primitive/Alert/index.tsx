import {
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';
import { FaAmbulance, FaBolt, FaInfo } from 'react-icons/fa';
import { RxCrossCircled } from 'react-icons/rx';

export type AlertType = 'info' | 'success' | 'warning' | 'error';
interface AlertProps {
  children?: ReactNode;
  onClose: () => void;
  open: boolean;
  type: AlertType;
}

const Alert: React.FC<AlertProps> = ({
  children,
  onClose,
  open,
  type = 'success',
}) => {
  const alertRef = useRef();

  useEffect(() => {
    const alertElement = alertRef.current as any;
    if (alertElement) {
      if (open) {
        alertElement.style.display = 'block';
        setTimeout(() => (alertElement.style.opacity = '1'), 300);
      } else {
        alertElement.style.opacity = '0';
        setTimeout(() => (alertElement.style.display = 'none'), 300);
      }
    }
  }, [open]);

  const typeClassName = {
    info: 'alert-info',
    success: 'alert-success',
    warning: 'alert-warning',
    error: 'alert-error',
  };

  return (
    <div
      ref={alertRef as any}
      className={cx(
        'alert hidden shadow-lg transition-all',
        typeClassName[type]
      )}
    >
      <div>
        {type === 'info' && <FaInfo />}
        {type === 'success' && <FaBolt />}
        {type === 'warning' && <FaInfo />}
        {type === 'error' && <FaAmbulance />}
        <div className="text-xs">{children}</div>
        <RxCrossCircled className="ml-auto" onClick={onClose} />
      </div>
    </div>
  );
};

export default Alert;

//   const [alertOpen, setAlertOpen] = useState(false);

//   return (
//     <div>
//       <div onClick={() => setAlertOpen(true)}>loading...</div>
//       <Alert
//         type="success"
//         open={alertOpen}
//         onClose={() => setAlertOpen(false)}
//       >
//         <p>Operation completed :)</p>
//       </Alert>
//     </div>
//   );
