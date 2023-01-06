/*eslint-disable*/
import './Reset.css';
import './App.css';
import { React, useMemo, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import axios from 'axios'
import Dep1 from './dep/Dep1';
import NameAdd from './depcommon/NameAdd';
import GroupAdd from './depcommon/GroupAdd';
import Login from './depcommon/Login';
import Report from './report/Report';
import Basicinfo from './depdatabasic/Basicinfo'

function App() {

  let state = useSelector((state) => { return state } )
  let navigate = useNavigate();

  useMemo(()=>{ return (
    axios.get(`/report`).then((결과)=>{ 
      console.log(결과.data)
      let copy = [...결과.data]
      setinfo(copy)
    })
  ) }, [])

  let [info, setinfo] = useState(Basicinfo)

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={
          
          <div className='App_main'>
            <div className='maintitle'>주일학교 출석 관리</div>
            <div className='dep_box'>
              { state.부서info.map((a, i)=>{
                  return (
                    <div className='dep_list' onClick={()=>{navigate(`/dep/${i+1}`)}}><p>{ state.부서info[i].dep}</p></div>           
                  )
                })}
            </div>
            <div className='dep_buttonbox'>
              <button className='link_lastreport' onClick={()=>{
              navigate('/lastreport')
              }}> 보고서 </button>
              <button className='link_login' onClick={()=>{
              navigate('/login')
              }}> 관리자 </button>  
              <button className='link_login' onClick={()=>{
              navigate('/lastreport/LastResult')
              }}> 출석현황 </button>  
            </div>
          </div>
          }/>

          
        <Route path="/login" element={<Login></Login>}/>

        <Route path="/dep/1" element={<Dep1></Dep1>}/>
        

        <Route path="/nameadd" element={<NameAdd></NameAdd>}/>
        <Route path="/groupadd" element={<GroupAdd></GroupAdd>}/>

        <Route path="/lastreport/*" element={<Report></Report>}/>

      </Routes>
     
    </div>
    
  );

}


export default App;

