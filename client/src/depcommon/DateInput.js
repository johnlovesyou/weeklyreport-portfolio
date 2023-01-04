/*eslint-disable*/
import { React, useState } from 'react';
import './DateInput.css'
import axios from 'axios';
import $ from 'jquery'

function DateInput(props) {

  let date = props.date_result
  var dgn_num_ft = props.group_num.split('');
  let result_d_num = dgn_num_ft[0]
  let result_a_num = dgn_num_ft[2]
  let result_g_num = dgn_num_ft[4]

  const [addperson, setaddperson] = useState(['']);
  const [addpersoncopy, setaddpersoncopy] = useState(['']);
  
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
    <div className='dateinput'>
      
      <div className='dateinput_wrapper'>
        {/* 소그룹명 */}
        <div className='dateinput_content1'>{props.group}</div>
        {/* 학생선택박스 */}
        <div className='dateinput_content2'>
          { props.person.map((a,i)=>{return (
            <div className='dateinput_namebox'>
              <label className='dateinput_name_label'
                onClick={(e)=>{
                  if (e.target.checked === true) { addname(props.person[i].n)} 
                  else if (e.target.checked === false) { removename(props.person[i].n)}}}>
                <div className='dateinput_name_name'>{props.person[i].n}</div>
                <div><input id='checkbox' type='checkbox' className='dateinput_name_input'/></div>
              </label>
            </div>
          )})} 
        
        
          {/* 입력(+)버튼 */}
          <div className='dateinput_content3'>  
            <button className='dateinput_button'
            onClick={()=>{ addperson.shift(); setaddperson(['']); setaddpersoncopy(addperson);
            $("input:checkbox[id='checkbox']").prop("checked", false);

            axios.post('/dateinput', {
              day : date, dep : result_d_num, age : result_a_num,
              group : result_g_num, person : addperson
            }).then((결과)=>{
              if (결과.data === "입력 성공!") {alert(addperson);} 
              else {alert(결과.data);}})
            .catch(()=>{console.log('실패함')})

            }}>+</button>
          </div>

          <button onClick={()=>{
            console.log(date)
          }}>test</button>
        
        </div>

        {/* 출석적용현황 */}
        <div className='dateinput_content4'>
          <div className='dateinput_state_box1'> {/* 가로360px이하 보임 */}
            <div className='dateinput_state_text'></div> 
          </div>
          <div className='dateinput_state_box2'>
          {addpersoncopy.map((a,i)=>{return (
              <p className='dateinput_state_content'>{addpersoncopy[i]}</p>
          )})} 
          </div> 
        </div>

      </div>
    </div>
  );
}

export default DateInput;
