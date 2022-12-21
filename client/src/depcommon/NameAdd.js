/*eslint-disable*/
import { React, useMemo, useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { useSelector } from "react-redux"
import axios from 'axios';
import classnames from 'classnames';
import './NameAdd.css';
import Basicdepmain from '../depdatabasic/Basicdepmain.js';
import Basic_d1_g1 from '../depdatabasic/Basic_d1_g1';

function NameAdd(props) {

  let state = useSelector((state) => { return state } )
  let navigate = useNavigate();
  let [show, setshow] = useState('')

  useMemo(()=>{ return (
    axios.get('/depmain').then((결과)=>{console.log(결과.data); let copy = [...결과.data]; set부서(copy)}),
    axios.get('/depmain/1').then((결과)=>{console.log(결과.data); let copy = [...결과.data]; set영유아2부_1학년원본(copy)})
  ) }, [])
  
  // 부서이름선택
  let [부서, set부서] = useState(Basicdepmain);
  let 부서_copy = 부서.map(e => e.dn_ko);
  let 부서copy = [...new Set(부서_copy)];
  
  // 각부서 나이&학년 선택
  let 영유아2부_학년 = 부서.filter(e => e.dn_main === 'dep1')
  let 영유아2부_학년copy = 영유아2부_학년.map(e => e.dan_ko);
  let 영유아2부_학년ko = [...new Set(영유아2부_학년copy)];

  let 유치2부_학년 = 부서.filter(e => e.dn_main === 'dep3')
  let 유치2부_학년copy = 유치2부_학년.map(e => e.dan_ko);
  let 유치2부_학년ko = [...new Set(유치2부_학년copy)];

  // 영유아2부 소그룹 선택
  let [영유아2부_1학년원본, set영유아2부_1학년원본] = useState(Basic_d1_g1);
  let 영유아2부_1학년 = 영유아2부_1학년원본.filter(e => e.dan === '1-1')
  let 영유아2부_1학년copy = 영유아2부_1학년.map(e => e.dgn_ko);
  let 영유아2부_1학년ko = [...new Set(영유아2부_1학년copy)];


  // 명단추가 박스
  let [부서선택, set부서선택] = useState('')
  let [소그룹선택, set소그룹선택] = useState('')  
  let [추가소그룹, set추가소그룹] = useState('');
  let [추가이름, set추가이름] = useState('');

  var filter = 부서.filter(e => e.dan_ko === `${추가소그룹}`);
  var 소그룹number변경 = () => {const number = (filter[0].dgn).split(''); return number[2]}
  
  var 반이름숫자로변경 = (dep) => {
    if (dep == '영유아2부') {return '1'} 
    else if (dep == '영유아3부') {return '2'}
    else if (dep == '유치2부') {return '3'}
  };

  return (
    <div className='nameinput'>

      <div className='nameinput_main_wrapper'>

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

          {/* 각부서 나이&학년 선택 박스 */}

            <div className='nameinput_select_box3'>
              <div className='nameinput_content'>학년/나이</div>
              <div className='nameinput_content'>
                <div className='nameinput_notice'>
              
                  {/* 영유아2부_나이&학년 */}
                  <div className={classnames('nameinput_notice_wrapper', {show: show ==='1'})}>
                    <select className='nameinput_select_age' 
                      onChange={(e)=>{let copy = e.target.value; set추가소그룹(copy)}}>
                      <option>{부서선택}</option>
                      {영유아2부_학년ko.map((a,i)=>{return (<option>{영유아2부_학년ko[i]}</option>)})}  
                    </select>
                  </div>
          
                  {/* 유치2부_나이&학년 */}
                  <div className={classnames('nameinput_notice_wrapper', {show: show ==='3'})}>
                    <select className='nameinput_select_age'
                      onChange={(e)=>{let copy = e.target.value; set추가소그룹(copy)}}>
                      <option>{부서선택}</option>
                      {유치2부_학년ko.map((a,i)=>{return (<option>{유치2부_학년ko[i]}</option>)})}  
                    </select>
                  </div>
      
                </div> 

              </div>
            </div>
        </div>

        

        {/* 명단 추가 박스 */}
        <div className='nameinput_input'>
          <input type="text" className="input_none" onChange={(e)=>{setnewid(e.target.value)}}/>

          <div className='nameinput_inputbox'>
            <div className='text'>부서</div> <input type="text" className="input" value={부서선택} />
          </div>
          <div className='nameinput_inputbox'>
            <div className='text'>소그룹/반</div> <input type="text" className="input" value={추가소그룹} />
          </div>
          <div className='nameinput_inputbox'>
            <div className='text'>이름</div> <input type="text" className="input" onChange={(e)=>{set추가이름(e.target.value)}}/>
          </div>   
        </div>

        <button className='nameinput_button' 
          onClick={()=>{
            axios.post('/nameadd', {
            d_number : 반이름숫자로변경(부서선택), g_number : 소그룹number변경(), 
            dg_number : filter[0].dgn, new_g : 추가소그룹, new_n : 추가이름
          }).then((결과)=>{
            alert(결과.data);
            if (결과.data === "입력 성공!") {
              navigate('/')
            } 
          })
          .catch(()=>{console.log('실패함')})
        }}>입력하기</button>

        <button className='test_button' 
          onClick={()=>{
            console.log(영유아2부_1학년ko)
          }}
        >테스트</button>

      
        <button className='home_button' onClick={()=>{ navigate('/') }} >홈 돌아가기</button> 
        <button className='groupadd_button' onClick={()=>{ navigate('/groupadd') }} >소그룹추가</button>
      
      </div>    
    </div>
  );
}

export default NameAdd;