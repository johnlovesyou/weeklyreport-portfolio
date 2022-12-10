import { React, useMemo, useState } from 'react';
import { useSelector } from "react-redux"
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import './Dep.css'
import axios from 'axios'
import Basicdep1 from './Basicdep1.js';
import Basicgroup1_1 from './Basicgroup1_1.js';
import Basicgroup1_2 from './Basicgroup1_2.js';
import Date from './Date';
import Deptable from './Deptable';
function Dep1(props) {

  let state = useSelector((state) => { return state } )
  let navigate = useNavigate();

  let [dep1, setdep1] = useState(Basicdep1)
  let [group1_1, setgroup1_1] = useState(Basicgroup1_1)
  let [group1_2, setgroup1_2] = useState(Basicgroup1_2)

  useMemo(()=>{ return (
    axios.get('/dep1').then((결과)=>{
      let copy = [...결과.data]
      setgroup1_1(copy)
    })
  ) }, [])

  return (
    <div className='dep_main'>
      영유아부입니다.
      <Date></Date>
      <Deptable dep1={dep1[0]} group={group1_1}></Deptable>
      <Deptable dep1={dep1[1]} group={group1_2}></Deptable>
      
      
      <button onClick={()=>{
          console.log(group1_1)
          }}> 테스트 </button>   
       
      <button className='dep_inputbox' onClick={()=>{
          navigate('/nameinput')
          }}> 새친구 입력하기 </button>   


    </div>
  );
}

export default Dep1;