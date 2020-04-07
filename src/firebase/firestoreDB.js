import { firestore } from "./firebaseUtils";

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  // console.log("FireStore Document...", userRef);
  // console.log("snapShot Document...", snapShot);
  // console.log("snapShot Document Data...", snapShot.data());

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const creatAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        creatAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

// firestore
//   .collection("users")
//   .doc("XOSpplktJ7Idnbyov6ci")
//   .collection("cartItem")
//   .doc("RESEohqOHOG0fN6WKly9");

// firestore.doc("/users/XOSpplktJ7Idnbyov6ci/cartItem/RESEohqOHOG0fN6WKly9");
// firestore.collection("/users/XOSpplktJ7Idnbyov6ci/cartItem");
