export type SynonymsSet = Set<string>;
export type SynonymsMap = Map<string, SynonymsSet>;

export interface mockSynonyms {
  [key: string]: string[];
}

