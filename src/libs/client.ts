import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || '', // 例: 'my-portfolio'
  apiKey: process.env.MICROCMS_API_KEY || '',               // microCMSのAPIキー
});