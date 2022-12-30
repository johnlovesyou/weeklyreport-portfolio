/*eslint-disable*/
import { React, useState } from 'react';
import './DateInput.css'
import axios from 'axios';
import $ from 'jquery'

function DateInput(props) {

  var dgn_num_ft = props.group_num.split('');
  let result_d_num = dgn_num_ft[0]
  let result_a_num = dgn_num_ft[2]
  let result_g_num = dgn_num_ft[4]

  let [test, settest] = useState('')
  

  return (
    <div className='dateinput'>
      
        <div className='dateinput_select_box'>
          <div className='dateinput_content1'>{props.group}</div>
          <div className='dateinput_content2'>
             { props.person.map((a,i)=>{return (
              <div className='dateinput_namebox'>
                <label
                  onClick={(e)=>{
                    if (e.target.checked === true) {
                      let copy = {...test};
                      let copy2 = copy + props.person[i].n
                      console.log(copy2)
                      }}}
                   className='dateinput_name_label'>
                  <div className='dateinput_name_name'>{props.person[i].n}</div>
                  <div><input id='checkbox' type='checkbox' className='dateinput_name_input'/></div>
                </label>
              </div>
             )})} 
          </div>

          
        </div>
       
        <button onClick={()=>{
          // console.log(props.date)
          $("input:checkbox[id='checkbox']").prop("checked", false);
          axios.post('/dateinput', {
            day : props.date_result,
            dep : result_d_num,
            age : result_a_num,
            group : result_g_num,
            person : ['이요한', '강신애', '이예지']
          }).then((결과)=>{
            alert(결과.data);
            if (결과.data === "입력 성공!") {
              navigate('/')
            } 
          })
          .catch(()=>{console.log('실패함')})

        }}>입력</button>


        <button onClick={()=>{
          console.log(test)

        }}>테스트</button>
   
        
    </div>
  );
}

export default DateInput;
