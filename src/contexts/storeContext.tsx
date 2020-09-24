import React, { createContext } from 'react';
import RootStore from 'stores/rootStore';

export const StoreContext = createContext<RootStore>(undefined!);

export const StoreProvider: React.FC = props => {
  return <StoreContext.Provider value={new RootStore()}>{props.children}</StoreContext.Provider>;
};
