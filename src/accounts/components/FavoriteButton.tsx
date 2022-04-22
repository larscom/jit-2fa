import { FavoritesContext } from '$accounts/contexts/favorites-context';
import { IAccount } from '$accounts/models/account';
import { ActionIcon } from '@mantine/core';
import { IconStar } from '@tabler/icons';
import { memo, useCallback, useContext, useEffect, useRef, useState } from 'react';

interface FavoriteButtonProps {
  account: IAccount;
}

function FavoriteButton({ account }: FavoriteButtonProps) {
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const [clicked, setClicked] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const isFavorite = favorites.includes(account.uuid);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      const { uuid } = account;

      timeoutRef.current && clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setFavorites((favorites) => {
          return favorites.includes(uuid) ? favorites.filter((favorite) => favorite !== uuid) : [...favorites, uuid];
        });
        setClicked(false);
      }, 150);

      setClicked(true);
    },
    [setFavorites, account, setClicked]
  );

  useEffect(() => () => timeoutRef.current && clearTimeout(timeoutRef.current), []);

  return (
    <ActionIcon
      size={30}
      onClick={handleClick}
      variant={clicked ? 'outline' : 'transparent'}
      color={isFavorite || clicked ? 'yellow' : 'gray'}
      title={isFavorite ? 'Marked as favorite' : 'Make favorite'}
    >
      <IconStar size={30} />
    </ActionIcon>
  );
}

export default memo(FavoriteButton);
