function setupAccounts() {
  window.localStorage.setItem(
    'totp-accounts',
    JSON.stringify([
      {
        uuid: 'b743e71c-ffbe-4537-8e1e-4c3f3c8fe0e3',
        label: 'user001@email.com',
        issuer: 'Amazon',
        secret: '6B3M252IEIS5HOBW3YX6AGWNVXVVQEVV',
        algorithm: 'SHA1',
        digits: 6,
        period: 30
      },
      {
        uuid: '077933ea-3211-428a-80bd-e5079bcac694',
        label: 'user002@email.com',
        issuer: 'Amazon',
        secret: '3YX6AGWNVXVVQEVV6B3M252IEIS5HOBW',
        algorithm: 'SHA256',
        digits: 8,
        period: 30
      },
      {
        uuid: '70a22f40-4359-479e-9b12-00f975c58e18',
        label: 'user003@email.com',
        issuer: 'Google',
        secret: 'ZSTVFWWPVT5FV4MXHWH3GCETSSUSNAEQ',
        algorithm: 'SHA512',
        digits: 10,
        period: 30
      },
      {
        uuid: '16120f97-435d-40bf-b759-777265ee403b',
        label: 'user004@email.com',
        issuer: 'Microsoft',
        secret: 'HWH3GCETSSUSNAEQZSTVFWWPVT5FV4MX',
        algorithm: 'SHA1',
        digits: 6,
        period: 60
      },
      {
        uuid: '89d8a226-6cc8-421a-b395-4975747578cf',
        label: 'user005@email.com',
        issuer: 'Facebook',
        secret: 'TRNBMGKBUZPS6U6PCNOUKJZFX6D66HZT',
        algorithm: 'SHA256',
        digits: 8,
        period: 60
      },
      {
        uuid: '3555413f-4628-47eb-af3a-43b05659b34f',
        label: 'user006@email.com',
        issuer: 'Github',
        secret: 'CNOUKJZFX6D66HZTTRNBMGKBUZPS6U6P',
        algorithm: 'SHA512',
        digits: 10,
        period: 60
      },
      {
        uuid: '1f4729fd-47eb-4fe9-a479-71627999e132',
        label: 'user007@email.com',
        issuer: 'Gitlab',
        secret: 'XPZ5TVKN5FMUDBAHZKEYFQC77EBI27JL',
        algorithm: 'SHA1',
        digits: 6,
        period: 90
      },
      {
        uuid: '75e432d6-ad0f-4821-b733-6853bcdaa1ec',
        label: 'user008@email.com',
        issuer: 'Binance',
        secret: 'ZKEYFQC77EBI27JLXPZ5TVKN5FMUDBAH',
        algorithm: 'SHA256',
        digits: 8,
        period: 90
      },
      {
        uuid: '7ed55405-36e7-4987-943b-047f0ae2e805',
        label: 'user009@email.com',
        issuer: 'Firefox',
        secret: 'VWXRVSK4X72NWJBJOETOCP3YYPPGQZI7',
        algorithm: 'SHA512',
        digits: 10,
        period: 90
      },
      {
        uuid: 'a7db51cf-688b-4e3d-8954-a95e824c3695',
        label: 'user010@email.com',
        issuer: 'Coinbase',
        secret: 'OETOCP3YYPPGQZI7VWXRVSK4X72NWJBJ',
        algorithm: 'SHA1',
        digits: 6,
        period: 30
      },
      {
        uuid: '7e8ab666-773e-4bc3-93c8-f324851784ef',
        label: 'user011@email.com',
        issuer: 'Linode',
        secret: 'MRESOVDE4HHGDL4OOETOCP3YYPPGQZI7',
        algorithm: 'SHA1',
        digits: 6,
        period: 30
      }
    ])
  );
}

function setupFavorites() {
  window.localStorage.setItem(
    'totp-favorites',
    JSON.stringify(['3555413f-4628-47eb-af3a-43b05659b34f', '1f4729fd-47eb-4fe9-a479-71627999e132'])
  );
}
