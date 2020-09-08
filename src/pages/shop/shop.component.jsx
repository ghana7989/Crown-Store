import React from 'react';
import { Route } from "react-router-dom"
import { connect } from 'react-redux';
import { FetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import { createStructuredSelector } from "reselect"
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors"

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from "../../components/collections-overview/collections-overview.component"
import CollectionPage from "../collection/collection.component"


const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage)



class ShopPage extends React.Component {

  unsubscribeFromSnapshot = null

  componentDidMount() {
    const { FetchCollectionsStartAsync } = this.props;
    FetchCollectionsStartAsync()
  }

  render() {
    
    // eslint-disable-next-line no-unused-vars
    const { isCollectionFetching, match, isCollectionsLoaded} = this.props
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={!isCollectionsLoaded}{...props} />} />
        <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector(
  {
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionsLoaded: selectIsCollectionsLoaded
  }
)

const mapDispatchToProps = (dispatch) => {
  return {
    FetchCollectionsStartAsync: () => dispatch(FetchCollectionsStartAsync())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
