import { UPDATE_COLLECTIONS } from "./shot.types";

export const updateCollections = collectionsMap => ({
  type: UPDATE_COLLECTIONS,
  payload: collectionsMap
});
