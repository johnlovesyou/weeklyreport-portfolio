/*eslint-disable*/
import { React, useMemo, useState } from 'react';
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import './Dep.css'
import axios from 'axios'
import classnames from 'classnames';
import Basicgroup from '../depdatabasic/Basicgroup'
import Date from '../depcommon/Date'
import Deptable from '../depcommon/Deptable';

function Dep1(props) {

  let state = useSelector((state) => { return state } )
  let navigate = useNavigate();

  useMemo(()=>{ return (
    axios.get(`/dep/1`).then((결과)=>{ //부서별 수정할 것
      console.log(결과.data)
      let copy = [...결과.data]
      setperson(copy)
    })
  ) }, [])

  let [부서, set부서] = useState(Basicgroup)
  let 학년1_filter = 부서.filter(e => e.an === `1-1`)
  
  let [person, setperson] = useState(학년1_filter)
  let copy = person.map(e => e.dgn_ko)
  let group = [...new Set(copy)]

  let [show, setshow] = useState('1')

  return (
    <div className='dep_main'>

      <div className='dep_main_title'>
        <div className='dep_main_text'>영유아2부</div>

        <div className='dep_main_button1'>
          <button className='dep_agebutton' onClick={()=>{
              setshow('1')
              }}> 1~2세 </button>   
          <button className='dep_agebutton' onClick={()=>{
              setshow('2')
              }}> 3세 </button> 
          <button className='dep_agebutton' onClick={()=>{
              setshow('3')
              }}> 4세 </button> 
          <button className='dep_agebutton' onClick={()=>{
              console.log(filter)
              }}> 테스트 </button>     
        </div>

        <div className='dep_main_button2'>
          <button className='dep_dateinputbutton' onClick={()=>{
              navigate('/dateinput')
              }}> 출석 입력하기 </button>   
          {/* <button className='dep_nameinputtest' onClick={()=>{
            }}> 테스트 </button>  */}
          <button className='dep_homebutton' onClick={()=>{
              navigate('/')
              }}> 홈버튼 </button> 
        </div>

      </div>

      
      <div className={classnames('dep_main_deptable', {show: show ==='1'})}>
        <Date></Date>
        {
          group.map((a,i)=>{
            return (
              <Deptable group={group[i]} person={person.filter(e => e.dgn_ko === `${a}`)}></Deptable>
            )
          })  
        }
      </div>
      
      
      
      

    </div>
  );
}

export default Dep1;