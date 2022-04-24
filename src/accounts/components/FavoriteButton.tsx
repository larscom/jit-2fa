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

  const { uuid } = account;
  const isFavorite = favorites.includes(uuid);
  const iconSize = 32;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      timeoutRef.current && clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setFavorites((favorites) => {
          return favorites.includes(uuid) ? favorites.filter((favorite) => favorite !== uuid) : [...favorites, uuid];
        });
        setClicked(false);
      }, 150);

      setClicked(true);
    },
    [setFavorites, uuid, setClicked]
  );

  useEffect(() => () => timeoutRef.current && clearTimeout(timeoutRef.current), []);

  return (
    <ActionIcon
      size={iconSize}
      onClick={handleClick}
      variant={clicked ? 'outline' : 'transparent'}
      color={isFavorite || clicked ? 'yellow' : 'gray'}
      title={isFavorite ? 'Marked as favorite' : 'Make favorite'}
    >
      <IconStar size={iconSize} />
    </ActionIcon>
  );
}

export default memo(FavoriteButton);
