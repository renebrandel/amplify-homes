import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type HomeDetailMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type HomeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class HomeDetail {
  readonly id: string;
  readonly address?: string | null;
  readonly image_url?: string | null;
  readonly price?: number | null;
  readonly building_name?: string | null;
  readonly floor?: number | null;
  readonly facilities?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<HomeDetail, HomeDetailMetaData>);
  static copyOf(source: HomeDetail, mutator: (draft: MutableModel<HomeDetail, HomeDetailMetaData>) => MutableModel<HomeDetail, HomeDetailMetaData> | void): HomeDetail;
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