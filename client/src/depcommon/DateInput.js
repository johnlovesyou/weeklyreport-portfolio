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
  let [show, setshow] = useState('')

  useMemo(()=>{ return (
    axios.get('/dateinput').then((결과)=>{console.log(결과.data); let copy = [...결과.data]; set부서(copy)})
  ) }, [])

  let [id, setid] = useState('')
  let [day, setday] = useState('')
  let [dep, setdep] = useState('')
  let [name, setname] = useState('')
  let [depgroup, setdepgroup] = useState('')

  // 부서이름선택
  let [부서, set부서] = useState(Basicdepmain);
  let 부서_copy = 부서.map(e => e.dn_ko);
  let 부서copy = [...new Set(부서_copy)];
  
  // 각부서 소그룹이름 선택
  let 영유아2부 = 부서.filter(e => e.dn_main === 'dep1')
  let 영유아2부copy = 영유아2부.map(e => e.dgn_ko);
  let 영유아2부ko = [...new Set(영유아2부copy)];

  let 유치2부 = 부서.filter(e => e.dn_main === 'dep3')
  let 유치2부copy = 유치2부.map(e => e.dgn_ko);
  let 유치2부ko = [...new Set(유치2부copy)];

  // 명단추가 박스
  let [부서선택, set부서선택] = useState('')
  let [소그룹선택, set소그룹선택] = useState('')  
  let [추가소그룹, set추가소그룹] = useState('');
  let [추가이름, set추가이름] = useState('');

  var filter = 부서.filter(e => e.dgn_ko === `${추가소그룹}`);
  var 소그룹number변경 = () => {const number = (filter[0].dgn).split(''); return number[2]}

     
  var 반이름숫자로변경 = (dep) => {
    if (dep == '영유아2부') {return '1'} 
    else if (dep == '영유아3부') {return '2'}
    else if (dep == '유치2부') {return '3'}
  };

  const 출결체크 = (value) => {
    if (value == true) {
      return 1
    } else if (value == false)
      return 0
  };


  return (
    <div className='dateinput'>


      {/* 상단 선택 박스 */}
      <div className='nameinput_select_wrapper'>

        {/* 각부서 선택 */}
          <div className='nameinput_select_box1'>
            <div className='nameinput_content'></div>
            <div className='nameinput_content choice'>선택</div>
          </div>

          <div className='nameinput_select_box2'>
            <div className='nameinput_content'>부서선택</div>
            <div className='nameinput_content'>
              <select className='nameinput_select_dep'
                onChange={(e)=>{ let copy = e.target.value; set부서선택(copy);
                                let showdata = 반이름숫자로변경(copy); setshow(showdata) }}>
                <option>부서</option>
                {부서copy.map((a,i)=>{return (<option>{부서copy[i]}</option>)})}  
              </select>
            </div>
          </div>

        {/* 각부서 소그룹이름 선택 박스 */}

          <div className='nameinput_select_box3'>
            <div className='nameinput_content'>소그룹/반</div>
            <div className='nameinput_content'>
              <div className='nameinput_notice'>
            
                {/* 영유아2부 */}
                <div className={classnames('nameinput_notice_wrapper', {show: show ==='1'})}>
                  <select className='nameinput_select_group' 
                    onChange={(e)=>{let copy = e.target.value; set추가소그룹(copy)}}>
                    <option>{부서선택}</option>
                    {영유아2부ko.map((a,i)=>{return (<option>{영유아2부ko[i]}</option>)})}  
                  </select>
                </div>

                {/* 유치2부 */}
                <div className={classnames('nameinput_notice_wrapper', {show: show ==='3'})}>
                  <select className='nameinput_select_group'
                    onChange={(e)=>{let copy = e.target.value; set추가소그룹(copy)}}>
                    <option>{부서선택}</option>
                    {유치2부ko.map((a,i)=>{return (<option>{유치2부ko[i]}</option>)})}  
                  </select>
                </div>

              </div> 

            </div>
          </div>
        </div>  
      
      

      <button className='dateinput_button' 
        onClick={()=>{
        axios.post('/dateinput', {
          id : id,
          day : day,
          dep : dep,
          depgroup : depgroup,
          name : name,
        }).then((결과)=>{})
        .catch(()=>{})
        navigate('/')
      }}>입력하기</button> 

      <button className='home_button'
        onClick={()=>{
          navigate('/')
        }}
      >돌아가기</button> 

    </div>
  );
}

export default DateInput;