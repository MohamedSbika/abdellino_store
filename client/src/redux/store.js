import userReducer from "../redux/user/userSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import searchSlice from "./search/searchSlice";
import saveProduitSlice from "./saveProduit/saveProduitSlice";

//===== Redux Persist's Code ======//
const rootReducer = combineReducers({
  user: userReducer,
  search: searchSlice,
  savedProduit:saveProduitSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "savedProduit","savedMaterial"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

//===== Redux Store ======//
export const store = configureStore({
  reducer: persistedReducer,

  //==== Middlware for serializable check =====//
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
