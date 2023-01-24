/*eslint-disable*/
import { React, useMemo, useState } from 'react';
// import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import './Dep.css'
import axios from 'axios'
import $ from "jquery";
import classnames from 'classnames';
import Basicdepmain from '../depdatabasic/Basicdepmain'
import Basicgroup from '../depdatabasic/Basicgroup'
import Date from '../depcommon/Date'
import Deptable from '../depcommon/Deptable';
import Stats from '../depcommon/Stats';
import BasicDatedata from '../depdatabasic/BasicDatedata'

function Dep5(props) {

  // let state = useSelector((state) => { return state } )
  let navigate = useNavigate();

  useMemo(()=>{ return (
    axios.get(`/date`).then((결과)=>{
      console.log(결과.data)
      let copy = [...결과.data]
      setdate_data(copy)
    }),
    axios.get(`/depmain`).then((결과)=>{ 
      console.log(결과.data)
      let copy = [...결과.data]
      set_dmain(copy)
    }),
    axios.get(`/dep/5`).then((결과)=>{ //부서별 수정할 것
      console.log(결과.data)
      let copy = [...결과.data]
      set부서(copy)
    })
  ) }, [])

  // classNames
  let [show, setshow] = useState('1학년'); //부서별 수정할 것
  let [color, setcolor] = useState('1');

  // 데이터
  let [dmain, set_dmain] = useState(Basicdepmain)
  let [부서, set부서] = useState(Basicgroup)
  let [date_data, setdate_data] = useState(BasicDatedata)

  // 지정날짜
  let [date, setdate] = useState('선택')
  let [date_num, setdate_num] = useState('선택')
  var date_ft = (date) => {
    let copy = date_data.filter(e => e.date === `${date}`)
    let result = copy[0].id
    return result
  }

  // 각y_이름
  let y_main = dmain.filter(e => e.dn === `dep5`) //부서별 수정할 것
  let y_copy = y_main.map(e => e.dan_ko)
  let y_ko = [...new Set(y_copy)] // ['1~2세', '3세', '4세']
  let y_ko_copy = y_ko[0]
  let y_copy2 = y_main.map(e => e.dan)
  let y_n = [...new Set(y_copy2)] // ['1-1', '1-2', '1-3']

  // 각소그룹
  var y_g = (da) => {
    let y_group = 부서.filter(e => e.da === `${da}`)
    let groupcopy = y_group.map(e => e.dag_ko)
    let result = [...new Set(groupcopy)]
    return result
   } 
  
   var per_man_n = (da) => {
    let y_소그룹 = 부서.filter(e => e.da === `${da}`)
    let y_소그룹copy = y_소그룹.map(e => e.dag)
    let result = [...new Set(y_소그룹copy)];
    return result
   }

   // per_man
  var per_man = (da, da_ko) => {
    let 소그룹person = 부서.filter(e => e.da === `${da}`)
    let result = 소그룹person.filter(e => e.dag_ko === `${da_ko}`)
    return result
  }

  var per_man_name = (da, da_ko) => {
    let 소그룹person = 부서.filter(e => e.da === `${da}`)
    let copy = 소그룹person.filter(e => e.dag_ko === `${da_ko}`)
    let copy2 = copy.map(e => e.n)
    let result = [...new Set(copy2)];
    return result
  }

  // 출석 업로드
  var group_n_ft = (da_ko) => {
    let copy1 = 부서.filter(e => e.da_ko === `${da_ko}`)
    let result = copy1[0].da
    return result
  }
  
  let [group_n, setgroup_n] = useState(`5-1`)
  let dgn_n_ft = group_n.split('');
  let result_d_n = dgn_n_ft[0];
  let result_a_n = dgn_n_ft[2];
  
  let [addperson, setaddperson] = useState(['']);


  return (
    <div className='dep_main'>
      <div className='dep_main_inner'>
        {/* 출석현황 */}
        <div className='dep_main_presentCondition'>

          <div className='dep_main_title'>
            {/* 1) 타이틀 */}           {/* 부서별 수정할 것 */}
            <div className='dep_main_text'>유년2부</div> 
            {/* 2) 버튼 */}
            <div className='dep_main_buttonleft'>
              {
              [1,2,3].map((a,i)=>{
                return ( 
                  <button className={classnames('dep_agebutton', {buttoncolor: color === `${i+1}`})} 
                  onClick={()=>{setshow(`${y_ko[i]}`); setcolor(`${i+1}`)
                  let copy = group_n_ft(`${y_ko[i]}`)
                  setgroup_n(copy)
                  }}> {y_ko[i]} </button>   
                )})
              }
            </div>
            <div className='dep_main_buttonright'>
              <button className='dep_dateinputbutton' onClick={()=>{
                let location_Aboutme = $('#Aboutme').offset().top - 20
                window.scroll({top: location_Aboutme, behavior:'smooth'});
                  }}> 출석입력 </button>   
              <button className='dep_homebutton' onClick={()=>{
                  navigate('/')
                  }}> Home </button> 
            </div>
          </div>

          {/* 3) 출석현황 */}
          <div className='dep_main_presentlist'>
            {/* 날짜 */}
            <div className='dep_main_present_date'>
              <Date date={date_data}></Date>
            </div>
            {/* 출석현황 */}
            {
              [1,2,3].map((a1,i1)=>{
                return ( 
                <div className={classnames('dep_main_deptable', {show: show === `${y_ko[i1]}`})}>
                  {y_g(`${y_n[i1]}`).map((a2,i2)=>{
                  return ( <Deptable group={y_g(`${y_n[i1]}`)[i2]} 
                                    person={per_man(`${y_n[i1]}`, `${a2}`)}></Deptable>)})}
                </div>
                )})
            }
            {/* 통계 */}
            <div className='dep_main_stats'>
              {
              [1,2,3].map((a1,i1)=>{
                return ( 
                <div className={classnames('dep_main_statsbox', {show: show === `${y_ko[i1]}`})}>
                  <Stats date={date_data} 나이={y_ko[i1]} 부서통계={부서.filter(e => e.da === `${y_n[i1]}`)}></Stats>
                </div>
                )})
              }
            </div>
          </div>

          

        </div>
        
        {/* 출석기입 */}
        <div className='dep_main_presentInput'>
          {/* 1) 타이틀 */}
          <div className='dep_main_text' id="Aboutme">출석입력하기</div> 
          {/* 2) 날짜선택 */}
          <div className='dep_main_dateselect_wrapper'>
            <div className='dep_main_dateselect_text1'>날짜선택</div>
            <select className='dep_main_dateselect_box'
              onChange={(e)=>{
                  let copy = e.target.value; setdate(copy)
                  $("input:checkbox[id='checkbox']").prop("checked", false);
                }}>
              <option>선택</option>
              {  date_data.map((a,i)=>{return (<option>{date_data[i].date}</option>)})}  
            </select>
            <div className='dep_main_dateselect_text2'>← 날짜를 선택하세요</div>
          </div>
          {/* 안내메시지 */}
          <div className='dep_main_noitce_text1'>-  ↓ 학생 선택 후 +버튼을 누르면 입력됩니다.  -</div>
          {/* 3) 현황버튼 */}
          <div className='dep_main_inputstate'>
            <div className='dep_main_inputstate_text1'>[ 날짜:  {date} ]</div>
            <div className='dep_main_inputstate_text2'>입력대기현황</div>
          </div>

          {/* 4) 출석입력 */}
          <div className='dep_main_dateinput'>
            {/* 출석선택박스 */}
            {[1,2,3].map((a,i)=>{
              return(
              <div className={classnames('dep_main_input_wrapper', {show: show === `${y_ko[i]}`})}>
                {y_g(`${y_n[i]}`).map((a1, i1)=>{
                  return (
                    <div className='dep_main_dateinput_box' onChange={(e)=>{
                        if ( date === '선택') { alert('날짜를 선택하세요'); e.target.checked === false;}
                        }}>
                      <div className='dep_main_dateinput_content1'>{y_g(`${y_n[i]}`)[i1]}</div>
                      <div className='dep_main_dateinput_content2'>
                        {per_man_name(`${y_n[i]}`, `${y_g(`${y_n[i]}`)[i1]}`).map((a2,i2)=>{
                          return (
                          <div className='dateinput_namebox'>
                            <label className='dateinput_name_label'
                              onClick={(e)=>{
                                var copy = per_man_name(`${y_n[i]}`, `${y_g(`${y_n[i]}`)[i1]}`)[i2]
                                setselectname(copy)
                                }}>
                              <div className='dateinput_name_name'>{per_man_name(`${y_n[i]}`, `${y_g(`${y_n[i]}`)[i1]}`)[i2]}</div>
                              <div><input id='checkbox' type='checkbox' className='dateinput_name_input'
                              value={per_man_name(`${y_n[i]}`, `${y_g(`${y_n[i]}`)[i1]}`)[i2]}/></div>
                            </label>
                          </div>
                          )})}
                      </div>
                    </div>
                  )})}  
                </div>
              )})}
                    
            {/* 출석적용현황 */}
            <div className='dateinput_content_stats'>
              <div className='dateinput_state_box'>
               {[1,2,3].map((a,i)=>{
                return(
                <div className={classnames('dateinput_stats_wrapper', {showflex : show === `${y_ko[i]}`})}>
                  <div className='dateinput_state_contentbox'>
                  {addperson.map((a,i)=>{
                    return (
                    <div className='dateinput_state_content_name'>{addperson[i]}</div>
                    )})}      
                  </div>
                </div>
                )})}
              </div> 
            </div>                            
              
          </div>

          {/* 5) 버튼 */}
          <div className='dateinput_content_button_box'>
            
            {/* 입력대기버튼 */}
            <div className='dateinput_content_button'>  
              <button className='dateinput_inputbutton'
              onClick={()=>{ 

              var add = [];
              $('input[type="checkbox"]:checked').each(function (i) {
                add.push($(this).val());
              });
              setaddperson(add)
              $("input:checkbox[id='checkbox']").prop("checked", false);

              if(add.length > 20) {alert('선택한 인원이 너무 많습니다. 20명 이하로 선택해주세요')}

              }}>입력대기</button>
            </div>

            {/* 다시하기버튼 */}
            <div className='dateinput_content_button'>
              <button className='dateinput_refreshbutton'
              onClick={()=>{
                setaddperson(['']);
              }}>다시하기</button>
            </div>
            
            {/* 업로드버튼 */}
            <div className='dateinput_content_button'>
              <button className='dateinput_uplordbutton'
              onClick={()=>{
                axios.post('/dateinput', {
                    day : date_ft(date), dep : result_d_n,
                    age : result_a_n, person : addperson
                  }).then((결과)=>{
                    if (결과.data === "입력 성공!") {alert(addperson + '  입력되었습니다.');} 
                    else {alert(결과.data);}})
                  .catch(()=>{console.log('실패함')})

              }}>입력하기</button>
            </div>

            {/* HOME버튼 */}
            <div className='dateinput_content_button'>
              <button className='dateinput_homebutton'
              onClick={()=>{
                navigate('/')
              }}>Home</button>
            </div>

            {/* 삭제버튼 */}
            <div className='dateinput_content_button'>
              <button className='dateinput_deletebutton'
              onClick={()=>{
                axios.post('/datedelete', {
                  day : date_ft(date), dep : result_d_n,
                  age : result_a_n, person : addperson
                }).then((결과)=>{
                  if (결과.data === "입력 성공!") {alert(addperson + '  삭제되었습니다.');
                    setaddperson(['']);} 
                  else {alert(결과.data);}})
                .catch(()=>{console.log('실패함')})

              }}>출석삭제</button>
            </div>


          </div>
            {/* 안내메시지 */}
            <div className='dep_main_noitce_text3'>- '입력대기' 클릭 후 '입력하기/출석삭제' 버튼을 클릭해야 자료가 입력/삭제됩니다. -</div>
            <div className='dep_main_noitce_text4'>- 한번에 입력 가능한 인원 : 20명이하 / 삭제 : 5명 이하 -</div>
          

        </div>
      </div>
    </div>
  );
}

export default Dep5;