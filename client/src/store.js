import { configureStore, createSlice } from '@reduxjs/toolkit'

let 부서info = createSlice({
  name : '부서info',
  initialState : [
    {id: 1, dep: '상철T-1반'},
    {id: 2, dep: '상철T-2반'},
    {id: 3, dep: '상철T-3반'}, 
    {id: 4, dep: '현우T-1반'},
    {id: 5, dep: '현우T-2반'},
    {id: 6, dep: '현우T-3반'},
    {id: 7, dep: '주은T-1반'},
    {id: 8, dep: '주은T-2반'},
    {id: 9, dep: '상희T-1반'}, 
    {id: 10, dep: '상희T-2반'}
  ]
}) 

let 빈박스11개 = createSlice({
  name : '빈박스11개',
  initialState : [
    {
      1:'', 2:'', 3:'', 4:'', 5:'', 6:'', 7:'', 8:'', 9:'', 10:'', 11:''
    }
  ]
}) 

let 빈박스50개 = createSlice({
  name : '빈박스50개',
  initialState : [
    {
      1:'', 2:'', 3:'', 4:'', 5:'', 6:'', 7:'', 8:'', 9:'', 10:'', 11:'', 12:'', 13:'', 14:'', 15:'', 16:'',
      17:'', 18:'', 19:'', 20:'', 21:'', 22:'', 23:'', 24:'', 25:'', 26:'', 27:'', 28:'', 29:'', 30:'', 31:'', 32:'',
      33:'', 34:'', 35:'', 36:'', 37:'', 38:'', 39:'', 40:'', 41:'', 42:'', 43:'', 44:'', 45:'', 46:'', 47:'', 48:'',
      49:'', 50:''
    }
  ]
}) 




export default configureStore({
  reducer: {
    부서info : 부서info.reducer,
    빈박스11개 : 빈박스11개.reducer,
    빈박스50개 : 빈박스50개.reducer
  }
}) 