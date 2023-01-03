import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios'
import './Uplord.css';
import { useMemo, useState } from 'react';
import data from './data.js';
import $ from "jquery";


function Uplord () {
  
  let navigate = useNavigate();
  let [storage, setstorage] = useState(data)

  useMemo(()=>{ return (
    axios.get('/uplord').then((결과)=>{
      let copy = [...결과.data]
      setstorage(copy)
    })
  ) }, [])

  let [render, setRender] = useState('1')

  
     
  return (
    <div className='inner'>
      <div className='title'>반야월교회 주일학교</div>
      <div className='title'>출석현황</div>

      <div className='titlebox'>
        <div className='tablebox'>
          <div className='box'>날짜</div>
          <div className='boxline'></div>
          <div className='box'>부서</div>
          <div className='boxline'></div>
          <div className='box2'>출석</div>
          <div className='boxline'></div>
          <div className='delete'>삭제</div>
        </div>
      </div>
         
      <div className='repeatbox'>
        {
          storage.map((a, i)=>{
            return (
              <div id={`box${i}`} className='tablebox'>
                <div className='box'>{storage[i].date}</div>
                <div className='boxline'></div>
                <div className='box'>{storage[i].title}</div>
                <div className='boxline'></div>
                <div className='box2'>{storage[i].number}</div>
                <div className='boxline'></div>
                <div className='delete'>
                  <button className='button4 deleteButton'
                  onClick={(e)=>{
                      axios.delete('/delete', {
                        data : { 
                          date : storage[i].date,
                          title : storage[i].title,
                          number : storage[i].number
                        }
                      }).then((결과)=>{console.log('전송완료')})
                      .catch(()=>{console.log('실패함')})
                      
                      $(`#box${i}`).fadeOut();
                      
                    }}>삭제</button>
                </div>
              </div>
            )
          })
        } 

      </div>  

      <button class="button5 homeButton" onClick={()=>{
            navigate('/')
            }}>처음으로</button>

    </div>
  )

}

export default Uplord;
