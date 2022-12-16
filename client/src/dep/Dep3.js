/*eslint-disable*/
import { React, useMemo, useState } from 'react';
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import './Dep.css'
import axios from 'axios'
import Basicgroup from './Basicgroup.js';
import Date from './Date';
import Deptable from './Deptable';

function Dep3(props) {

  let state = useSelector((state) => { return state } )
  let navigate = useNavigate();

  useMemo(()=>{ return (
    axios.get('/dep/3').then((결과)=>{ //부서별 수정할 것
      console.log(결과.data)
      let copy = [...결과.data]
      setgroup(copy)
    })
  ) }, [])

  let [group, setgroup] = useState(Basicgroup)
  let copy = group.map(e => e.gn)
  let dep1 = [...new Set(copy)]

  let group1_1 = group.filter(e => e.gn === "3-1") //부서별 수정할 것
  let group1_2 = group.filter(e => e.gn === "3-2") //부서별 수정할 것
  

  return (
    <div className='dep_main'>

      
      <div className='dep_main_deptable'>
        <Date></Date>
        <Deptable dep1={dep1[0]} group={group1_1}></Deptable>
        <Deptable dep1={dep1[1]} group={group1_2}></Deptable>
      </div>
      

      유치2부입니다.

      <div className='dep_main_button'>

        <button className='dep_dateinputbutton' onClick={()=>{
            navigate('/dateinput')
            }}> 출석 입력하기 </button>   

        <button className='dep_nameinputtest' onClick={()=>{
            
        }}> 테스트 </button> 

        <button className='dep_homebutton' onClick={()=>{
            navigate('/')
            }}> 홈버튼 </button> 

      </div>

    </div>
  );
}

export default Dep3;