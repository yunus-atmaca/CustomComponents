import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const name = 'videoPlayer';

type State = {
  data: string | undefined;
};

const initialState: State = {
  data: undefined,
};

const {
  actions: {setVideoPlayer},
  reducer,
} = createSlice({
  name,
  initialState,
  reducers: {
    setVideoPlayer: (state, action: PayloadAction<Partial<State>>) => {
      return {...state, ...action.payload};
    },
  },
});

export {reducer, setVideoPlayer};
