import { React, useState }  from "react";
import { useSelector } from "react-redux"
import "./Date.css"

function Date(props) {
  
  let state = useSelector((state) => { return state } )

  return (
    <div className="Date">
      <div className="Date_table1">
        <div className="Date_empty"></div>
        <table>
          <tr>
            <td className="Date_group">소그룹/반</td>
            <td className="Date_name">이름</td>
          </tr>
        </table>
      </div>
      <div className="Date_table2">
        <table>
          <tr>
            {
              state.일요일.map((a,i)=>{
                return (
                  <td className="date">{state.일요일[i]}</td>      
                )
              })
            }
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Date;