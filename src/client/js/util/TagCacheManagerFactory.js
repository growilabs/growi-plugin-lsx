import { TagCacheManager } from 'growi-commons';

const LSX_STATE_CACHE_NS = 'lsx-state-cache';

let _instance;
export default class TagCacheManagerFactory {

  static getInstance() {
    if (_instance == null) {
      // create generateCacheKey implementation
      const generateCacheKey = (lsxContext) => {
        return `${lsxContext.fromPagePath}__${lsxContext.args}`;
      };

      _instance = new TagCacheManager(LSX_STATE_CACHE_NS, generateCacheKey);
    }

    return _instance;
  }

}
