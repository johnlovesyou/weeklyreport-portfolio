/*eslint-disable*/
import { React, useState, useMemo }  from "react";
import { useSelector } from "react-redux"
import "./Deptable.css"
import axios from 'axios'
import $ from 'jquery'

function Deptable(props) {

  return (

    <div className='dep_wrapper'>

      <div className="dep_agenamebox">
        <div className="dep_empty"></div>
        <div className="dep_group"><div>{props.dep1}</div></div>
        <div className="dep_name">
            {
            props.group.map((a,i)=>{
              return (
                <div className="dep_namebox"><div>{props.group[i].n}</div></div>
              )})
            }
        </div> 
      </div>

      <div className='dep_nametablebox'>
        {
          props.group.map((a,i)=>{
            return (
              <div className='dep_nametableboxwrapper'>
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
                      <td className={"dep_deptable_date color_" + props.group[i].day11}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day12}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day13}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day14}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day15}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day16}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day17}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day18}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day19}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day20}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day21}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day22}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day23}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day24}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day25}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day26}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day27}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day28}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day29}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day30}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day31}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day32}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day33}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day34}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day35}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day36}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day37}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day38}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day39}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day40}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day41}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day42}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day43}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day44}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day45}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day46}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day47}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day48}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day49}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day50}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day51}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day52}></td>
                      <td className={"dep_deptable_date color_" + props.group[i].day53}></td>
                    </tr>
                  </table>
                </div>
              </div>
            )
          })
        }
      </div>


     
      
    </div>
    
  );
}

export default Deptable;