import { configureStore } from '@reduxjs/toolkit'
import modelSlice  from './ModelInteraction/ModelSlice'
// ... 
 

export const store:any = configureStore({
  reducer: {
    models:modelSlice,
   
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
 
export type AppDispatch = typeof store.dispatch