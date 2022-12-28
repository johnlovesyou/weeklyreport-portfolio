/*eslint-disable*/
import { React, useState } from 'react';
import './DateInput.css'

function DateInput(props) {

  let [show2, setshow2] = useState('')
 
  return (
    <div className='dateinput'>
      
        <div className='dateinput_select_box'>
          <div className='dateinput_content1'>{props.group}</div>
          <div className='dateinput_content2'>
             { props.person.map((a,i)=>{return (
              <div className='dateinput_namebox'>
                <label 
                  onClick={(e)=>{
                    if (e.target.checked === true) { console.log(props.person[i].n) }
                  }}
                   className='dateinput_name_label'>
                  <div className='dateinput_name_name'>{props.person[i].n}</div>
                  <div><input type='checkbox' className='dateinput_name_input'/></div>
                </label>
              </div>
             )})}  
          </div>
        </div>
       
   
        
    </div>
  );
}

export default DateInput;
