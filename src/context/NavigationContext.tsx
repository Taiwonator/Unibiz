import { createContext, ReactNode, useState } from 'react';

interface State {
  activeNavItem: string;
}

const initialState: State = {
  activeNavItem: 'events',
};
interface NavigationProviderProps {
  children: ReactNode;
}

const NavigationContext = createContext<
  [State, React.Dispatch<React.SetStateAction<State>>]
>([initialState, () => null]);

const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState(initialState);

  return (
    <NavigationContext.Provider value={[state, setState]}>
      {children}
    </NavigationContext.Provider>
  );
};

export { NavigationContext, NavigationProvider };
