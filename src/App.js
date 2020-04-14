import React, { Component } from "react";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import { Switch, Route, Redirect } from "react-router-dom";
import Shop from "./pages/Shop/Shop";
import Header from "./components/Header/Header";
import SignInAndSignUp from "./pages/SignInAndSignUp/SignInAndSignUp";
import { auth } from "../src/firebase/firebaseUtils";
import {
  createUserProfileDocument,
  // addCollectionAndDocuments,
} from "../src/firebase/firestoreDB";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setCurrentUser } from "./redux/user/userActions";
import { selectCurrentUser } from "./redux/user/userSelectors";
import CheckOut from "./pages/CheckOut/CheckOut";
// import { selectCollectionsForPreview } from "./redux/shop/shopSelectors";
class App extends Component {
  unsubscribeFromAuth = null;
  componentDidMount() {
    const { setCurrentUser /*collectionsArray*/ } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        // console.log("userAuth..: ", userAuth);
        // console.log("userRef..: ", userRef);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({ id: snapShot.id, ...snapShot.data() });
        });
       } else {
        // console.log("userAuthElse..: ", userAuth);
        setCurrentUser(userAuth);
        // addCollectionAndDocuments(
        //   "collections",
        //   collectionsArray.map(({ title, items }) => ({ title, items }))
        // );
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={Shop} />
          <Route path="/checkout" component={CheckOut} />
          <Route
            exact
            path="/signin"
            render={() =>
              currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionsForPreview,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
