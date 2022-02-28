import { config } from './config';
import { createConnection } from 'typeorm';
import { getPrivateConfig } from './util/privateConfig';

export const initDbConnection = async () => {
  const { db: privateDbConfig } = getPrivateConfig(config.privateConfigPath);
  await createConnection({
    ...config.db,
    ...privateDbConfig
  });
  console.log('init db successful');
};
