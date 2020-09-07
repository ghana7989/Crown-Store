import ShopActionTypes from "./shop.types"


export const UpdateCollections = (collectionsWithExtraData) => {
    return (
        {
            type: ShopActionTypes.UPDATE_COLLECTIONS,
            payload: collectionsWithExtraData
        })
}