import React from 'react';

import "./collection.styles.scss"
import { selectSingleCollection } from "../../redux/shop/shop.selectors"
import { connect } from 'react-redux';
import CollectionItem from "../../components/collection-item/collection-item.component"

const CollectionPage = ({ collection,isLoading }) => {
    console.log(isLoading)
    const { title, items } = collection
    console.log(collection);
    return (
        <div className="collection-page">
            <h2 className="title">
                {title}
            </h2>
            <div className="items">
                {
                    items.map(item => (
                        <CollectionItem key={item.id} item={item} />
                    ))
                }
            </div>
        </div>
    )
}
// Here we are sending second parameter as (state) becaue the function selectSingleCollection
// returns a anonymous selector which uses createSelector which requires state so that is the only
// reason
const mapStateToProps = (state, ownParams) => {
    return {
        collection: selectSingleCollection(ownParams.match.params.collectionId)(state)
    }
}

export default connect(mapStateToProps)(CollectionPage);