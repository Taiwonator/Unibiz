import { useContext } from 'react';
import { AlertContext, AlertDispatch } from 'src/context/AlertContext';

const useAlert = () => {
  const [state, setState] = useContext(AlertContext);

  const closeAlert = () => {
    setState((state) => ({ ...state, open: false }));
  };

  const dispatchAlert = (alert: any) => {
    setState((state) => ({ ...state, ...alert, open: true }));
    setTimeout(() => {
      closeAlert();
    }, alert.time || 5000);
  };

  return {
    alert: state,
    closeAlert,
    dispatchAlert,
  };
};

export default useAlert;
