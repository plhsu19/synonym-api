import { SynonymsMap, SynonymsSet } from '../types/synonymsTypes.js';

export class Dfs {
  private synonymsSet: SynonymsSet;
  constructor() {
    this.synonymsSet = new Set();
  }

  public getSynonymsResult(word: string, map: SynonymsMap): SynonymsSet {
    this.search(word, map);
    return this.synonymsSet;
  }

  private search(word: string, map: SynonymsMap): void {
    this.synonymsSet.add(word);
    const synonyms = map.get(word);

    if (synonyms.size === 0) return;

    synonyms.forEach((synonym: string) => {
      if (!this.synonymsSet.has(synonym)) this.search(synonym, map);
    });
  }
}

export const functionalSearch = (
  word: string,
  map: SynonymsMap,
  set: SynonymsSet,
): SynonymsSet => {
  const updatedSet: SynonymsSet = new Set([...set]);
  updatedSet.add(word);

  const synonyms = map.get(word);
  if (synonyms.size === 0) return updatedSet;

  const synonymsArray: string[] = [...synonyms];
  const updatedSynonymsSet = synonymsArray.reduce(
    (synonymsSet: SynonymsSet, synonym: string) => {
      return synonymsSet.has(synonym)
        ? synonymsSet
        : functionalSearch(synonym, map, synonymsSet);
    },
    updatedSet,
  );

  return updatedSynonymsSet;
};
