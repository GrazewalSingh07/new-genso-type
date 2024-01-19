import { createSlice } from '@reduxjs/toolkit';
 

interface State {
  models: { name: string; file: any }[];
}

const initialState: State = {
  models: [],
};

const modelSlice = createSlice({
  name: 'models',
  initialState,
  reducers: {
    setModel: (state, action) => {
      // Spread the existing models and add the new models from the action payload
      state.models = [...state.models, ...action.payload];
    },
  },
});

export const { setModel } = modelSlice.actions;

// Export the reducer
export default modelSlice.reducer;
