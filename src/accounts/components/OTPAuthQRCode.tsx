import { memoAccount } from '$accounts/memo-account';
import { IAccount } from '$accounts/models/account';
import { createStyles, Paper } from '@mantine/core';
import { useState } from 'react';
import QRCode from 'react-qr-code';

const useStyles = createStyles((theme) => ({
  root: {
    border: `0.1rem dashed ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4]}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xs / 2,
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

interface OTPAuthQRCodeProps {
  account: IAccount;
}

function OTPAuthQRCode({ account: { label, secret, issuer, algorithm, digits, period } }: OTPAuthQRCodeProps) {
  const { classes } = useStyles();
  const [visible, setVisible] = useState(false);

  const value =
    `otpauth://totp/${label}` +
    `?secret=${secret}` +
    `&issuer=${issuer}` +
    `&algorithm=${algorithm}` +
    `&digits=${digits}` +
    `&period=${period}`;

  const handleClick = () => setVisible((value) => !value);

  return (
    <Paper
      id="qr-code-container"
      shadow="xs"
      className={classes.root}
      sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' && visible ? 'white' : 'transparent' })}
      onClick={handleClick}
    >
      <QRCode id="qr-code" style={{ opacity: visible ? 1.0 : 0.1 }} size={180} value={value} />
    </Paper>
  );
}

export default memoAccount(OTPAuthQRCode);
