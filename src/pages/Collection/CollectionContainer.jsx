import { connect } from "react-redux";
import { compose } from "redux";
import { selectIsCollectionLoaded } from "../../redux/shop/shopSelectors";
import { createStructuredSelector } from "reselect";
import withSpinner from "../../components/withSpinner/withSpinner";
import Collection from "./Collection";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectIsCollectionLoaded(state),
});

const CollectionContainer = compose(
  connect(mapStateToProps),
  withSpinner
)(Collection);

export default CollectionContainer;
