import { HexabaseClient, User, Item, Datastore } from '@hexabase/hexabase-js';

const client = new HexabaseClient();
export { User, type Datastore, Item };
export default client;
