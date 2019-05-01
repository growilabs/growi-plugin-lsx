import { customTagUtils, BasicInterceptor } from 'growi-commons';

import LsxCacheHelper from '../LsxCacheHelper';

/**
 * The interceptor for lsx
 *
 *  replace lsx tag to a React target element
 */
export default class LsxPreRenderInterceptor extends BasicInterceptor {

  constructor(crowi) {
    super();
    this.crowi = crowi;
    this.crowiForJquery = crowi.getCrowiForJquery();
  }

  /**
   * @inheritdoc
   */
  isInterceptWhen(contextName) {
    return (
      contextName === 'preRenderHtml'
      || contextName === 'preRenderPreviewHtml'
    );
  }

  /**
   * @inheritdoc
   */
  process(contextName, ...args) {
    const context = Object.assign(args[0]); // clone
    const parsedHTML = context.parsedHTML;
    this.initializeCache(contextName);

    context.lsxContextMap = {};

    const tagPattern = /ls|lsx/;
    const result = customTagUtils.findTagAndReplace(tagPattern, parsedHTML);

    context.parsedHTML = result.html;
    context.tagContextMap = result.tagContextMap;

    // resolve
    return Promise.resolve(context);
  }

  /**
   * initialize cache
   *  when contextName is 'preRenderHtml'         -> clear cache
   *  when contextName is 'preRenderPreviewHtml'  -> doesn't clear cache
   *
   * @param {string} contextName
   *
   * @memberOf LsxPreRenderInterceptor
   */
  initializeCache(contextName) {
    if (contextName === 'preRenderHtml') {
      LsxCacheHelper.clearAllStateCaches();
    }
  }

}
