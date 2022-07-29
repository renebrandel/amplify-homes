import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type HomeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Home {
  readonly id: string;
  readonly address?: string | null;
  readonly image_url?: string | null;
  readonly price?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Home, HomeMetaData>);
  static copyOf(source: Home, mutator: (draft: MutableModel<Home, HomeMetaData>) => MutableModel<Home, HomeMetaData> | void): Home;
}