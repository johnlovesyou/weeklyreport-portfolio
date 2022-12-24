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
  let 학년 = dmain.filter(e => e.dn === `dep1`) //부서별 수정할 것
  let 학년copy = 학년.map(e => e.dan_ko)
  let 학년ko = [...new Set(학년copy)]
  let 학년copy2 = 학년.map(e => e.dan)
  let 학년num = [...new Set(학년copy2)]

  // 각소그룹

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

  let 학년1소그룹ko = 각학년group('1-1')
  let 학년2소그룹ko = 각학년group('1-2')
  let 학년3소그룹ko = 각학년group('1-3')

  let 학년1소그룹 = 부서.filter(e => e.an === `1-1`)
  let 학년1소그룹copy = 학년1소그룹.map(e => e.dgn)
  let 학년1소그룹num = [...new Set(학년1소그룹copy)];

  let 학년2소그룹 = 부서.filter(e => e.an === `1-2`)
  let 학년2소그룹copy = 학년2소그룹.map(e => e.dgn)
  let 학년2소그룹num = [...new Set(학년2소그룹copy)];

  let 학년3소그룹 = 부서.filter(e => e.an === `1-3`)
  let 학년3소그룹copy = 학년3소그룹.map(e => e.dgn)
  let 학년3소그룹num = [...new Set(학년3소그룹copy)];

  // 각person

  let person1 = 부서.filter(e => e.dgn === `1-1-1`) //부서별 수정할 것
  let person2 = person1.map(e => e.n)
  let person3 = 부서.filter(e => e.dgn === `1-1-2`) //부서별 수정할 것
  let person4 = person3.map(e => e.n)
  let person5 = 부서.filter(e => e.dgn === `1-1-3`) //부서별 수정할 것
  let person6 = person5.map(e => e.n)
  
  

  // classNames
  let [show, setshow] = useState(`${학년ko[0]}`)
  let [show2, setshow2] = useState('')
  let [color, setcolor] = useState('1')

  return (
    <div className='dep_main'>

      <div className='dep_main_title'>
                                  {/* 부서별 수정할 것 */}
        <div className='dep_main_text'>영유아2부</div> 

        <div className='dep_main_button1'>
          <button className={classnames('dep_agebutton', {buttoncolor: color ==='1'})} 
              onClick={()=>{setshow(`${학년ko[0]}`); setcolor('1')
              }}> {학년ko[0]} </button>   
          <button className={classnames('dep_agebutton', {buttoncolor: color ==='2'})} 
              onClick={()=>{setshow(`${학년ko[1]}`); setcolor('2')
              }}> {학년ko[1]} </button> 
          <button className={classnames('dep_agebutton', {buttoncolor: color ==='3'})} 
              onClick={()=>{setshow(`${학년ko[2]}`); setcolor('3')
              }}> {학년ko[2]} </button> 

          <button className='dep_agebutton' 
          onClick={()=>{
              console.log(학년1소그룹num)
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

      
      <div className={classnames('dep_main_deptable', {show: show === `${학년ko[0]}`})}>
        <Date></Date>
        {
          각학년group(`${학년num[0]}`).map((a,i)=>{
            return (
              <Deptable 
              group={각학년group(`${학년num[0]}`)[i]} 
              person={각소그룹person(`${학년num[0]}`, `${a}`)}></Deptable>
            )
          })  
        }
      </div>
      
      <div className={classnames('dep_main_deptable', {show: show === `${학년ko[1]}`})}>
        <Date></Date>
        {
          각학년group(`${학년num[1]}`).map((a,i)=>{
            return (
              <Deptable 
              group={각학년group(`${학년num[1]}`)[i]} 
              person={각소그룹person(`${학년num[1]}`, `${a}`)}></Deptable>
            )
          })  
        }
      </div>

      <div className={classnames('dep_main_deptable', {show: show === `${학년ko[2]}`})}>
        <Date></Date>
        {
          각학년group(`${학년num[2]}`).map((a,i)=>{
            return (
              <Deptable 
              group={각학년group(`${학년num[2]}`)[i]} 
              person={각소그룹person(`${학년num[2]}`, `${a}`)}></Deptable>
            )
          })  
        }
      </div>
      

      <div className={classnames('dep_main_selectbox', {show: show === `${학년ko[0]}`})}>
        <div className='dateinput_select_box'>
          <div className='dateinput_content'>소그룹/반</div>
          <div className='dateinput_content'>
            <select className='dateinput_select_dep'
              onChange={(e)=>{ let copy = e.target.value; 
                              console.log(copy);
                              setshow2(copy);
                              }}>
              <option>선택</option>
              {각학년group('1-1').map((a,i)=>{return (<option>{각학년group('1-1')[i]}</option>)})}  
            </select>
          </div>
        </div>
        <div className={classnames('dep_main_personlist', {show2: show2 === `${학년1소그룹ko[0]}`})}>
          {person2.map((a,i)=>{return (<div>{person2[i]}</div>)})}</div>
        <div className={classnames('dep_main_personlist', {show2: show2 === `${학년1소그룹ko[1]}`})}>
          {person4.map((a,i)=>{return (<div>{person4[i]}</div>)})}</div>
        <div className={classnames('dep_main_personlist', {show2: show2 === `${학년1소그룹ko[2]}`})}>
          {person5.map((a,i)=>{return (<div>{person6[i]}</div>)})}</div>
      </div>

      <div className={classnames('dep_main_selectbox', {show: show === `${학년ko[1]}`})}>
        
      <div className='dateinput_select_box'>
          <div className='dateinput_content'>소그룹/반</div>
          <div className='dateinput_content'>
            <select className='dateinput_select_dep'
              onChange={(e)=>{ let copy = e.target.value; 
                              console.log(copy);
                              setshow2(copy);
                              }}>
              <option>선택</option>
              {각학년group('1-2').map((a,i)=>{return (<option>{각학년group('1-2')[i]}</option>)})}  
            </select>
          </div>
        </div>
        <div className={classnames('dep_main_personlist', {show2: show2 === `${학년2소그룹ko[0]}`})}>
          {person2.map((a,i)=>{return (<div>{person2[i]}</div>)})}</div>
        <div className={classnames('dep_main_personlist', {show2: show2 === `${학년2소그룹ko[1]}`})}>
          {person4.map((a,i)=>{return (<div>{person4[i]}</div>)})}</div>
        <div className={classnames('dep_main_personlist', {show2: show2 === `${학년2소그룹ko[2]}`})}>
          {person5.map((a,i)=>{return (<div>{person6[i]}</div>)})}</div>

      </div>
      <div className={classnames('dep_main_selectbox', {show: show === `${학년ko[2]}`})}>
      
        <div className='dateinput_select_box'>
          <div className='dateinput_content'>소그룹/반</div>
          <div className='dateinput_content'>
            <select className='dateinput_select_dep'
              onChange={(e)=>{ let copy = e.target.value; 
                              console.log(copy);
                              setshow2(copy);
                              }}>
              <option>선택</option>
              {각학년group('1-3').map((a,i)=>{return (<option>{각학년group('1-3')[i]}</option>)})}  
            </select>
          </div>
        </div>
        <div className={classnames('dep_main_personlist', {show2: show2 === `${학년3소그룹ko[0]}`})}>
          {person2.map((a,i)=>{return (<div>{person2[i]}</div>)})}</div>
        <div className={classnames('dep_main_personlist', {show2: show2 === `${학년3소그룹ko[1]}`})}>
          {person4.map((a,i)=>{return (<div>{person4[i]}</div>)})}</div>
        <div className={classnames('dep_main_personlist', {show2: show2 === `${학년3소그룹ko[2]}`})}>
          {person5.map((a,i)=>{return (<div>{person6[i]}</div>)})}</div>
      </div> 
      
      
      
      

    </div>
  );
}

export default Dep1;