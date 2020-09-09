import React from 'react';
import { Route } from "react-router-dom"
import { connect } from 'react-redux';
import { FetchCollectionsStartAsync } from "../../redux/shop/shop.actions";


import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container"
import CollectionsPageContainer from "../collection/collection.container"





class ShopPage extends React.Component {

  unsubscribeFromSnapshot = null

  componentDidMount() {
    const { FetchCollectionsStartAsync } = this.props;
    FetchCollectionsStartAsync()
  }

  render() {

    // eslint-disable-next-line no-unused-vars
    const { match } = this.props
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
        <Route path={`${match.path}/:collectionId`} component={CollectionsPageContainer} />
      </div>
    );
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    FetchCollectionsStartAsync: () => dispatch(FetchCollectionsStartAsync())
  }
}

export default connect(null, mapDispatchToProps)(ShopPage);
