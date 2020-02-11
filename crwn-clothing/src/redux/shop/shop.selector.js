import { createSelector } from "reselect";

// const COLLECTION_ID_MAP = {
//   hats: 1,
//   sneakers: 2,
//   jackets: 3,
//   women: 4,
//   men: 5
// };

const selectShop = state => state.shop;

export const selectCollections = createSelector([selectShop], shop => {
  return shop ? shop.collections : null;
});

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections =>
    collections ? Object.keys(collections).map(key => collections[key]) : []
);

// export const selectCollection = collectionUrlParam =>
//   createSelector([selectCollections], collections =>
//     collections.find(collection => {
//       return collection.id === COLLECTION_ID_MAP[collectionUrlParam];
//     })
//   );

export const selectCollection = collectionUrlParam =>
  createSelector([selectCollections], collections =>
    collections ? collections[collectionUrlParam] : null
  );
