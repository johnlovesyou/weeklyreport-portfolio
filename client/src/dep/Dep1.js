/*eslint-disable*/
import { React, useMemo, useState } from 'react';
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import './Dep.css'
import axios from 'axios'
import classnames from 'classnames';
import Basicdepmain from '../depdatabasic/Basicdepmain'
import Basicgroup from '../depdatabasic/Basicgroup'
import Date from '../depcommon/Date'
import Deptable from '../depcommon/Deptable';
import DateInput from '../depcommon/DateInput';

function Dep1(props) {

  let state = useSelector((state) => { return state } )
  let navigate = useNavigate();

  useMemo(()=>{ return (
    axios.get(`/depmain`).then((결과)=>{ //부서별 수정할 것
      console.log(결과.data)
      let copy = [...결과.data]
      set_dmain(copy)
    }),
    axios.get(`/dep/1`).then((결과)=>{ //부서별 수정할 것
      console.log(결과.data)
      let copy = [...결과.data]
      set부서(copy)
    })
  ) }, [])

  let [dmain, set_dmain] = useState(Basicdepmain)
  let [부서, set부서] = useState(Basicgroup)

  // 각학년이름
  let 학년 = dmain.filter(e => e.dn === `dep1`)
  let 학년copy = 학년.map(e => e.dan_ko)
  let 학년result = [...new Set(학년copy)]


  var 각학년group = (da) => {
    let 학년group = 부서.filter(e => e.an === `${da}`)
    let groupcopy = 학년group.map(e => e.dgn_ko)
    let result = [...new Set(groupcopy)]
    return result
  }

  var 각소그룹person = (da, da_ko) => {
    let 소그룹person = 부서.filter(e => e.an === `${da}`)
    let result = 소그룹person.filter(e => e.dgn_ko === `${da_ko}`)
    return result
  }
  let test = 부서.filter(e => e.an === `1-1`)
  let testresult =test.filter(e => e.dgn_ko === `1첫번째반`)

  // classNames
  let [show, setshow] = useState(`${학년result[0]}`)
  let [color, setcolor] = useState('1')

  return (
    <div className='dep_main'>

      <div className='dep_main_title'>
        <div className='dep_main_text'>영유아2부</div>

        <div className='dep_main_button1'>
          <button className={classnames('dep_agebutton', {buttoncolor: color ==='1'})} 
              onClick={()=>{setshow(`${학년result[0]}`); setcolor('1')
              }}> {학년result[0]} </button>   
          <button className={classnames('dep_agebutton', {buttoncolor: color ==='2'})} 
              onClick={()=>{setshow(`${학년result[1]}`); setcolor('2')
              }}> {학년result[1]} </button> 
          <button className={classnames('dep_agebutton', {buttoncolor: color ==='3'})} 
              onClick={()=>{setshow(`${학년result[2]}`); setcolor('3')
              }}> {학년result[2]} </button> 

          <button className='dep_agebutton' 
          onClick={()=>{
              console.log(testresult)
              }}> 테스트 </button>     
        </div>

        <div className='dep_main_button2'>
          <button className='dep_dateinputbutton' onClick={()=>{
              navigate('/dateinput')
              }}> 출석 입력하기 </button>   
          <button className='dep_homebutton' onClick={()=>{
              navigate('/')
              }}> 홈버튼 </button> 
        </div>

      </div>

      
      <div className={classnames('dep_main_deptable', {show: show === `${학년result[0]}`})}>
        <Date></Date>
        {
          각학년group(`1-1`).map((a,i)=>{
            return (
              <Deptable group={각학년group(`1-1`)[i]} person={각소그룹person(`1-1`, `${a}`)}></Deptable>
            )
          })  
        }
      </div>
      
      <div className={classnames('dep_main_deptable', {show: show === `${학년result[1]}`})}>
        <Date></Date>
        {
          각학년group(`1-2`).map((a,i)=>{
            return (
              <Deptable group={각학년group(`1-2`)[i]} person={각소그룹person(`1-2`, `${a}`)}></Deptable>
            )
          })  
        }
      </div>

      <div className={classnames('dep_main_deptable', {show: show === `${학년result[2]}`})}>
        <Date></Date>
        {
          각학년group(`1-3`).map((a,i)=>{
            return (
              <Deptable group={각학년group(`1-3`)[i]} person={각소그룹person(`1-3`, `${a}`)}></Deptable>
            )
          })  
        }
      </div>
      


      <DateInput group={각학년group(`1-1`)} ></DateInput>
      <DateInput group={각학년group(`1-2`)} ></DateInput>
      <DateInput group={각학년group(`1-3`)} ></DateInput>
      

    </div>
  );
}

export default Dep1;