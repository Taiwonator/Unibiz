import {
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';
import {
  FaAmbulance,
  FaBolt,
  FaBoxOpen,
  FaCross,
  FaCrosshairs,
  FaInfo,
} from 'react-icons/fa';
import { RxCrossCircled } from 'react-icons/rx';

interface AlertProps {
  children?: ReactNode;
  onClose: () => void;
  open: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

const Alert: React.FC<AlertProps> = ({
  children,
  onClose,
  open,
  type = 'success',
}) => {
  const alertRef = useRef();

  useEffect(() => {
    console.log('changed');
    const alertElement = alertRef.current;
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
      ref={alertRef}
      className={cx(
        'alert shadow-lg transition-all',
        // !open && 'hidden',
        typeClassName[type]
      )}
    >
      <div>
        {type === 'info' && <FaInfo />}
        {type === 'success' && <FaBolt />}
        {type === 'warning' && <FaInfo />}
        {type === 'error' && <FaAmbulance />}
        <div>{children}</div>
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
