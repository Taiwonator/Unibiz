import { createContext, ReactNode, useState } from 'react';
import { Society, Union } from 'generated/graphql';

interface AppProviderProps {
  children: ReactNode;
}

export type Group = Society | Union;

export interface State {
  group?: Group | null;
  society?: Society | null;
  union?: Union | null;
  guestView: boolean;
}

export const initialState: State = {
  society: null,
  union: null,
  group: null,
  guestView: false,
};

const AppContext = createContext<
  [State, React.Dispatch<React.SetStateAction<State>>]
>([initialState, () => null]);

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<State>(initialState);

  return (
    <AppContext.Provider value={[state, setState]}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
