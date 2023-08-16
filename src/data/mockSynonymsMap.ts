import { SynonymsMap, mockSynonyms } from '../types/synonymsTypes.js';

const mockStartSynonyms: mockSynonyms = {
  start: ['appear', 'initiate', 'begin', 'found', 'build'],
  appear: ['start', 'occur', 'emerge'],
  initiate: ['start', 'launch', 'open'],
  begin: ['start', 'found'],
  found: ['start', 'begin', 'construct', 'form'],
  build: ['start', 'form', 'set up', 'base'],
  occur: ['appear', 'exist', 'arise'],
  emerge: ['appear', 'launch'],
  launch: ['initiate', 'emerge', 'commence'],
  open: ['initiate'],
  construct: ['found'],
  form: ['build', 'found', 'assemble', 'establish'],
  'set up': ['build'],
  base: ['build'],
  exist: ['occur'],
  arise: ['occur', 'originate'],
  commence: ['launch'],
  assemble: ['form', 'establish'],
  establish: ['form', 'assemble'],
  originate: ['arise'],
};

const mockEndSynonyms: mockSynonyms = {
  end: ['close', 'finish', 'stop'],
  close: ['end'],
  finish: ['end', 'accomplish', 'complete', 'stop'],
  stop: ['end', 'finish'],
  accomplish: ['finish', 'finalize'],
  complete: ['finish', 'finalize', 'achieve'],
  finalize: ['accomplish', 'complete'],
  achieve: ['complete'],
};

const mockSynonymsMap: SynonymsMap = new Map();

Object.entries({...mockStartSynonyms, ...mockEndSynonyms}).forEach(([key, value]) => {
  mockSynonymsMap.set(key, new Set([...value]));
});

export default mockSynonymsMap;
