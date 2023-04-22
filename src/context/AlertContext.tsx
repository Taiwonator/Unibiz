import { AlertType } from '@components/primitive/Alert';
import { createContext, ReactNode, useState } from 'react';
export interface State {
  open: boolean;
  text: string;
  type: AlertType;
}

const initialState: State = {
  open: false,
  text: '',
  type: 'info',
};
interface AlertProviderProps {
  children: ReactNode;
}

export interface AlertDispatch {
  text: string;
  type: AlertType;
}

const AlertContext = createContext<
  [State, React.Dispatch<React.SetStateAction<State>>]
>([initialState, () => null]);

const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [state, setState] = useState(initialState);

  return (
    <AlertContext.Provider value={[state, setState]}>
      {children}
    </AlertContext.Provider>
  );
};

export { AlertContext, AlertProvider };
