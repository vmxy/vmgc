import { LRUCache } from "lru-cache";
const options = {
  max: 500,

  // for use with tracking overall storage size
  maxSize: 5000,

  // for use when you need to clean up something when objects
  // are evicted from the cache
  dispose: (value, key) => {
    //freeFromMemoryOrWhatever(value);
  },

  // how long to live in ms
  ttl: 5 * 60 * 1000,
  ttlAutopurge: true,

  // return stale items before removing from cache?
  allowStale: false,

  updateAgeOnGet: false,
  updateAgeOnHas: false,
  sizeCalculation: (value, key) => {
    return 1;
  },

  // async method to use for cache.fetch(), for
  // stale-while-revalidate type of behavior
  //fetchMethod: async (key, staleValue, { options, signal, context }) => {},
};

export const cache = new LRUCache(options);
export function createCache(opts: { ttl: number }) {
  return new LRUCache(Object.assign({}, options, opts));
}
export default cache;
