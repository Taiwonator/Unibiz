import { ReactNode, useContext } from 'react';
import { AppContext, Group, initialState, State } from 'src/context/AppContext';
import { Society, Union } from 'generated/graphql';
import { initUrqlClient } from 'next-urql';
import { GetGroupById } from 'src/graphql/group/queries.graphql';
import { UpdateUserCurrentGroupQuery } from 'src/graphql/user/mutations.graphql';
import { useQueryHelpers } from './useQueryHelpers';

const useApp = () => {
  const [state, setState] = useContext(AppContext);
  const { client } = useQueryHelpers();

  const setASociety = (society: any) => {
    setState((state: State) => ({
      ...state,
      society,
      group: society,
      guestView: false,
    }));
  };

  const setAUnion = (union: any) => {
    setState((state: State) => ({
      ...state,
      union,
      group: union,
      guestView: false,
    }));
  };

  const setAGroup = (group: any, userId?: string) => {
    setState((state: State) => ({ ...state, group, guestView: false }));
    if (userId) {
      setAGroupById(group.groupId, userId);
    }
  };

  const setAGroupById = async (groupId?: string, userId?: string) => {
    if (groupId && userId) {
      try {
        const updateResult = await client
          ?.mutation(UpdateUserCurrentGroupQuery, {
            userId,
            groupId,
          })
          .toPromise();
        return updateResult;
      } catch (e) {
        console.log(e);
        throw e;
      }
    } else {
      return null;
    }
  };

  const clearAGroup = async (userId: string, next: () => void) => {
    setState((state: State) => ({ ...state, group: {} }));
    try {
      const updateResult = await client
        ?.mutation(UpdateUserCurrentGroupQuery, {
          userId,
          groupId: null,
        })
        .toPromise();
      next();
      return updateResult;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const clearAGroupTemp = async () => {
    setState((state: State) => ({ ...state, group: {} }));
  };

  type IsVerified = (g: Group | null | undefined) => boolean;
  const isVerified: IsVerified = (g) => {
    if (g) {
      if (g.__typename === 'Society') {
        return !!g.union;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  const clearAState = () => {
    setState(initialState);
  };

  const enableGuestView = () => {
    const enable = () => {
      setState((state: State) => ({ ...state, guestView: true }));
      clearAGroupTemp();
    };
    enable();
  };

  const getAUserType = () => {
    const group = state.group;
    if (group?.__typename === 'Society') return 'society_admin';
    if (group?.__typename === 'Union') return 'union_admin';
    return null;
  };

  const showAUserContent = (x: ReactNode, y: ReactNode, z: ReactNode) => {
    const userType = getAUserType();
    switch (userType) {
      case 'society_admin':
        return x;
      case 'union_admin':
        return y;
      default:
        return z;
    }
  };

  return {
    aGroup: state.group,
    aSociety: state.society,
    aUnion: state.union,
    isVerified,
    isASociety: getAUserType() === 'society_admin',
    isAUnion: getAUserType() === 'union_admin',
    isAGuest: state.guestView,
    clearAState,
    clearAGroup,
    clearAGroupTemp,
    enableGuestView,
    getAUserType,
    setASociety,
    setAUnion,
    setAGroup,
    setAGroupById,
    showAUserContent,
  };
};

export default useApp;
