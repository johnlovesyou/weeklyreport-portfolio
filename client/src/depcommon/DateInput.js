/*eslint-disable*/
import { React, useState } from 'react';
import './DateInput.css'
import classnames from 'classnames';

function DateInput(props) {

  let [show2, setshow2] = useState('')
 
  return (
    <div className='dateinput'>
      
        <div className='dateinput_select_box'>
          <div className='dateinput_content'>소그룹/반</div>
          <div className='dateinput_content'>
            <select className='dateinput_select_dep'
              onChange={(e)=>{ let copy = e.target.value; 
                              console.log(copy);
                              setshow2(copy);
                              }}>
              <option>선택</option>
              {props.학년소그룹ko.map((a,i)=>{return (<option>{props.학년소그룹ko[i]}</option>)})}  
            </select>
          </div>
        </div>
        {/* <div className={classnames('dep_main_personlist', {show2: show2 === `${props.학년소그룹ko[0]}`})}>
          {props.personlist1.map((a,i)=>{return (<div>{props.personlist1[i]}</div>)})}</div> */}
        {/* <div className={classnames('dep_main_personlist', {show2: show2 === `${props.학년소그룹ko[1]}`})}>
          {props.personlist2.map((a,i)=>{return (<div>{props.personlist2[i]}</div>)})}</div>
        <div className={classnames('dep_main_personlist', {show2: show2 === `${props.학년소그룹ko[2]}`})}>
          {props.personlist3.map((a,i)=>{return (<div>{props.personlist3[i]}</div>)})}</div> */}
      
          <button className='dep_agebutton' 
          onClick={()=>{
              console.log(props.person)
              }}> 테스트 </button>  

    </div>
  );
}

export default DateInput;
