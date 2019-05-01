import React from 'react';
import PropTypes from 'prop-types';

import PagePath from '@client/js/components/PageList/PagePath';

export default class PagePathWrapper extends React.Component {

  render() {

    const classNames = [];
    if (!this.props.isExists) {
      classNames.push('lsx-page-not-exist');
    }

    return (
      <PagePath page={{ path: this.props.pagePath }} isShortPathOnly additionalClassNames={classNames} />
    );
  }

}

PagePathWrapper.propTypes = {
  pagePath: PropTypes.string.isRequired,
  isExists: PropTypes.bool.isRequired,
  excludePathString: PropTypes.string,
};

PagePathWrapper.defaultProps = {
  excludePathString: '',
};
