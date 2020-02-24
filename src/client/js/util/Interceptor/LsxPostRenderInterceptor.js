import React from 'react';
import ReactDOM from 'react-dom';

import { BasicInterceptor } from 'growi-commons';

import LsxContext from '../LsxContext';
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
  async process(contextName, ...args) {
    const context = Object.assign(args[0]); // clone

    // forEach keys of lsxContextMap
    Object.keys(context.lsxContextMap).forEach((domId) => {
      const elem = document.getElementById(domId);

      if (elem) {
        // instanciate LsxContext from context
        const lsxContext = new LsxContext(context.lsxContextMap[domId] || {});
        lsxContext.fromPagePath = context.currentPagePath;

        this.renderReactDOM(lsxContext, elem);
      }
    });

    return;
  }

  renderReactDOM(lsxContext, elem) {
    const isPreview = (lsxContext.contextName === 'postRenderPreviewHtml');

    ReactDOM.render(
      <Lsx appContainer={this.appContainer} lsxContext={lsxContext} forceToFetchData={!isPreview} />,
      elem,
    );
  }

}
