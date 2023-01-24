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
                  <div className={"dep_deptable_date color_" + props.person[i].day1}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day2}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day3}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day4}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day5}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day6}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day7}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day8}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day9}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day10}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day11}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day12}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day13}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day14}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day15}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day16}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day17}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day18}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day19}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day20}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day21}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day22}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day23}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day24}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day25}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day26}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day27}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day28}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day29}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day30}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day31}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day32}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day33}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day34}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day35}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day36}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day37}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day38}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day39}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day40}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day41}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day42}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day43}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day44}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day45}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day46}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day47}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day48}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day49}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day50}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day51}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day52}></div>
                  <div className={"dep_deptable_date color_" + props.person[i].day53}></div>
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