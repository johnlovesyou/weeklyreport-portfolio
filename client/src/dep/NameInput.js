import { React, useMemo, useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './NameInput.css'

function NameInput(props) {

  let navigate = useNavigate();

  let [id, setid] = useState('')
  let [dep, setdep] = useState('')
  let [name, setname] = useState('')
  let [day1, setday1] = useState('')
  let [day2, setday2] = useState('')
  let [day3, setday3] = useState('')
  let [day4, setday4] = useState('')
  let [day5, setday5] = useState('')
  let [day6, setday6] = useState('')
  let [day7, setday7] = useState('')
  let [day8, setday8] = useState('')
  let [day9, setday9] = useState('')
  let [day10, setday10] = useState('')


  const checkeditem = (value) => {
    if (value == true) {
      return 1
    } else if (value == false)
      return 0
  };


  return (
    <div className='nameinput'>
      
      <div className='nameinput_inputbox'>
        <input type="text" className="input_none" onChange={(e)=>{setid(e.target.value)}}/>
        <div>
          <div className='nameinput_text'>학년</div>
          <div><input type="text" className="input" onChange={(e)=>{setdep(e.target.value)}}/></div>
        </div>
        <div>
          <div className='nameinput_text'>이름</div>
          <div><input type="text" className="input" onChange={(e)=>{setname(e.target.value)}}/></div>
        </div>  
      </div>

      <button className='nameinput_button' 

        onClick={()=>{
        axios.post('/nameinput', {
          id : id,
          dep : dep,
          name : name,
        }).then((결과)=>{})
        .catch(()=>{
          console.log('실패함')
        })

        navigate('/dep1')

      }}>입력하기</button> 

    </div>
  );
}

export default NameInput;