/* eslint-disable no-unused-vars */
import { takeLatest, call, put,all } from "redux-saga/effects"
import ShopActionsType from "./shop.types"
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils"
import {
    FetchCollectionsSuccsess,
    FetchCollectionsFailure
} from "./shop.actions.js"

export function* FetchCollectionsAsync() {

    try {
        const collectionsRef = firestore.collection("collections");
        const snapshot = yield collectionsRef.get()
        const collectionsWithExtraData = yield call(convertCollectionsSnapshotToMap, snapshot)

        // this is similar to dispatch(FetchCollectionsSuccsess(collectionsWithExtraData))
        yield put(FetchCollectionsSuccsess(collectionsWithExtraData))

    } catch (error) {
        yield put(FetchCollectionsFailure(error.message))
    }

    // collectionsRef.get().then(snapshot => {
    //     const collectionsWithExtraData = convertCollectionsSnapshotToMap(snapshot)
    //     dispatch(FetchCollectionsSuccsess(collectionsWithExtraData))
    // }).catch(err => dispatch(FetchCollectionsFailure(err.message)))
}

export function* FetchCollectionsStart() {
    yield takeLatest(
        ShopActionsType.FETCH_COLLECTIONS_START,
        FetchCollectionsAsync
    )
}

export function* shopSagas() {
    yield all([
        call(FetchCollectionsStart)
    ])
}