/// <reference types="vite/client" />

declare module 'crypto-aes-gcm' {
  declare function aesGcmEncrypt(plainText: string, password: string): Promise<string>;
  declare function aesGcmDecrypt(cipherText: string, password: string): Promise<string>;
}
