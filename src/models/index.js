// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Home } = initSchema(schema);

export {
  Home
};