import React from 'react';
import PropTypes from 'prop-types';

import { Page } from './Page';
import { PageNode } from '../PageNode';

import { LsxContext } from '../../util/LsxContext';

export class ListView extends React.Component {

  render() {
    const listView = this.props.nodeTree.map((pageNode) => {
      return (
        <Page key={pageNode.pagePath} depth={1}
          pageNode={pageNode}
          lsxContext={this.props.lsxContext}
        />
      );
    });

    // no contents
    if (this.props.nodeTree.length == 0) {
      return <div className="text-muted">
          <small>
            <i className="fa fa-fw fa-info-circle" aria-hidden="true"></i>
            $lsx(<a href={this.props.lsxContext.pagePath}>{this.props.lsxContext.pagePath}</a>) has no contents
          </small>
        </div>;
    }

    return (
      <div className="page-list lsx">
        <ul className="page-list-ul">
        {listView}
        </ul>
      </div>
    );
  }
}

ListView.propTypes = {
  nodeTree: PropTypes.arrayOf(PropTypes.instanceOf(PageNode)).isRequired,
  lsxContext: PropTypes.instanceOf(LsxContext).isRequired,
};
