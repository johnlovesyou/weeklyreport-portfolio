import { React, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'


function Login(props) {

  let navigate = useNavigate();

  let [이름, set이름] = useState('');
  let [비번, set비번] = useState('');

  return (
    <div className='login'>
      <div className='login_main_wrapper'>

        <div className='login_input_wrapper'>
          <div className='login_box1'>
            <div className='login_content'>아이디</div>
            <div className='login_content'>
              <input className='login_content_input' type='text' onChange={(e)=>{set이름(e.target.value)}}></input>
            </div>
          </div>

          <div className='login_box2'>
            <div className='login_content'>비밀번호</div>
            <div className='login_content'>
              <input className='login_content_input' type='password' onChange={(e)=>{set비번(e.target.value)}}></input>
            </div>
          </div>

        </div>

        <button className='login_button' 
            onClick={()=>{
              axios.post('/login', {
              username : 이름,
              password : 비번
            }).then((결과)=>{
              alert(결과.data)
              if (결과.data === "로그인 성공!") {
                navigate('/nameadd')
              } 
            })
            .catch((error)=>{
              console.log(error)
            })
          }}>로그인</button>

          <button className='home_button' 
            onClick={()=>{
              navigate('/')
          }}>뒤로가기</button>

        

      </div>
    </div>
  );
}

export default Login;
