import { configureStore } from '@reduxjs/toolkit'
import OffcanvasReducer from './Slice'

export default configureStore({
  reducer: {  offcanvas: OffcanvasReducer,},
})