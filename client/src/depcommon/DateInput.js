/*eslint-disable*/
import { React, useState } from 'react';
import './DateInput.css'
import classnames from 'classnames';

function DateInput(props) {

  let [show2, setshow2] = useState('')
 
  return (
    <div className='dateinput'>
      
        <div className='dateinput_select_box'>
          <div className='dateinput_content1'>{props.group}</div>
          <div className='dateinput_content2'>
             { props.person.map((a,i)=>{return (
              <div className='dateinput_namebox'>
                <label className='dateinput_name_label'>
                  <div className='dateinput_name_name'>{props.person[i].n}</div>
                  <div><input type='checkbox' className='dateinput_name_input'/></div>
                </label>
              </div>
             )})}  
          </div>
        </div>
       
        <div className='dateinput_testbox_warpper'>
        <div className='dateinput_testbox'><input type='checkbox' className='dateinput_test' id="1"/></div>
        <div className='dateinput_testbox'><input type='checkbox' className='dateinput_test' id="2"/></div>
        <div className='dateinput_testbox'><input type='checkbox' className='dateinput_test' id="3"/></div>
        </div>
        

        
        
    </div>
  );
}

export default DateInput;
