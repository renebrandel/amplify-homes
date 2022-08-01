// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { HomeDetail, Home } = initSchema(schema);

export {
  HomeDetail,
  Home
};