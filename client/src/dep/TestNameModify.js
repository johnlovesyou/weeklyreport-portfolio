/*eslint-disable*/
import { React, useMemo, useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { useSelector } from "react-redux"
import axios from 'axios';
import './NameModify.css'
import Basicdep from './Basicdep';

function TestNameModify(props) {

  let state = useSelector((state) => { return state } )
  let navigate = useNavigate();

  // 테스트박스
  let [test1, settest1] = useState('')
  let [test2, settest2] = useState('')
  let [test3, settest3] = useState(Basicdep)
  

  return (
    <div className='nameinput'>

           {/* test 박스 */}
      <div className='testbox'>

        {
          test3.map((a,i)=>{
            return (
              <div className='testdivbox2'>{test3[i].Tables_in_report}</div>
            )
          })
        }

        <button className='testbutton2' 
          onClick={()=>{
            axios.get('/testnamemodify').then((결과)=>{
              console.log(결과.data)
              let copy = [...결과.data]
              settest3(copy)
            })
          }}>데이터 불러오기</button>

        <div className='testinpunt2'>
          <input type="text" onChange={(e)=>{
            settest1(e.target.value)
          }}></input>을</div>
        <div className='testinpunt2'>
        <input type="text" onChange={(e)=>{
          settest2(e.target.value)
        }}></input>으로</div>
        
        <button className='testbutton2' 
          onClick={()=>{
          axios.post('/testnamemodify', {
            testname1 : test1,
            testname2 : test2
          }).then((결과)=>{})
          .catch(()=>{
            console.log('실패함')
          })
        }}>테이블 이름 수정하기</button>
        <div>

        </div>
      </div>

    </div>
  );
}

export default TestNameModify;