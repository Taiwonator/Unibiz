import { AlertType } from '@components/primitive/Alert';
import { createContext, ReactNode, useState } from 'react';

const AlertContext = createContext({});

interface AlertProviderProps {
  children: ReactNode;
}

export interface AlertDispatch {
  text: string;
  type: AlertType;
}

const initialState = {
  open: false,
};

const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [state, setState] = useState(initialState);

  return (
    <AlertContext.Provider value={[state, setState]}>
      {children}
    </AlertContext.Provider>
  );
};

export { AlertContext, AlertProvider };
