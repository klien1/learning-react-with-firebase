import React from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Route } from "react-router-dom";
import CollectionPage from "../collection/collection.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

// import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";
// import SHOP_DATA from "../../constants/shop.data";

// import { selectCollections } from "../../redux/shop/shop.selector";
// import CollectionPreview from "../../components/preview-collection/preview-collection.component";

// class ShopPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { collections: SHOP_DATA };
//   }
//   render() {
// const { collections } = this.state;
// return (
//   <div className="shop-page">
//     {collections.map(({ id, ...otherCollectionProps }) => {
//       return <CollectionPreview key={id} {...otherCollectionProps} />;
//     })}
//   </div>
// );
//   }
// }

import {
  firestore,
  convertCollectionsSnapshopToMap
} from "../../firebase/firebase.utls";

import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions";

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  state = {
    isLoading: true
  };

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");

    // snapshot of collections object whenever it changes
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshopToMap(snapshot);
      // console.log("collect map", collectionsMap);
      updateCollections(collectionsMap);
      this.setState({
        isLoading: false
      });
    });
  }

  componentWillUnmount() {}

  // console.log(match.path); // prints '/shop'
  render() {
    const { match } = this.props;
    const { isLoading } = this.state;
    return (
      <div className="shop-page">
        {/**
         <Route exact path={`${match.path}`} component={CollectionsOverview} />
       */}
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionOverviewWithSpinner isLoading={isLoading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner isLoading={isLoading} {...props} />
          )}
        />
        {
          // <Route
          // path={`${match.path}/:collectionId`}
          // component={CollectionPage}
          // />
        }
      </div>
    );
  }
}

// const mapStateToProps = createStructuredSelector({
//   collections: selectCollections
// });

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap))
});

// export default connect(mapStateToProps)(ShopPage);
export default connect(null, mapDispatchToProps)(ShopPage);
