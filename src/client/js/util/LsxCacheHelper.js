import { LocalStorageManager } from 'growi-commons';

import { PageNode } from '../components/PageNode';

const LSX_STATE_CACHE_NS = 'lsx-state-cache';

export class LsxCacheHelper {

  /**
   * generate cache key for storing to storage
   *
   * @static
   * @param {LsxContext} lsxContext
   * @returns
   *
   * @memberOf LsxCacheHelper
   */
  static generateCacheKeyFromContext(lsxContext) {
    return `${lsxContext.currentPagePath}__${lsxContext.args}`;
  }

  /**
   *
   *
   * @static
   * @param {string} key
   * @returns
   *
   * @memberOf LsxCacheHelper
   */
  static getStateCache(key) {
    const localStorageManager = LocalStorageManager.getInstance();

    const stateCache = localStorageManager.retrieveFromSessionStorage(LSX_STATE_CACHE_NS, key);

    if (stateCache != null && stateCache.nodeTree != null) {
      // instanciate PageNode
      stateCache.nodeTree = stateCache.nodeTree.map((obj) => {
        return PageNode.instanciateFrom(obj);
      });
    }

    return stateCache;
  }

  /**
   * store state object of React Component with specified key
   *
   * @static
   * @param {string} key
   * @param {object} lsxState state object of React Component
   *
   * @memberOf LsxCacheHelper
   */
  static cacheState(key, lsxState) {
    const localStorageManager = LocalStorageManager.getInstance();
    localStorageManager.saveToSessionStorage(LSX_STATE_CACHE_NS, key, lsxState);
  }

  /**
   * clear all state caches
   *
   * @static
   *
   * @memberOf LsxCacheHelper
   */
  static clearAllStateCaches() {
    const localStorageManager = LocalStorageManager.getInstance();
    localStorageManager.saveToSessionStorage(LSX_STATE_CACHE_NS, {});
  }
}
