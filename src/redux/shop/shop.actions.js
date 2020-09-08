import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils"
import ShopActionTypes from "./shop.types";


export const FetchCollectionsStart = () => {
    return (
        {
            type: ShopActionTypes.FETCH_COLLECTIONS_START,
        })
}

export const FetchCollectionsSuccsess = (collectionsWithExtraData) => {
    return ({
        type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
        payload: collectionsWithExtraData
    })
}

export const FetchCollectionsFailure = (errorMessage) => {
    return ({
        type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
        payload: errorMessage
    }
    )
}

export const FetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionsRef = firestore.collection("collections");
        dispatch(FetchCollectionsStart)

        collectionsRef.get().then(snapshot => {
            const collectionsWithExtraData = convertCollectionsSnapshotToMap(snapshot)
            dispatch(FetchCollectionsSuccsess(collectionsWithExtraData))
        }).catch(err => dispatch(FetchCollectionsFailure(err.message)))
    }
}