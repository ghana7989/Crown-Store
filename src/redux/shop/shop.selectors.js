import { createSelector } from 'reselect'

const selctShop = (state) => state.shop

export const selectCollections = createSelector(
    [selctShop],
    shop => shop.collections
)

export default selectCollections;