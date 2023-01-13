/*eslint-disable*/
import { React, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import axios from 'axios';
import classnames from 'classnames';
import './GroupAdd.css'
import Basicdepmain from '../depdatabasic/Basicdepmain.js';

function GroupAdd(props) {

  let navigate = useNavigate();
  let [show, setshow] = useState('1')

  useMemo(()=>{ return (
    axios.get('/depmain').then((결과)=>{console.log(결과.data); let copy = [...결과.data]; set부서(copy)})
  ) }, [])

  let [부서, set부서] = useState(Basicdepmain);
  let 부서copy = 부서.map(e => e.dn_ko);
  let 부서ko = [...new Set(부서copy)];

  var d_num_ft = (num) => { // ex) 영유아2부 : 1, 유치2부 : 3
    let filter = 부서.filter(e => e.dn_ko === `${num}`)
    let copy = filter[0].dn
    let result = copy.slice(3);
    return result
  }

  // 각부서 나이&학년 선택
  let [da_num, setda_num] = useState('');

  var 나이학년선택  = (depnum) => { // ex) 3세, 4세, 5세
    let 각부서학년 = 부서.filter(e => e.dn === `${depnum}`)
    let 각부서학년copy = 각부서학년.map(e => e.dan_ko);
    let 각부서학년ko = [...new Set(각부서학년copy)];
    return 각부서학년ko
  };

  var da_num_ft = (s1, s2) => { // ex) 영유아2부 : 1-1, 유치2부 : 3-1
    let filter1 = 부서.filter(e => e.dn_ko === `${s1}`)
    let filter2 = filter1.filter(e => e.dan_ko === `${s2}`)
    let result_num = filter2[0].dan
    return result_num
  }

  // 소그룹 넘버
  var dag_num_ft_plus1 = (dep, age) => { // ex) 1-1-1, 1-2-1
    let filter1 = 부서.filter(e => e.dn_ko === `${dep}`)
    let filter2 = filter1.filter(e => e.dan_ko === `${age}`)
    let result = filter2.length+1
    return result
  }

  let [추가부서, set추가부서] = useState('')
  let [추가학년나이, set추가학년나이] = useState('');  
  let [추가소그룹, set추가소그룹] = useState('');

  var dan_num_ft = da_num.split('');
  let result_d_num = dan_num_ft[0]
  let result_a_num = dan_num_ft[2]
  let [result_g_numplus1, set_g_numplus1] = useState('');

  return (
    <div className='groupadd'>


      {/* groupadd 박스 */}
      <div className='groupadd_wrapper'>
        
        <div className='groupadd_addselectbox'>
          <div className='groupadd_addbox1'>
            <div className='groupadd_select_div1'>부서</div>
            <div className='groupadd_select_div1'>
              <select className='groupadd_select_dep1'
                onChange={(e)=>{ let copy = e.target.value; 
                        set추가부서(copy); setshow(d_num_ft(copy))}}>
                <option>부서</option>
                {부서copy.map((a,i)=>{return (<option>{부서ko[i]}</option>)})}  
              </select>
            </div>
          </div>
          
          <div className='groupadd_addbox2'>
            <div className='groupadd_select_div2'>학년/나이</div>
            {
              [1,2,3,4,5,6,7,8,9,10].map((a1,i1)=>{
                return (
                  <div className={classnames('groupadd_select_div2 noshow', {show: show === `${a1}`})}>
                    <select className='groupadd_select_dep2'
                      onChange={(e)=>{ let copy = e.target.value; set추가학년나이(copy)
                            let copy2 = da_num_ft(`${추가부서}`, `${copy}`)
                            let copy3 = dag_num_ft_plus1(`${추가부서}`, `${copy}`)
                            setda_num(copy2); set_g_numplus1(copy3)
                            }}>
                            <option>선택</option>
                            {나이학년선택(`dep${a1}`).map((a,i)=>{return (<option>{나이학년선택(`dep${a1}`)[i]}</option>)})} 
                    </select>
                  </div>
                )
              })
            } 
          </div> 

          <div className='groupadd_addbox3'>
            <div className='groupadd_select_div3'>소그룹명</div>
            <div className='groupadd_select_div3'>
              <input className='groupadd_select_textinputbox'
              type="text" onChange={(e)=>{
                set추가소그룹(e.target.value)
              }}></input>
            </div>
          </div>

        </div>

        {/* 버튼 */}
        <div className='groupadd_button_div'>
          <div>
            <button className='groupadd_input_button'
              onClick={()=>{
              axios.post('/groupadd', {
                d_num : result_d_num, a_num : result_a_num,
                g_numplus1 : result_g_numplus1, new_gn : 추가소그룹
              }).then((결과)=>{
                alert(결과.data);
                if (결과.data === "입력되었습니다!") { navigate('/nameadd')} 
              })
              .catch(()=>{console.log('실패함')})
            }}>입력하기</button>
          </div>

          <div>
            <button className='groupadd_back_button' 
              onClick={()=>{
                navigate('/nameadd')
              }}
            >뒤로가기</button>
          </div>

          <div>
            <button className='groupadd_input_button'
              onClick={()=>{
              axios.post('/groupdelete', {
                d_num : result_d_num, a_num : result_a_num,
                delete_gn : 추가소그룹
              }).then((결과)=>{
                alert(결과.data);
                if (결과.data === "삭제되었습니다!") { navigate('/nameadd')} 
              })
              .catch(()=>{console.log('실패함')})
            }}>삭제하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupAdd;