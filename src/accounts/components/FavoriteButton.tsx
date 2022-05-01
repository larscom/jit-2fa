import { memoAccount } from '$accounts/memo-account';
import { IAccount } from '$accounts/models/account';
import { AccountsContext } from '$core/contexts/accounts';
import { ActionIcon, useMantineTheme } from '@mantine/core';
import { IconStar } from '@tabler/icons';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';

interface FavoriteButtonProps {
  account: IAccount;
}

function FavoriteButton({ account }: FavoriteButtonProps) {
  const { favorites, setFavorites } = useContext(AccountsContext);
  const [clicked, setClicked] = useState(false);
  const { colorScheme, colors } = useMantineTheme();

  const timeoutRef = useRef<NodeJS.Timeout>();

  const { uuid } = account;
  const isFavorite = favorites.includes(uuid);
  const isActive = isFavorite || clicked;
  const iconSize = 32;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      setClicked(true);

      timeoutRef.current && clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setFavorites((favorites) => {
          return favorites.includes(uuid) ? favorites.filter((favorite) => favorite !== uuid) : [...favorites, uuid];
        });
        setClicked(false);
      }, 150);
    },
    [setFavorites, uuid, setClicked]
  );

  useEffect(() => () => timeoutRef.current && clearTimeout(timeoutRef.current), []);

  return (
    <ActionIcon
      variant="transparent"
      size={iconSize}
      onClick={handleClick}
      color={isActive ? 'yellow' : colorScheme === 'dark' ? 'dark' : 'gray'}
      title={isActive ? 'Marked as favorite' : 'Make favorite'}
    >
      <IconStar
        fill={isActive ? (colorScheme === 'dark' ? colors.yellow[6] : colors.yellow[3]) : 'none'}
        size={iconSize}
      />
    </ActionIcon>
  );
}

export default memoAccount(FavoriteButton);
