import { createContext } from 'react';

interface IFilterContext {
  favoritesChecked: boolean;
  searchTerm: string;
}

export const FilterContext = createContext<IFilterContext>({
  favoritesChecked: false,
  searchTerm: ''
});

export const FilterContextProvider = FilterContext.Provider;
