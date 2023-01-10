/*eslint-disable*/
import './Reset.css';
import './App.css';
import { React, useMemo, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import axios from 'axios'
import Dep1 from './dep/Dep1';
import Dep2 from './dep/Dep2';
import Dep3 from './dep/Dep3';
import Dep4 from './dep/Dep4';
import Dep5 from './dep/Dep5';
import Dep6 from './dep/Dep6';
import Dep7 from './dep/Dep7';
import Dep8 from './dep/Dep8';
import Dep9 from './dep/Dep9';
import Dep10 from './dep/Dep10';
import NameAdd from './depcommon/NameAdd';
import GroupAdd from './depcommon/GroupAdd';
import Login from './depcommon/Login';
import Report from './report/Report';
import Basicinfo from './depdatabasic/Basicinfo'

function App() {

  let state = useSelector((state) => { return state } )
  let navigate = useNavigate();

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
        <Route path="/dep/2" element={<Dep2></Dep2>}/>
        <Route path="/dep/3" element={<Dep3></Dep3>}/>
        <Route path="/dep/4" element={<Dep4></Dep4>}/>
        <Route path="/dep/5" element={<Dep5></Dep5>}/>
        <Route path="/dep/6" element={<Dep6></Dep6>}/>
        <Route path="/dep/7" element={<Dep7></Dep7>}/>
        <Route path="/dep/8" element={<Dep8></Dep8>}/>
        <Route path="/dep/9" element={<Dep9></Dep9>}/>
        <Route path="/dep/10" element={<Dep10></Dep10>}/>
        

        <Route path="/nameadd" element={<NameAdd></NameAdd>}/>
        <Route path="/groupadd" element={<GroupAdd></GroupAdd>}/>

        <Route path="/lastreport/*" element={<Report></Report>}/>

      </Routes>
     
    </div>
    
  );

}


export default App;

