import { developmentConfig } from './dev';
import { productionConfig } from './prod';

const env = process.env.NODE_ENV;

const getConfig = () => {
  if (env === 'development') {
    return developmentConfig;
  }
  return productionConfig;
};

export const config = getConfig();
