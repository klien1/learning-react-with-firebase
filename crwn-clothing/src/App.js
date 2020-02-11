import React, { Component } from "react";
import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

// want to store the state of the user
import { auth, createUserProfileDocument } from "./firebase/firebase.utls";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.action";
import { selectCurrentUser } from "./redux/user/user.selector";
import { createStructuredSelector } from "reselect";

// import { addCollectionAndDocuments } from "./firebase/firebase.utls";
// import { selectCollectionsForPreview } from "./redux/shop/shop.selector";

class App extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     currentUser: null
  //   };
  // }

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    // normally to get data, we fetch in here
    // firebase, we just want to know when firebase knows we're authenticated
    // paramenter is the auth state of the user
    // this connection is always an open subscription
    // need to unsubscribe when unmount to prevent memory leaks
    // returns a function that unsubscribes when we call it
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        // console.log(userRef);

        // listen/subscribe to user ref for any changes
        // snapshot is the first state of the data
        userRef.onSnapshot(snapshot => {
          // need to call .data() to get json object with properties of the obj
          // however no ID is in .data();
          // ID is in snapshot
          // console.log(snapshot.data());

          // this.setState({
          //   currentUser: {
          //     id: snapshot.id,
          //     ...snapshot.data()
          //   }
          // });

          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      } else {
        // this.setState({ currentUser: userAuth });
        setCurrentUser(userAuth);
      }
    });

    // const { collectionsArray } = this.props;
    // addCollectionAndDocuments(
    //   "collections",
    //   collectionsArray.map(({ title, items }) => ({
    //     title,
    //     items
    //   }))
    // );
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        {
          // <Header currentUser={this.state.currentUser}></Header>
        }
        <Header />
        {/** switch only renders the first matching route */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
            }
          />
        </Switch>
      </div>
    );
  }
}

// const mapStateToProps = ({ user }) => {
//   return {
//     currentUser: user.currentUser
//   };
// };

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
  // collectionsArray: selectCollectionsForPreview
});

// dispatch - a way for redux to know that the object
//      that is passed to me is going to be an action object

// dispatch an action
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
