import path from 'path';

export const developmentConfig = {
  privateConfigPath: path.join(__dirname, '../../../private.json'),
  db: {
    type: 'mysql',
    entities: [path.join(__dirname, '../entity/**/*.ts')]
  },
  staticFilePath: path.join(__dirname, '../../../output/client'),
  aboutFilePath: path.join(__dirname, '../../about')
};
