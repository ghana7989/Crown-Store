import React from 'react';
import { Route } from "react-router-dom"
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils"
import { connect } from 'react-redux';
import { UpdateCollections } from "../../redux/shop/shop.actions"

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from "../../components/collections-overview/collections-overview.component"
import CollectionPage from "../collection/collection.component"


const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage)



class ShopPage extends React.Component {
  state = {
    isLoading: true
  }
  unsubscribeFromSnapshot = null

  componentDidMount() {
    const { updateCollection } = this.props
    const collectionsRef = firestore.collection("collections");

    collectionsRef.onSnapshot(async snapshot => {
      const collectionsWithExtraData = convertCollectionsSnapshotToMap(snapshot)
      updateCollection(collectionsWithExtraData)
      this.setState({ isLoading: false })
    })
  }

  render() {
    const { match } = this.props
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={this.state.isLoading}{...props} />} />
        <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={this.state.isLoading} {...props} />} />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateCollection: (collectionsWithExtraData) => dispatch(UpdateCollections(collectionsWithExtraData))
  }
}

export default connect(null, mapDispatchToProps)(ShopPage);
