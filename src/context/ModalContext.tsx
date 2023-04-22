import { createContext, ReactNode, useState } from 'react';
export interface State {
  open: boolean;
  Component: ReactNode | null;
}

const initialState: State = {
  open: false,
  Component: null,
};
interface ModalProviderProps {
  children: ReactNode;
}

export interface ModalDispatch {
  Component: ReactNode;
}

const ModalContext = createContext<
  [State, React.Dispatch<React.SetStateAction<State>>]
>([initialState, () => null]);

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [state, setState] = useState(initialState);

  return (
    <ModalContext.Provider value={[state, setState]}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
