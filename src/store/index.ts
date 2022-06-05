import {configureStore} from '@reduxjs/toolkit';

import {
  CoachMarkController,
  HeaderController,
  VideoPlayerController,
} from './controllers';

const store = configureStore({
  reducer: {
    coachMarkController: CoachMarkController.reducer,
    headerController: HeaderController.reducer,
    videoPlayerController: VideoPlayerController.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export {store};

export type {RootState, AppDispatch};
