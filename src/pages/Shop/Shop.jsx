import React, { Component } from "react";
import { Route } from "react-router-dom";
import CollectionsOverview from "../../components/CollectionsOverview/CollectionsOverview";
import Collection from "../Collection/Collection";
import { firestore } from "../../firebase/firebaseUtils";
import { convertCollectionsSnapshotToMap } from "../../firebase/firestoreDB";
import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shopActions";
class Shop extends Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");

    collectionRef.onSnapshot(async (snapshot) => {
      // console.log("snapshot....", snapshot);
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      // console.log(collectionsMap);
      updateCollections(collectionsMap);
    });
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} component={Collection} />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) => {
    dispatch(updateCollections(collectionsMap));
  },
});
export default connect(null, mapDispatchToProps)(Shop);
