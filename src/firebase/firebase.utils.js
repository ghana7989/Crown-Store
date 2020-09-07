import firebase from 'firebase/app';
import "firebase/firestore"
import "firebase/auth"



var config = {
    apiKey: "AIzaSyAd3EvzEuH9jG6Ksik3iohhnhtTb6zTzpg",
    authDomain: "store-db-19383.firebaseapp.com",
    databaseURL: "https://store-db-19383.firebaseio.com",
    projectId: "store-db-19383",
    storageBucket: "store-db-19383.appspot.com",
    messagingSenderId: "940194323555",
    appId: "1:940194323555:web:e043b7faa3734880192c56",
    measurementId: "G-194S79NG79"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = firebase.firestore.Timestamp.now()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log(error.message, "User Can't be created");
        }
    }
    return userRef;
}


firebase.initializeApp(config)

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collelctionsRef = firestore.collection(collectionKey)
    const batch = firestore.batch()

    objectsToAdd.forEach(obj => {
        const newDocumentRef = collelctionsRef.doc()
        batch.set(newDocumentRef, obj)
    })
    // batch.commit() returns a promise. we are returning it so that when we call this function
    // we can .then and check wether the files are uploaded or not
    // if .then is null then it completed with no errors if not we are fucked up
    return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data()

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })
    console.log(transformedCollection)
    return transformedCollection.reduce((acc, collection) => {
        acc[collection.title.toLowerCase()] = collection
        return acc
    }, {})
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({
    prompt: "select_account",
})

export const signInWithGoogle = () => auth.signInWithPopup(provider)


export default firebase