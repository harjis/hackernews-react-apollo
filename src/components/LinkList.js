import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';

import Link from './Link';

class LinkList extends Component {
  render() {
    if (this.props.allLinksQuery && this.props.allLinksQuery.loading) {
      return <div>Loading</div>;
    }

    if (this.props.allLinksQuery && this.props.allLinksQuery.error) {
      return (
        <div>
          Error:
          {this.props.allLinksQuery.error.message}
        </div>
      );
    }

    const linksToRender = this.props.allLinksQuery.allLinks;

    return (
      <div>
        {linksToRender.map(link => <Link key={link.id} link={link} />)}
      </div>
    );
  }
}

const ALL_LINKS_QUERY = gql`
    # 2
    query AllLinksQuery {
        allLinks {
            id
            url
            description
        }
    }
`;

export default graphql(ALL_LINKS_QUERY, { name: 'allLinksQuery' })(LinkList);
