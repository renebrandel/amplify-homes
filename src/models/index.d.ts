import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type NFTMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type HomeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class NFT {
  readonly id: string;
  readonly token_address?: string | null;
  readonly collection_name?: string | null;
  readonly token_id?: string | null;
  readonly name?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<NFT, NFTMetaData>);
  static copyOf(source: NFT, mutator: (draft: MutableModel<NFT, NFTMetaData>) => MutableModel<NFT, NFTMetaData> | void): NFT;
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