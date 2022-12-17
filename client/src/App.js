/*eslint-disable*/
import { useState } from 'react';
import './Reset.css';
import './App.css';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { useSelector } from "react-redux"
import Dep1 from './dep/Dep1';
import Dep3 from './dep/Dep3';
import DateInput from './dep/DateInput';
import NameAdd from './dep/NameAdd';
import LastReport from './pages/LastReport';
import Uplord from './pages/Uplord';
import GroupAdd from './dep/GroupAdd';

function App() {

  let state = useSelector((state) => { return state } )
  let navigate = useNavigate();

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={
          
          <div>
            <div className='maintitle'>주일학교 출석 관리</div>

            <div className='dep_box'>
              {
                state.부서이름.map((a, i)=>{
                  return (
                    <div className='dep_list' onClick={()=>{navigate(`/dep/${i+1}`)}}><p>{state.부서이름[i]}</p></div>           
                  )
                })
              }
            </div>

            <div className='dep_buttonbox'>

              <button className='link_lastreport' onClick={()=>{
              navigate('/lastreport')
              }}> 보고서 </button>

              <button className='link_namemodify' onClick={()=>{
              navigate('/nameadd')
              }}> 이름입력&삭제 </button>  


            </div>


          </div>
          }/>

          


          <Route path="/dep/1" element={<Dep1></Dep1>}/>
          <Route path="/dep/3" element={<Dep3></Dep3>}/>
          
          <Route path="/dateinput" element={<DateInput></DateInput>}/>

          <Route path="/lastreport" element={<LastReport></LastReport>}/>
          <Route path="/uplord" element={<Uplord></Uplord>}/>


          <Route path="/nameadd" element={<NameAdd></NameAdd>}/>

          <Route path="/groupadd" element={<GroupAdd></GroupAdd>}/>
         

        </Routes>
     
    </div>
    
  );

}


export default App;

