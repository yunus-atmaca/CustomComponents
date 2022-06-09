import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const name = 'videoPlayer';

type State = {
  data: string | undefined;
  orientation: 'PORTRAIT' | 'LANDSCAPE';
  appPipMode: boolean;
  duration: number;
  currentTime: number;
  paused: boolean;
};

export const defaultValues: State = {
  data: undefined,
  orientation: 'PORTRAIT',
  appPipMode: false,
  currentTime: 0,
  duration: 0,
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
