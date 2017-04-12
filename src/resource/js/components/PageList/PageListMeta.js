import React from 'react';

export class PageListMeta extends React.Component {

  isPortalPath(path) {
    if (path.match(/.*\/$/)) {
      return true;
    }

    return false;
  }

  render() {
    // TODO isPortal()
    const page = this.props.page;

    // portal check
    let PortalLabel;
    if (this.isPortalPath(page.path)) {
      PortalLabel = <span className="label label-info">PORTAL</span>;
    }

    let CommentCount;
    if (page.commentCount > 0) {
      CommentCount = <span><i className="fa fa-comment" />{page.commentCount}</span>;
    }

    let LikerCount;
    if (page.liker.length > 0) {
      LikerCount = <span><i className="fa fa-thumbs-up" />{page.liker.length}</span>;
    }


    return (
      <span className="page-list-meta">
        {PortalLabel}
        {CommentCount}
        {LikerCount}
      </span>
    );
  }
}

PageListMeta.propTypes = {
  page: React.PropTypes.object.isRequired,
};

PageListMeta.defaultProps = {
  page: {},
};

