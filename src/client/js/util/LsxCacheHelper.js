import { LocalStorageManager } from 'growi-commons';

// eslint-disable-next-line no-unused-vars
import LsxContext from './LsxContext';

import PageNode from '../components/PageNode';

const LSX_STATE_CACHE_NS = 'lsx-state-cache';

export default class LsxCacheHelper {

  /**
   * generate cache key for storing to storage
   *
   * @returns {LsxContext}
   */
  static generateCacheKey(lsxContext) {
    return `${lsxContext.fromPagePath}__${lsxContext.args}`;
  }

  /**
   *
   *
   * @static
   * @param {LsxContext} lsxContext
   * @returns
   *
   * @memberOf LsxCacheHelper
   */
  static getStateCache(lsxContext) {
    const localStorageManager = LocalStorageManager.getInstance();

    const key = LsxCacheHelper.generateCacheKey(lsxContext);
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
   * @param {LsxContext} lsxContext
   * @param {object} lsxState state object of React Component
   *
   * @memberOf LsxCacheHelper
   */
  static cacheState(lsxContext, lsxState) {
    const localStorageManager = LocalStorageManager.getInstance();
    const key = LsxCacheHelper.generateCacheKey(lsxContext);
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
