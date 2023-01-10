/*eslint-disable*/
import { React, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import axios from 'axios';
import classnames from 'classnames';
import './NameAdd.css';
import Basicdepmain from '../depdatabasic/Basicdepmain.js';

function NameAdd(props) {

  let state = useSelector((state) => { return state } )
  let navigate = useNavigate();
  let [show, setshow] = useState('')
  let [show2, setshow2] = useState('')

  useMemo(()=>{ return (
    axios.get('/depmain').then((결과)=>{console.log(결과.data); let copy = [...결과.data]; set부서(copy)})
  ) }, [])
  
  let [부서, set부서] = useState(Basicdepmain);

  // 부서이름선택
  let 부서copy = 부서.map(e => e.dn_ko);
  let 부서ko = [...new Set(부서copy)];
  let [d_num, setd_num] = useState(''); // 영유아2부 -> 1, 유치2부 -> 3
  
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

  // 각 부서 소그룹 선택
  let [dag_num, setdag_num] = useState('');

  var 소그룹선택  = (g_num) => { // ex) 첫번째반, 두번째반
    let 소그룹 = 부서.filter(e => e.dan === `${g_num}`)
    let 소그룹copy = 소그룹.map(e => e.dgn_ko);
    let 소그룹ko = [...new Set(소그룹copy)];
    return 소그룹ko
  };

  var dag_num_ft = (dep, age, group) => { // ex) 1-1-1, 1-2-1
    let filter1 = 부서.filter(e => e.dn_ko === `${dep}`)
    let filter2 = filter1.filter(e => e.dan_ko === `${age}`)
    let filter3 = filter2.filter(e => e.dgn_ko === `${group}`)
    let result = filter3[0].dgn
    return result
  }

  // 명단추가 박스
  let [추가부서, set추가부서] = useState('')
  let [추가학년나이, set추가학년나이] = useState(''); 
  let [추가소그룹, set추가소그룹] = useState('') 
  let [추가이름, set추가이름] = useState('');

  var dgn_num_ft = dag_num.split('');
  let result_d_num = dgn_num_ft[0]
  let result_a_num = dgn_num_ft[2]
  let result_g_num = dgn_num_ft[4]
      
  return (
    <div className='nameadd'>

      <div className='nameadd_main_wrapper'>

        {/* 상단 선택 박스 */}
        <div className='nameadd_select_wrapper'>

          {/* 각부서 선택 */}
            <div className='nameadd_select_box1'>
              <div className='nameadd_content'></div>
              <div className='nameadd_content choice'>선택</div>
            </div>

            <div className='nameadd_select_box2'>
              <div className='nameadd_content'>추가부서</div>
              <div className='nameadd_content'>
                <select className='nameadd_select_dep'
                  onChange={(e)=>{ let copy = e.target.value; set추가부서(copy);
                                  setd_num(d_num_ft(copy)); setshow(d_num_ft(copy))}}>
                  <option>부서</option>
                  {부서ko.map((a,i)=>{return (<option>{부서ko[i]}</option>)})}  
                </select>
              </div>
            </div>

          {/* 각부서 나이&학년 선택 박스 */}

            <div className='nameadd_select_box3'>
              <div className='nameadd_content'>학년/나이</div>
              <div className='nameadd_content'>
                <div className='nameadd_notice'>
                  {/* 각부서_나이&학년 선택*/}
                  {
                    [1,2,3,4,5,6,7,8,9,10].map((a1,i1)=>{
                      return (
                        <div className={classnames('nameadd_notice_wrapper', {show: show ===`${a1}`})}>
                          <select className='nameadd_select_age' 
                            onChange={(e)=>{let copy = e.target.value; set추가학년나이(copy); 
                                            let da_num = da_num_ft(`${추가부서}`, `${copy}`)
                                            setda_num(da_num); setshow2(da_num);}}>
                            <option>선택</option>
                            {나이학년선택(`dep${a1}`).map((a,i)=>{return (<option>{나이학년선택(`dep${a1}`)[i]}</option>)})}  
                          </select>
                        </div>
                      )
                    })
                  }
                </div> 
              </div>
            </div>

            {/* 각부서 소그룹 선택 박스 */}
            <div className='nameadd_select_box4'>
              <div className='nameadd_content'>소그룹/반</div>
              <div className='nameadd_content'>
                <div className='nameadd_notice'>
                  {/*학년별_소그룹선택 */}
                  {
                    ['1-1', '1-2', '1-3', '2-1', '2-2', '2-3', '3-1', '3-2', '3-3',
                    '4-1', '4-2', '4-3', '5-1', '5-2', '5-3', '6-1', '6-2', '6-3',
                    '7-1', '7-2', '7-3', '8-1', '8-2', '8-3', '9-1', '9-2', '9-3', '10-1', '10-2', '10-3',
                    ].map((a1,i1)=>{
                      return (
                        <div className={classnames('nameadd_notice_wrapper', {show: show2 ===`${a1}`})}>
                          <select className='nameadd_select_group' 
                            onChange={(e)=>{let copy = e.target.value; set추가소그룹(copy)
                              let copy2= dag_num_ft(`${추가부서}`, `${추가학년나이}`, `${copy}`)
                              setdag_num(copy2)}}>
                            <option>선택</option>
                            {소그룹선택(`${a1}`).map((a,i)=>{return (<option>{소그룹선택(`${a1}`)[i]}</option>)})}  
                          </select>
                        </div>
                      )
                    })
                  }
                 </div>
              </div>
            </div>  
        </div>

        

        {/* 명단 추가 박스 */}
        <div className='nameadd_input'>
          <input type="text" className="input_none" onChange={(e)=>{setnewid(e.target.value)}}/>
          <div className='nameadd_inputbox'>
            <div className='text'>부서</div> <input type="text" className="input" placeholder='선택하세요' value={추가부서} />
          </div>
          <div className='nameadd_inputbox'>
            <div className='text'>학년/나이</div> <input type="text" className="input" placeholder='선택하세요' value={추가학년나이} />
          </div>
          <div className='nameadd_inputbox'>
            <div className='text'>소그룹/반</div> <input type="text" className="input" placeholder='선택하세요' value={추가소그룹} />
          </div>
          <div className='nameadd_inputbox'>
            <div className='text'>이름</div> <input type="text" className="input" onChange={(e)=>{set추가이름(e.target.value)}}/>
          </div>   
        </div>

        <div className='nameadd_button_box'>
          <button className='nameadd_button' 
            onClick={()=>{
              axios.post('/nameadd', {
              d_num : result_d_num, a_num : result_a_num,
              g_num : result_g_num, g_ko : 추가소그룹, new_n : 추가이름
            }).then((결과)=>{
              alert(결과.data);  
            })
            .catch(()=>{console.log('실패함')})
          }}>입력하기</button>

          <button className='home_button' onClick={()=>{ navigate('/') }} >Home</button> 

          <button className='namedelete_button' 
            onClick={()=>{
              axios.post('/namedelete', {
              d_num : result_d_num, a_num : result_a_num,
              delete_n : 추가이름
            }).then((결과)=>{
              alert(결과.data);
            })
            .catch(()=>{console.log('실패함')})
          }}>삭제하기</button>

          <button className='groupadd_button' onClick={()=>{ navigate('/groupadd') }} >소그룹관리</button>
        </div>          

      </div>    
    </div>
  );
}

export default NameAdd;