import { createContext } from 'react';
import { Entry } from '../../interfaces';

interface ContextProps {
  entries: Entry []; //todo falta el tipo de dato del array
}

export const EntriesContext = createContext({} as ContextProps);