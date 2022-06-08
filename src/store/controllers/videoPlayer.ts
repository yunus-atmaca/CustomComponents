import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const name = 'videoPlayer';

type State = {
  data: string | undefined;
  orientation: 'PORTRAIT' | 'LANDSCAPE';
  appPipMode: boolean;
  duration: number | undefined;
  paused: boolean;
};

export const defaultValues: State = {
  data: undefined,
  orientation: 'PORTRAIT',
  appPipMode: false,
  duration: undefined,
  paused: false,
};

const initialState = defaultValues;

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
