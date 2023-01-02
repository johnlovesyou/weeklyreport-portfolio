/*eslint-disable*/
import { React }  from "react";
import "./Deptable.css"

function Deptable(props) {

  return (

    <div className='dep_wrapper'>

      <div className="dep_agenamebox">
        <div className="dep_empty"></div>
        <div className="dep_group"><div>{props.group}</div></div>
        <div className="dep_name">
            {
            props.person.map((a,i)=>{
              return (
                <div className="dep_namebox"><div>{props.person[i].n}</div></div>
              )})
            }
        </div> 
      </div>

      <div className='dep_nametablebox'>
        {
          props.person.map((a,i)=>{
            return (
              <div className='dep_nametableboxwrapper'>
                <div className="dep_deptable_table">
                  <table>
                    <tr>
                      <td className={"dep_deptable_date color_" + props.person[i].day1}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day2}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day3}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day4}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day5}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day6}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day7}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day8}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day9}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day10}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day11}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day12}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day13}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day14}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day15}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day16}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day17}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day18}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day19}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day20}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day21}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day22}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day23}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day24}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day25}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day26}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day27}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day28}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day29}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day30}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day31}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day32}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day33}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day34}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day35}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day36}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day37}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day38}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day39}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day40}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day41}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day42}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day43}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day44}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day45}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day46}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day47}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day48}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day49}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day50}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day51}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day52}></td>
                      <td className={"dep_deptable_date color_" + props.person[i].day53}></td>
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