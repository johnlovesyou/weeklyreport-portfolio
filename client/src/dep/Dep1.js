/*eslint-disable*/
import { React, useMemo, useState } from 'react';
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import './Dep.css'
import axios from 'axios'
import Basicgroup from './Basicgroup.js';
import Date from './Date';
import Deptable from './Deptable';

function Dep1(props) {

  let state = useSelector((state) => { return state } )
  let navigate = useNavigate();

  useMemo(()=>{ return (
    axios.get(`/dep/1`).then((결과)=>{ //부서별 수정할 것
      console.log(결과.data)
      let copy = [...결과.data]
      setgroup(copy)
    })
  ) }, [])

  let [group, setgroup] = useState(Basicgroup)
  let copy = group.map(e => e.gn)
  let dep = [...new Set(copy)]

  return (
    <div className='dep_main'>

      
      <div className='dep_main_deptable'>
        <Date></Date>
        {
          dep.map((a,i)=>{
            return (
              <Deptable dep={dep[i]} group={group.filter(e => e.gn === `${a}`)}></Deptable>
            )
          })  
        }
      </div>
      

      영유아2부입니다.

      <div className='dep_main_button'>

        <button className='dep_dateinputbutton' onClick={()=>{
            navigate('/dateinput')
            }}> 출석 입력하기 </button>   

      
        <button className='dep_nameinputtest' onClick={()=>{
            console.log(test())
        }}> 테스트 </button> 

    
        <button className='dep_homebutton' onClick={()=>{
            navigate('/')
            }}> 홈버튼 </button> 

      </div>

    </div>
  );
}

export default Dep1;