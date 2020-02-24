import { customTagUtils, BasicInterceptor } from 'growi-commons';

/**
 * The interceptor for lsx
 *
 *  replace lsx tag to a React target element
 */
export default class LsxPreRenderInterceptor extends BasicInterceptor {

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
  isProcessableParallel() {
    return false;
  }

  /**
   * @inheritdoc
   */
  async process(contextName, ...args) {
    const context = Object.assign(args[0]); // clone
    const parsedHTML = context.parsedHTML;

    const tagPattern = /ls|lsx/;
    const result = customTagUtils.findTagAndReplace(tagPattern, parsedHTML);

    context.parsedHTML = result.html;
    context.lsxContextMap = result.tagContextMap;

    // resolve
    return context;
  }

}
