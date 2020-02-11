import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBE5iQH0eaX5AtgptX5k2povo3ZrGI1OgY",
  authDomain: "crwn-db-1a299.firebaseapp.com",
  databaseURL: "https://crwn-db-1a299.firebaseio.com",
  projectId: "crwn-db-1a299",
  storageBucket: "crwn-db-1a299.appspot.com",
  messagingSenderId: "288001524858",
  appId: "1:288001524858:web:de970f7e0e52b70012e7c3"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    // need to use documentRef to .set(), .get(), .update(), .delete()
    // what data do we need to create document

    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  // returns a reference to the user to use it else where in the application
  return userRef;

  // exists property tells us if it exists in database
  // console.log(snapshot);

  // gives us the location of the path whether it exists or not
  // we choose to read or write to this location
  // console.log(firestore.doc("users/23j2kl3jf2"));
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// gives access to google auth provider from authentication library
const provider = new firebase.auth.GoogleAuthProvider();
// trigger google pop up when we use google auth provider for authentication and sign in
provider.setCustomParameters({ promp: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

// export const addCollectionAndDocuments = async (
//   colllectionKey,
//   objectsToAdd
// ) => {
//   const collectionRef = firestore.collection(colllectionKey);
//   // console.log(collectionRef);

//   const batch = firestore.batch();
//   objectsToAdd.forEach(obj => {
//     // create a new document ref object with unique keys
//     const newDocRef = collectionRef.doc();
//     console.log(newDocRef);
//     batch.set(newDocRef, obj);
//   });
//   // fire batch request
//   return await batch.commit();
// };

export const convertCollectionsSnapshopToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  const res = transformedCollection.reduce(
    (accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    },
    /* Initial Value Of Accumulator*/ {}
  );
  // console.log("res", res);
  return res;
};

export default firebase;
