import React from 'react';
import ReactDOM from 'react-dom';

import { BasicInterceptor } from 'growi-commons';

import LsxContext from 'growi-plugin-lsx/src/client/js/util/LsxContext';
import Lsx from '../../components/Lsx';

/**
 * The interceptor for lsx
 *
 *  render React DOM
 */
export default class LsxPostRenderInterceptor extends BasicInterceptor {

  constructor(appContainer) {
    super();
    this.appContainer = appContainer;
  }

  /**
   * @inheritdoc
   */
  isInterceptWhen(contextName) {
    return (
      contextName === 'postRenderHtml'
      || contextName === 'postRenderPreviewHtml'
    );
  }

  /**
   * @inheritdoc
   */
  process(contextName, ...args) {
    const context = Object.assign(args[0]); // clone

    // forEach keys of tagContextMap
    Object.keys(context.tagContextMap).forEach((domId) => {
      const elem = document.getElementById(domId);

      if (elem) {
        // get TagContext instance from context
        const tagContext = context.tagContextMap[domId] || {};
        // create LsxContext instance
        const lsxContext = new LsxContext(tagContext);
        lsxContext.fromPagePath = context.currentPagePath;

        this.renderReactDOM(lsxContext, elem);
      }
    });

    return Promise.resolve();
  }

  renderReactDOM(lsxContext, elem) {
    ReactDOM.render(
      <Lsx appContainer={this.appContainer} lsxContext={lsxContext} />,
      elem,
    );
  }

}
