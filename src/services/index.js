import {
    configureStore,
    getDefaultMiddleware,
    combineReducers,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { reducer as userReducer } from "../modules/user/store";

import { monitoredObjects } from "../pages/MonitoredObject/MonitoredObject/redux/reducers";
import { category } from "../pages/MonitoredObject/Category/redux/reducers";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userReducer,
  monitoredObjects: monitoredObjects,
  category: category,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
