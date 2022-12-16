/*eslint-disable*/
import { React, useMemo, useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { useSelector } from "react-redux"
import axios from 'axios';
import classnames from 'classnames';
import './NameModify.css'
import Basicdepmain from './Basicdepmain.js';
import Basicgroup from './Basicgroup.js';
import Basicgroup2 from './Basicgroup2.js';
import Basicdep from './Basicdep';

function NameModify(props) {

  let state = useSelector((state) => { return state } )
  let navigate = useNavigate();
  let [show, setshow] = useState('')

  useMemo(()=>{ return (
    axios.get('/namemodify').then((결과)=>{console.log(결과.data); let copy = [...결과.data]; set부서(copy)}),
    axios.get('/dep/1').then((결과)=>{console.log(결과.data); let copy = [...결과.data]; set영유아2부(copy)}),
    axios.get('/dep/3').then((결과)=>{console.log(결과.data); let copy = [...결과.data]; set유치2부(copy)})
  ) }, [])

  
  // 부서이름선택
  let [부서, set부서] = useState(Basicdepmain);
  let 부서_copy = 부서.map(e => e.dn_ko);
  let 부서copy = [...new Set(부서_copy)];
    
  // 각부서 소그룹이름 선택
  let [영유아2부, set영유아2부] = useState(Basicgroup);  
  let 영유아2부copy = 영유아2부.map(e => e.dgn_ko);
  let 영유아2부ko = [...new Set(영유아2부copy)];

  let [유치2부, set유치2부] = useState(Basicgroup2);
  let 유치2부copy = 유치2부.map(e => e.dgn_ko);
  let 유치2부ko = [...new Set(유치2부copy)];


  // 명단추가 박스
  let [부서선택, set부서선택] = useState('')
  let [소그룹선택, set소그룹선택] = useState('')  
  let [추가소그룹, set추가소그룹] = useState('');
  let [추가이름, set추가이름] = useState('');

  var filter = 부서.filter(e => e.dgn_ko === `${추가소그룹}`);
  var 소그룹number변경 = () => {
    const number = (filter[0].dgn).split('');
    return number[2]
  }

  

  
  var 반이름숫자로변경 = (dep) => {
    if (dep == '영유아2부') {return '1'} 
    else if (dep == '영유아3부') {return '2'}
    else if (dep == '유치2부') {return '3'}
  };

  
  return (
    <div className='nameinput'>

      {/* 상단 선택 박스 */}
      <div className='nameinput_wrapper'>

        {/* 각부서 선택 */}
          <div className='nameinput_box1'>
            <div className='nameinput_content'></div>
            <div className='nameinput_content choice'>선택</div>
          </div>

          <div className='nameinput_box2'>
            <div className='nameinput_content'>부서선택</div>
            <div className='nameinput_content'>
              <select className='nameinput_select_dep'
                onChange={(e)=>{
                let copy = e.target.value
                set부서선택(copy)
                let showdata = 반이름숫자로변경(copy)
                setshow(showdata) 
              }}>
                <option>부서</option>
                {
                  부서copy.map((a,i)=>{
                    return (
                    <option>{부서copy[i]}</option>
                    )
                  })
                }  
              </select>
            </div>
          </div>

        {/* 각부서 그룹이름 선택 */}

          <div className='nameinput_box3'>
            <div className='nameinput_content'>소그룹/반</div>
            <div className='nameinput_content'>
              <div className='nameinput_notice'>
            
                {/* 영유아2부 */}
                <div className={classnames('nameinput_notice_wrapper', {show: show ==='1'})}>
                  <select className='nameinput_select_group' 
                    onChange={(e)=>{
                      let copy = e.target.value
                      set추가소그룹(copy)
                    }}>
                    <option>{부서선택}</option>
                    {
                      영유아2부ko.map((a,i)=>{
                        return (
                        <option>{영유아2부ko[i]}</option>
                        )
                      })
                    }  
                  </select>
                </div>
        
                {/* 유치2부 */}
                <div className={classnames('nameinput_notice_wrapper', {show: show ==='3'})}>
                  <select className='nameinput_select_group'
                    onChange={(e)=>{
                      let copy = e.target.value
                      set추가소그룹(copy)
                    }}>
                    <option>{부서선택}</option>
                    {
                      유치2부ko.map((a,i)=>{
                        return (
                        <option>{유치2부ko[i]}</option>
                        )
                      })
                    }  
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
          <div className='text'>소그룹/반</div>
          <input type="text" className="input" value={추가소그룹} onChange={(e)=>{set추가소그룹(e.target.value)}}/>
        </div>
        <div className='nameinput_inputbox'>
          <div className='text'>이름</div>
          <input type="text" className="input" onChange={(e)=>{set추가이름(e.target.value)}}/>
        </div>   
      </div>


      <button className='nameinput_button' 
        onClick={()=>{
        axios.post('/namemodify', {
          d_number : 반이름숫자로변경(부서선택),
          g_number : 소그룹number변경(),
          dg_number : filter[0].dgn,
          new_g : 추가소그룹,
          new_gn : 추가이름
        }).then((결과)=>{})
        .catch(()=>{
          console.log('실패함')
        })
        navigate('/')
      }}>입력하기</button>



      <button className='test_button' 
        onClick={()=>{
          console.log(filter[0].dgn)
        }}
          
            
        
      >테스트</button>


      
      
      <button className='home_button' onClick={()=>{ navigate('/') }} >홈 돌아가기</button> 
      <button className='testnamemodify_button' onClick={()=>{ navigate('/testnamemodify') }} >testnamemodify</button>

    </div>
  );
}

export default NameModify;