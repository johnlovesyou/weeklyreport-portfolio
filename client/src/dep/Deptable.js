import { React, useState, useMemo }  from "react";
import { useSelector } from "react-redux"
import "./Deptable.css"
import axios from 'axios'
import $ from 'jquery'

function Deptable(props) {

  return (

    <div className='dep_wrapper'>
        <div className="dep_agebox">
          <div className="dep_empty"></div>
          <div className="dep_group"><div>{props.dep1.group}</div></div>
        </div>
        <div className='dep_nametablebox'>
          {
            props.group.map((a,i)=>{
              return (
                <div id={`nametablebox${i}`} className='dep_nametableboxwrapper'>
                  <div className="dep_namebox"><p>{props.group[i].name}</p></div>
                  <div className="dep_tablebox">
                    <div className="dep_deptable">
                      <div className="dep_deptable_table">
                        <table>
                          <tr>
                            <td className={"dep_deptable_date color_" + props.group[i].day1}></td>
                            <td className={"dep_deptable_date color_" + props.group[i].day2}></td>
                            <td className={"dep_deptable_date color_" + props.group[i].day3}></td>
                            <td className={"dep_deptable_date color_" + props.group[i].day4}></td>
                            <td className={"dep_deptable_date color_" + props.group[i].day5}></td>
                            <td className={"dep_deptable_date color_" + props.group[i].day6}></td>
                            <td className={"dep_deptable_date color_" + props.group[i].day7}></td>
                            <td className={"dep_deptable_date color_" + props.group[i].day8}></td>
                            <td className={"dep_deptable_date color_" + props.group[i].day9}></td>
                            <td className={"dep_deptable_date color_" + props.group[i].day10}></td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>

                  <button onClick={()=>{
                  axios.delete('/dep_delete', {
                    data : { 
                      id : props.group[i].id,
                      groupname : props.group[i].groupname,
                      name : props.group[i].name,
                    }
                  }).then((결과)=>{console.log('전송완료')})
                  .catch(()=>{console.log('실패함')})
                  
                  $(`#nametablebox${i}`).fadeOut();
                  
                  }}>삭제</button>

                </div>
                
              )
            })
          }
        </div>
      </div>
    
  );
}

export default Deptable;