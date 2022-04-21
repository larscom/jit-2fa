import { IAccount } from '$accounts/models/account';
import { ActionIcon } from '@mantine/core';
import { IconStar } from '@tabler/icons';
import { useCallback, useEffect, useRef, useState } from 'react';

interface FavoriteButtonProps {
  account: IAccount;
  isFavorite: boolean;
  setFavorites: (val: string[] | ((prevState: string[]) => string[])) => void;
}

function FavoriteButton({ account, isFavorite, setFavorites }: FavoriteButtonProps) {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [clicked, setClicked] = useState(false);

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
      }, 200);

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

export default FavoriteButton;
