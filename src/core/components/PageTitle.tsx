import { ActionIcon, createStyles, Group, Text, Title } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { IconArrowLeft } from '@tabler/icons';
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

  useDocumentTitle(`JIT | ${title.toLocaleUpperCase()}`);

  const renderTitle = () => (
    <Title order={2}>
      <span className={classes.title}>{title}</span>
      {subtitle && <Text size="xs">{subtitle.toLocaleLowerCase()}</Text>}
    </Title>
  );

  return disablePrevious ? (
    renderTitle()
  ) : (
    <Group spacing="xl">
      <ActionIcon className={classes.previous} onClick={() => navigate(-1)} title="Back to previous">
        <IconArrowLeft />
      </ActionIcon>
      {renderTitle()}
    </Group>
  );
}

export default PageTitle;
