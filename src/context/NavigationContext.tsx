import { createContext, ReactNode, useState } from 'react';

const NavigationContext = createContext({});

interface NavigationProviderProps {
  children: ReactNode;
}

const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState({
    activeItem: 'events',
  });

  return (
    <NavigationContext.Provider value={[state, setState]}>
      {children}
    </NavigationContext.Provider>
  );
};

export { NavigationContext, NavigationProvider };
