import e from 'cors';
import React from 'react';
import "./Stats.css"

function Stats(props) {

  
  let stats1 = props.부서.filter(e => e.day1 === '1')
  let stats2 = props.부서.filter(e => e.day2 === '1')
  let stats3 = props.부서.filter(e => e.day3 === '1')
  
  
  

  return (
    <div className="Stats">
      <div className="Stats_table1">
        <div className="Stats_empty"></div>
        <table>
          <tr>
            <td className="Stats_group"></td>
            <td className="Stats_name">통계</td>
          </tr>
        </table>
      </div>
      <div className="Stats_table2">
        <table>
          <tr>
            {/* {
              props.date.map((a,i)=>{
                return (
                  <td className="date">{stats_ft(`${i+1}`)}</td>
                )
              })
            } */}
          </tr>
        </table>

        <button className='dep_homebutton' onClick={()=>{
                console.log(test);
                }}> test </button> 
      </div>
    </div>
  );
}

export default Stats;