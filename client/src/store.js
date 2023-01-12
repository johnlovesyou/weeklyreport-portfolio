import { configureStore, createSlice } from '@reduxjs/toolkit'

let 부서info = createSlice({
  name : '부서info',
  initialState : [
    {id: 1, dep: '영유아2부'},
    {id: 2, dep: '영유아3부'},
    {id: 3, dep: '유치2부'}, 
    {id: 4, dep: '유치3부'},
    {id: 5, dep: '유년2부'},
    {id: 6, dep: '유년3부'},
    {id: 7, dep: '초등2부'},
    {id: 8, dep: '초등3부'},
    {id: 9, dep: '중등부'}, 
    {id: 10, dep: '고등부'}
  ]
})  

export default configureStore({
  reducer: {
    부서info : 부서info.reducer
  }
}) 