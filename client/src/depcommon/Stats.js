import e from 'cors';
import React from 'react';
import "./Stats.css"

function Stats(props) {

  return (
    <div className="Stats">
      <div className="Stats_table1">
        <div className="Stats_empty"></div>
        <table>
          <tr>
            <td className="Stats_group">{props.나이}</td>
            <td className="Stats_name">통계</td>
          </tr>
        </table>
      </div>
      <div className="Stats_table2">
        <table>
          <tr>
            {
              props.date.map((a,i)=>{
                return (
                  <td className="date">{props.부서통계.filter(e => eval("e.day"+(i+1)) === '1').length}</td>
                )
              })
            }
          </tr>
        </table>
        
      </div>
    </div>
  );
}

export default Stats;