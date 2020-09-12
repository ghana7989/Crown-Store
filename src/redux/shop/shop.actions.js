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
