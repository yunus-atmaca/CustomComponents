import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {THeader} from '@src/types/header';

const name = 'header';

type State = {
  props: THeader;
};

const initialState: State = {
  props: undefined,
};

const {
  actions: {setHeader},
  reducer,
} = createSlice({
  name,
  initialState,
  reducers: {
    setHeader: (state, action: PayloadAction<Partial<THeader>>) => {
      const newState = Object.assign({}, state);
      newState.props = action.payload;
      return newState;
    },
  },
});

export {reducer, setHeader};
