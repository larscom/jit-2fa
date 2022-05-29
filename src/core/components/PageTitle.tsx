import { ActionIcon, createStyles, Group, Text, Title } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { IconArrowLeft } from '@tabler/icons';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  title: {
    textTransform: 'capitalize'
  },
  previous: {
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]
    }
  }
}));

interface PageTitleProps {
  title: string;
  subtitle?: string;
  disablePrevious?: boolean;
}

function PageTitle({ title, subtitle, disablePrevious }: PageTitleProps) {
  const { classes } = useStyles();

  const navigate = useNavigate();

  useDocumentTitle(`Just In Time | ${title}`);

  return (
    <Group mb="lg" spacing="xl">
      {!disablePrevious && (
        <ActionIcon className={classes.previous} onClick={() => navigate(-1)} title="Back to previous">
          <IconArrowLeft />
        </ActionIcon>
      )}
      <Title id="page-title" order={2}>
        <span className={classes.title}>{title}</span>
        {subtitle && <Text size="xs">{subtitle.toLocaleLowerCase()}</Text>}
      </Title>
    </Group>
  );
}

export default memo(PageTitle);
