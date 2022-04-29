import { createContext } from 'react';

interface IFavoritesContext {
  favorites: string[];
  setFavorites: (val: string[] | ((prevState: string[]) => string[])) => void;
}

export const FavoritesContext = createContext<IFavoritesContext>({
  favorites: [],
  setFavorites: () => {
    throw Error('Not implemented.');
  }
});

export const FavoritesContextProvider = FavoritesContext.Provider;
