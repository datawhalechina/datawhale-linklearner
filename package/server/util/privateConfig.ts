import fs from 'fs';

export const getPrivateConfig = (filepath: string) => {
  let privateConfig: any = {};
  try {
    const privateConfigStr = fs.readFileSync(filepath).toString();
    privateConfig = JSON.parse(privateConfigStr);
  } catch (e) {
    console.error('private.json not exist');
  }
  return privateConfig;
};
