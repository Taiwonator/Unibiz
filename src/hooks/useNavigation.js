import { useContext } from 'react';
import { NavigationContext } from 'src/context/NavigationContext';

const useNavigation = () => {
  const [state, setState] = useContext(NavigationContext);

  const setActiveNavItem = (id) => {
    setState((state) => ({ ...state, activeNavItem: id }));
  };

  return {
    activeNavItem: state.activeNavItem,
    setActiveNavItem,
  };
};

export default useNavigation;
