import { IAccount } from '$accounts/models/account';
import { Paper } from '@mantine/core';
import { useState } from 'react';
import QRCode from 'react-qr-code';

interface OTPAuthQRCodeProps {
  account: IAccount;
}

function OTPAuthQRCode({ account: { label, secret, issuer, algorithm, digits, period } }: OTPAuthQRCodeProps) {
  const [visible, setVisible] = useState(false);

  const value =
    `otpauth://totp/${label}` +
    `?secret=${secret}` +
    `&issuer=${issuer}` +
    `&algorithm=${algorithm}` +
    `&digits=${digits}` +
    `&period=${period}`;

  return (
    <Paper
      shadow="xs"
      sx={(theme) => ({
        border: `0.1rem dashed ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4]}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colorScheme === 'dark' && visible ? 'white' : 'transparent',
        padding: theme.spacing.xs / 2,
        '&:hover': {
          cursor: 'pointer'
        }
      })}
      onClick={() => setVisible((v) => !v)}
    >
      <QRCode style={{ opacity: visible ? 1.0 : 0.1 }} size={180} value={value} />
    </Paper>
  );
}

export default OTPAuthQRCode;
