/*eslint-disable*/
import { useState } from 'react';
import './Reset.css';
import './App.css';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { useSelector } from "react-redux"
import Dep1 from './dep/Dep1';
import NameInput from './dep/NameInput';
import LastReport from './pages/LastReport';
import Uplord from './pages/Uplord';

function App() {

  let state = useSelector((state) => { return state } )
  let navigate = useNavigate();

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={
          
          <div>
            <div className='maintitle'>주일학교 출석 관리</div>

            <button className='link_lastreport' onClick={()=>{
            navigate('/lastreport')
             }}> 보고서 </button>


            <div className='dep_box'>
              {
                state.부서이름.map((a, i)=>{
                  return (
                    <div className='dep_list' onClick={()=>{navigate(`/dep${i+1}`)}}><p>{state.부서이름[i]}</p></div>           
                  )
                })
              }
            </div>

            

          </div>
          }/>

          


          <Route path="/dep1" element={<Dep1></Dep1>}/>
          <Route path="/nameinput" element={<NameInput></NameInput>}/>

          <Route path="/lastreport" element={<LastReport></LastReport>}/>
          
          <Route path="/uplord" element={<Uplord></Uplord>}/>

        </Routes>
     
    </div>
    
  );

}


export default App;

