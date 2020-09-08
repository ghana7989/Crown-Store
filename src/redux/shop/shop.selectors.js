import { createSelector } from 'reselect'
import memoize from "lodash/memoize"

const selectShop = (state) => state.shop

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)



export const selectSingleCollection = memoize(collectionUrlParam => {
    return createSelector(
        [selectCollections],
        collections => collections[collectionUrlParam]
    )
})
export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)

export const selectIsCollectionFetching = createSelector(
    selectShop,
    shop => shop.isFetching
)

export const selectIsCollectionsLoaded = createSelector(
    selectShop,
    // !! converts any value into boolean datatype
    shop => !!shop.collections
)











export default selectCollections;