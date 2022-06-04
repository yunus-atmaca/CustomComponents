import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const name = 'coachMark'

type State = {

}

const initialState: State = {

}

const {
  actions: { setCoachMark },
  reducer
} = createSlice({
  name,
  initialState,
  reducers: {
    setCoachMark: (state, action: PayloadAction<Partial<State>>) => {
      return { ...state, ...action }
    }
  }
})

export {
  reducer,
  setCoachMark
}