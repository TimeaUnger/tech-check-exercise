import { configureStore } from "@reduxjs/toolkit";
// Beimportáljuk a counter slice reducerét
import counterReducer from "../features/counter/counterSlice";

// Létrehozza és konfigurálja a Redux Store-t
export const store = configureStore({
  // Itt regisztráljuk a Store-ban a reducerünket
  reducer: {
    counter: counterReducer,
  },
});

// Ez a teljes Redux state TypeScript típusa
export type RootState = ReturnType<typeof store.getState>;
// Ez a Redux dispatch függvényének típusa
export type AppDispatch = typeof store.dispatch;
