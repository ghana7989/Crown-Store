import React, { useEffect } from 'react';
import { Route } from "react-router-dom"
import { connect } from 'react-redux';
import { FetchCollectionsStart } from "../../redux/shop/shop.actions";


import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container"
import CollectionsPageContainer from "../collection/collection.container"


const ShopPage = ({ FetchCollectionsStart, match }) => {


  // componentDidMount() {
  //   const { FetchCollectionsStart } = this.props;
  //   FetchCollectionsStart()
  // }

  useEffect(() => {
    FetchCollectionsStart()
  }, [FetchCollectionsStart])

  // eslint-disable-next-line no-unused-vars
  return (
    <div className='shop-page'>
      <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
      <Route path={`${match.path}/:collectionId`} component={CollectionsPageContainer} />
    </div>
  );

}



const mapDispatchToProps = (dispatch) => {
  return {
    FetchCollectionsStart: () => dispatch(FetchCollectionsStart())
  }
}

export default connect(null, mapDispatchToProps)(ShopPage);
