import { ActionIcon, createStyles, Group, Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  previous: {
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]
    }
  }
}));

interface PageTitleProps {
  title: string;
  disablePrevious?: boolean;
}

function PageTitle({ title, disablePrevious }: PageTitleProps) {
  const navigate = useNavigate();

  const { classes } = useStyles();

  const renderTitle = () => <Title order={2}>{title}</Title>;

  return disablePrevious ? (
    renderTitle()
  ) : (
    <Group>
      <ActionIcon className={classes.previous} onClick={() => navigate(-1)} title="Back to previous">
        <IconArrowLeft />
      </ActionIcon>
      {renderTitle()}
    </Group>
  );
}

export default PageTitle;
