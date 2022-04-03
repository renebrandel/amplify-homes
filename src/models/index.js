// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { NFT, Home } = initSchema(schema);

export {
  NFT,
  Home
};