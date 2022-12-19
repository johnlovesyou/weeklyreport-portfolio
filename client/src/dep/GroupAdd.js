/*eslint-disable*/
import { React, useMemo, useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { useSelector } from "react-redux"
import axios from 'axios';
import './GroupAdd.css'
import Basicdep from './Basicdep';
import Basicdepmain from './Basicdepmain.js';

function GroupAdd(props) {

  let state = useSelector((state) => { return state } )
  let navigate = useNavigate();

  useMemo(()=>{ return (
    axios.get('/depmain').then((결과)=>{console.log(결과.data); let copy = [...결과.data]; set부서(copy)})
  ) }, [])

  // 테스트박스
  let [부서, set부서] = useState(Basicdepmain);
  let 부서copy = 부서.map(e => e.dn_ko);
  let 부서ko = [...new Set(부서copy)];

  
  let [부서선택, set부서선택] = useState("")
  let [소그룹입력, set소그룹입력] = useState("")

  var filter = 부서.filter(e => e.dn_ko === `${부서선택}`);
  let 부서number = filter.map(e => e.dgn);

  var 반이름새로만들기 = (dep) => {
    if (dep == '영유아2부') {return `1-${부서number.length+1}`} 
    else if (dep == '영유아3부') {return `2-${부서number.length+1}`}
    else if (dep == '유치2부') {return `3-${부서number.length+1}`}
  };

  var 반이름숫자로변경 = (dep) => {
    if (dep == '영유아2부') {return '1'} 
    else if (dep == '영유아3부') {return '2'}
    else if (dep == '유치2부') {return '3'}
  };

  return (
    <div className='groupadd'>

      {/* groupadd 박스 */}
      <div className='groupadd_wrapper'>
          <div className='groupadd_addbox1'>

            <div className='groupadd_select_div1'>
            부서</div>
            <div className='groupadd_select_div1'>
            소그룹명</div>

          </div>

          <div className='groupadd_addbox2'>
          
            <div className='groupadd_select_div2'>
              <select className='groupadd_select_dep'
                onChange={(e)=>{ let copy = e.target.value; 
                        set부서선택(copy)}}>
                <option>부서</option>
                {부서copy.map((a,i)=>{return (<option>{부서ko[i]}</option>)})}  
              </select>
            </div>
            
            <div className='groupadd_select_div2'>
              <input className='groupadd_select_textinputbox'
              type="text" onChange={(e)=>{
                set소그룹입력(e.target.value)
              }}></input>
            </div>
                    
          </div>


          <div className='groupadd_button_div'>
            <div>
              <button className='groupadd_input_button'
                onClick={()=>{
                axios.post('/groupadd', {
                  dep : 반이름숫자로변경(부서선택),
                  g_num : 반이름새로만들기(부서선택),
                  new_gn : 소그룹입력
                }).then((결과)=>{
                })
                .catch(()=>{
                  console.log('실패함')
                })
                alert('입력되었습니다.')
                navigate('/nameadd')
              }}>입력하기</button>
            </div>

            <div>
              <button className='groupadd_back_button' 
                onClick={()=>{
                  navigate('/nameadd')
                }}
              >뒤로가기</button>
            </div>

            {/* <div>
              <button className='groupadd_test_button' 
                onClick={()=>{
                  console.log('')
                }}
              >테스트</button>
            </div> */}

          </div>
        {/*       
          <div>
            <button className='addbutton2' 
              onClick={()=>{
                axios.get('/namemodify').then((결과)=>{
                  console.log(결과.data)
                  let copy = [...결과.data]
                  setadd3(copy)
                })
              }}>데이터 불러오기</button>

            <div className='addinpunt2'>
              <input type="text" onChange={(e)=>{
                setadd1(e.target.value)
              }}></input>을</div>
            <div className='addinpunt2'>
            <input type="text" onChange={(e)=>{
              setadd2(e.target.value)
            }}></input>으로</div>
            
            <button className='addbutton2' 
              onClick={()=>{
              axios.post('/groupadd', {
                addname1 : add1,
                addname2 : add2
              }).then((결과)=>{})
              .catch(()=>{
                console.log('실패함')
              })
            }}>테이블 이름 수정하기</button>
            <div>

            </div>
          </div> */}

        
      </div>
    </div>
  );
}

export default GroupAdd;