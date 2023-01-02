/*eslint-disable*/
import './Reset.css';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import Dep1 from './dep/Dep1';
import DateInput from './depcommon/DateInput';
import NameAdd from './depcommon/NameAdd';
import GroupAdd from './depcommon/GroupAdd';
import Login from './depcommon/Login';
import LastReport from './report/LastReport';
import Uplord from './report/Uplord';


function App() {

  let state = useSelector((state) => { return state } )
  let navigate = useNavigate();

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={
          
          <div className='App_main'>
            <div className='maintitle'>주일학교 출석 관리</div>
            <div className='dep_box'>
              {state.부서이름.map((a, i)=>{
                  return (
                    <div className='dep_list' onClick={()=>{navigate(`/dep/${i+1}`)}}><p>{state.부서이름[i]}</p></div>           
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
            </div>
          </div>
          }/>

          
          <Route path="/login" element={<Login></Login>}/>

          <Route path="/dep/1" element={<Dep1></Dep1>}/>
         
          <Route path="/dateinput" element={<DateInput></DateInput>}/>
          <Route path="/nameadd" element={<NameAdd></NameAdd>}/>
          <Route path="/groupadd" element={<GroupAdd></GroupAdd>}/>


          <Route path="/lastreport" element={<LastReport></LastReport>}/>
          <Route path="/uplord" element={<Uplord></Uplord>}/>

        </Routes>
     
    </div>
    
  );

}


export default App;

