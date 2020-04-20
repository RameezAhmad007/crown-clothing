import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { selectIsCollectionFetching } from "../../redux/shop/shopSelectors";
import withSpinner from "../withSpinner/withSpinner";

import CollectionsOverview from "./CollectionsOverview";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});

// const CollectionsOverviewContainer = connect(mapStateToProps)(
//   withSpinner(CollectionsOverview)
// );
const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  withSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
