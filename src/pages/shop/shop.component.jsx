import React from 'react';
import { Route } from "react-router-dom"
import CollectionsOverview from "../../components/collections-overview/collections-overview.component"

import CollectionPage from "../collection/collection.component"
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils"
import { connect } from 'react-redux';
import { UpdateCollections } from "../../redux/shop/shop.actions"

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null

  componentDidMount() {
    const { updateCollection } = this.props
    const collectionsRef = firestore.collection("collections");

    collectionsRef.onSnapshot(async snapshot => {
      const collectionsWithExtraData = convertCollectionsSnapshotToMap(snapshot)
      updateCollection(collectionsWithExtraData)
    })
  }

  render() {
    const { match } = this.props
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
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
