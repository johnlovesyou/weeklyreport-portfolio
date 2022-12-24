/*eslint-disable*/
import { React, useMemo, useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { useSelector } from "react-redux"
import axios from 'axios';
import './DateInput.css'
import classnames from 'classnames';
import Basicdepmain from '../depdatabasic/Basicdepmain.js';

function DateInput(props) {

  let state = useSelector((state) => { return state } )
  let navigate = useNavigate();
  
  let [group, setgroup] = useState(props.group)
  let [소그룹선택, set소그룹선택] = useState('')
  
  
    
  // const 출결체크 = (value) => {
  //   if (value == true) {
  //     return 1
  //   } else if (value == false)
  //     return 0
  // };

  
  return (
    <div className='dateinput'>

      <button className='dateinput_test_button'
        onClick={()=>{
         console.log(부서.filter(e => e.dag === `1첫번째반`))
        }}
      >테스트</button>

      <div className='dateinput_select'>
  
        <div className='dateinput_select_box'>
          <div className='dateinput_content'>소그룹/반</div>
          <div className='dateinput_content'>
            <select className='dateinput_select_dep'
              onChange={(e)=>{ let copy = e.target.value; 
                              set소그룹선택(copy)
                              }}>
              <option>선택</option>
              {group.map((a,i)=>{return (<option>{group[i]}</option>)})}  
            </select>
          </div>
        </div>

        {/* <div className='dateinput_personlist_box'>
         {
           personlist.map((a,i)=>{
            return (
             <div>{personlist[i]}</div>
            )})
         } 
        </div> */}



      </div>
      

      <button className='dateinput_input_button' 
        onClick={()=>{
          navigate('/')
      }}>입력하기</button> 

      <button className='dateinput_home_button'
        onClick={()=>{
          navigate('/')
        }}
      >돌아가기</button> 

      

    </div>
  );
}

export default DateInput;
