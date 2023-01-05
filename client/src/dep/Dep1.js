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
import DateInput from '../depcommon/DateInput';
import Stats from '../depcommon/Stats';
import BasicDatedata from '../depdatabasic/BasicDatedata'

function Dep1(props) {

  // let state = useSelector((state) => { return state } )
  let navigate = useNavigate();

  useMemo(()=>{ return (
    axios.get(`/date`).then((결과)=>{ //부서별 수정할 것
      console.log(결과.data)
      let copy = [...결과.data]
      setdate_data(copy)
    }),
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
  let [date_data, setdate_data] = useState(BasicDatedata)

  // 지정날짜
  let [date, setdate] = useState('1 / 1')
  let date_origin = date_data.filter(e => e.date === `${date}`)
  let date_result = date_origin[0].id

  // 각y_이름
  let y_main = dmain.filter(e => e.dn === `dep1`) //부서별 수정할 것
  let y_copy = y_main.map(e => e.dan_ko)
  let y_ko = [...new Set(y_copy)] // ['1~2세', '3세', '4세']
  let y_copy2 = y_main.map(e => e.dan)
  let y_num = [...new Set(y_copy2)] // ['1-1', '1-2', '1-3']

  // 각소그룹
  var 각y_group = (da) => {
    let y_group = 부서.filter(e => e.da === `${da}`)
    let groupcopy = y_group.map(e => e.dag_ko)
    let result = [...new Set(groupcopy)]
    return result
   } 
  
   var 각소그룹person_num = (da) => {
    let y_소그룹 = 부서.filter(e => e.da === `${da}`)
    let y_소그룹copy = y_소그룹.map(e => e.dag)
    let result = [...new Set(y_소그룹copy)];
    return result
   }

   // 각소그룹person
  var 각소그룹person = (da, da_ko) => {
    let 소그룹person = 부서.filter(e => e.da === `${da}`)
    let result = 소그룹person.filter(e => e.dag_ko === `${da_ko}`)
    return result
  }

  var 각소그룹person_name = (da, da_ko) => {
    let 소그룹person = 부서.filter(e => e.da === `${da}`)
    let copy = 소그룹person.filter(e => e.dag_ko === `${da_ko}`)
    let copy2 = copy.map(e => e.n)
    let result = [...new Set(copy2)];
    return result
  }

  // 통계
  // let stats1 = 부서.filter(e => e.an === '1-1')
  // let stats2 = 부서.filter(e => e.an === '1-2')
  // let stats3 = 부서.filter(e => e.an === '1-3')


  // classNames
  let [show, setshow] = useState(`${y_ko[0]}`)
  let [color, setcolor] = useState('1')


  const [addperson, setaddperson] = useState(['']);
  const [addpersoncopy, setaddpersoncopy] = useState(['']);

  // let date = props.date_result
  // var dgn_num_ft = props.group_num.split('');
  // let result_d_num = dgn_num_ft[0]
  // let result_a_num = dgn_num_ft[2]
  // let result_g_num = dgn_num_ft[4]

  var addname = (name) => {
    let result = addperson.concat(name);
    setaddperson(result);
  }

  var removename = (name2) => {
    let indexnum = addperson.indexOf(name2);
    addperson.splice(indexnum, 1);
    let result2 = addperson.sort();
    setaddperson(result2);
  }

  return (
    <div className='dep_main'>
      <div className='dep_main_inner'>
        {/* 출석현황 */}
        <div className='dep_main_presentCondition'>

          <div className='dep_main_title'>
            {/* 1) 타이틀 */}           {/* 부서별 수정할 것 */}
            <div className='dep_main_text'>영유아2부</div> 
            {/* 2) 버튼 */}
            <div className='dep_main_buttonleft'>
              {
              [1,2,3].map((a,i)=>{
                return ( 
                  <button className={classnames('dep_agebutton', {buttoncolor: color === `${i+1}`})} 
                  onClick={()=>{setshow(`${y_ko[i]}`); setcolor(`${i+1}`)
                  }}> {y_ko[i]} </button>   
                )})
              }


                <button className='dep_testbutton' onClick={()=>{
                  console.log(각소그룹person('1-1', '1년첫번째반'))
                  }}> test </button> 


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
                  {각y_group(`${y_num[i1]}`).map((a2,i2)=>{
                  return ( <Deptable group={각y_group(`${y_num[i1]}`)[i2]} 
                                    person={각소그룹person(`${y_num[i1]}`, `${a2}`)}></Deptable>)})}
                </div>
                )})
            }
            {/* 통계 */}
            <div className='dep_main_stats'>
              {
              [1,2,3].map((a1,i1)=>{
                return ( 
                <div className={classnames('dep_main_statsbox', {show: show === `${y_ko[i1]}`})}>
                  <Stats date={date_data} 나이={y_ko[i1]} 부서통계={부서.filter(e => e.an === `${y_num[i1]}`)}></Stats>
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
                if (e.target.value === '선택') {
                } else {let copy = e.target.value; setdate(copy)
                }}}>
              <option>선택</option>
              {  date_data.map((a,i)=>{return (<option>{date_data[i].date}</option>)})}  
            </select>
            <div className='dep_main_dateselect_text2'>← 날짜를 선택하세요</div>

            <button onClick={()=>{
            console.log(date_result)
          }}>test</button>

          </div>
          {/* 안내메시지 */}
          <div className='dep_main_noitce_text'>-  ↓ 학생 선택 후 +버튼을 누르면 입력됩니다.  -</div>
          {/* 3) 현황버튼 */}
          <div className='dep_main_inputstate'>
            <div className='dep_main_inputstate_text1'>[ 날짜:  {date} ]</div>
            <div className='dep_main_inputstate_text2'>입력현황</div>
          </div>
          {/* 4) 출석입력 */}
          <div className='dep_main_dateinput'>

            <div className='dep_main_input_wrapper'>
              {
                각y_group('1-1').map((a, i)=>{
                  return (
                    <div className='dep_main_dateinput_box'>
                      <div className='dep_main_dateinput_content1'>{각y_group('1-1')[i]}</div>
                      <div className='dep_main_dateinput_content2'>
                        {각소그룹person_name('1-1', `${각y_group('1-1')[i]}`).map((a2,i2)=>{
                          return (
                          <div className='dateinput_namebox'>
                            <label className='dateinput_name_label'
                              onClick={(e)=>{
                                let copy = 각소그룹person_name('1-1', `${각y_group('1-1')[i]}`)[i2]
                                if (e.target.checked === true) { addname(copy)} 
                                else if (e.target.checked === false) { removename(copy)}
                                }}>
                              <div className='dateinput_name_name'>{각소그룹person_name('1-1', `${각y_group('1-1')[i]}`)[i2]}</div>
                              <div><input id='checkbox' type='checkbox' className='dateinput_name_input'/></div>
                            </label>
                          </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })
              }  
            </div>

                          
              {/* 입력(+)버튼 */}
              <div className='dateinput_content3'>  
                <button className='dateinput_button'
                onClick={()=>{ addperson.shift(); setaddperson(['']); setaddpersoncopy(addperson);
                $("input:checkbox[id='checkbox']").prop("checked", false);

                // axios.post('/dateinput', {
                //   day : date, dep : result_d_num, age : result_a_num,
                //   group : result_g_num, person : addperson
                // }).then((결과)=>{
                //   if (결과.data === "입력 성공!") {alert(addperson);} 
                //   else {alert(결과.data);}})
                // .catch(()=>{console.log('실패함')})

                }}>+</button>
              </div>

                    
              

              {/* 출석적용현황 */}
              {/* <div className='dateinput_content4'>
                <div className='dateinput_state_box1'> 
                  <div className='dateinput_state_text'></div> 
                </div>
                <div className='dateinput_state_box2'>
                 {addpersoncopy.map((a,i)=>{return (
                    <p className='dateinput_state_content'>{addpersoncopy[i]}</p>
                )})}  
                </div> 
              </div> */}

            {/* {
              [1,2,3].map((a1,i1)=>{
                return (
                  <div className={classnames('dep_main_selectbox', {show: show === `${y_ko[i1]}`})}>
                  { 각y_group(`${y_num[i1]}`).map((a2,i2)=>{
                    return ( <DateInput date_result={date_result}
                                        group={각y_group(`${y_num[i1]}`)[i2]}  
                                        group_num={각소그룹person_num(`${y_num[i1]}`)[i2]}
                                        person={각소그룹person(`${y_num[i1]}`, `${a2}`)}></DateInput>)})}
                  </div> 
                )})
            } */}
          </div>
          
          {/* 5) 적용버튼 */}
          <div className='dep_main_lastbutton_box'>
            <button className='dep_main_lastbutton'
            onClick={()=>{
              navigate('/')
            }}>확인 & Home</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dep1;