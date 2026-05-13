import { createContext } from 'react';

export const HeaderContext = createContext({
  setHeader: (node: React.ReactNode | null) => {}
});
