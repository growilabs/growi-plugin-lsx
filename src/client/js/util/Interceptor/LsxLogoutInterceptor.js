import { BasicInterceptor } from 'growi-commons';

import TagCacheManagerFactory from '../TagCacheManagerFactory';

/**
 * The interceptor for lsx
 *
 *  replace lsx tag to a React target element
 */
export default class LsxLogoutInterceptor extends BasicInterceptor {

  /**
   * @inheritdoc
   */
  isInterceptWhen(contextName) {
    return (
      contextName === 'logout'
    );
  }

  /**
   * @inheritdoc
   */
  async process(contextName, ...args) {
    const context = Object.assign(args[0]); // clone

    TagCacheManagerFactory.getInstance().clearAllStateCaches();

    // resolve
    return context;
  }

}
