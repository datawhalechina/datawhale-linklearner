import path from 'path';

export const productionConfig = {
  privateConfigPath: path.join(__dirname, '../../private.json'),
  db: {
    type: 'mysql',
    entities: [path.join(__dirname, '../entity/**/*.js')]
  },
  staticFilePath: path.join(__dirname, '../client'),
  aboutFilePath: path.join(__dirname, '../about')
};
