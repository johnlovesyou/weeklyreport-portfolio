import React from 'react';
import './Report.css';
import { useNavigate } from 'react-router-dom';

function Modify(props) {

  let navigate = useNavigate();
  let 출석 = [1,2,3,4,5,6,7,8,9,10,11]
    
  let storage = JSON.parse(sessionStorage.getItem('arr'))

  return (

    <div className='mainwrapper'>
      <div className='main'>
        <div className='inputs'>
          <input type="text" className="부서" defaultValue={storage.부서} onChange={(e)=>{props.부서변경(e.target.value)}}/>
              
          <input type="text" className="날짜 년" defaultValue={storage.년} onChange={(e)=>{props.년변경(e.target.value)}}/>
          <input type="text" className="날짜 월" defaultValue={storage.월} onChange={(e)=>{props.월변경(e.target.value)}}/>
          <input type="text" className="날짜 일" defaultValue={storage.일} onChange={(e)=>{props.일변경(e.target.value)}}/>
          <input type="text" className="날짜 째주" defaultValue={storage.째주} onChange={(e)=>{props.째주변경(e.target.value)}}/>

          <input type="text" className="예배 예배기도자" defaultValue={storage.예배기도자} onChange={(e)=>{props.예배기도자변경(e.target.value)}}/>
          <input type="text" className="예배 설교본문" defaultValue={storage.설교본문} onChange={(e)=>{props.설교본문변경(e.target.value)}}/>
          <input type="text" className="예배 설교자" defaultValue={storage.설교자} onChange={(e)=>{props.설교자변경(e.target.value)}}/>
          <input type="text" className="예배 설교제목"  defaultValue={storage.설교제목} onChange={(e)=>{props.설교제목변경(e.target.value)}}/>

          {/* 헌금 input */}
          {
            [1,2,3,4].map((a)=>{
              return (
                <input type="text" className={"헌금 헌금" + a} 
                defaultValue={storage.헌금[a]}
                onInput={(e)=>{let copy = {...props.헌금}; copy[a] = e.target.value; props.헌금변경(copy)}}
                ></input>      
              )
            })
          }
          <input type="text" className="헌금 합계" value={props.헌금합계}></input>
          

          {/* 출석현황 줄 - 반 */}
          {
            [1,2,3,4,5,6,7,8,9,10,11].map((a)=>{
              return (
                <input type="text" className={"출석-반 출석-반" + a}
                defaultValue={storage.반[a]}
                onInput={(e)=>{let copy = {...props.반}; copy[a] = e.target.value; props.반변경(copy)}}
                ></input>      
              )
            })
          }

          <input type="text" className="학년_세-1" defaultValue={storage.학년[1]} 
            onInput={(e)=>{let copy = {...props.학년}; copy[1] = e.target.value; props.학년변경(copy)}}/>
          <input type="text" className="학년_세-2 green" defaultValue={storage.학년[2]} 
            onInput={(e)=>{let copy = {...props.학년}; copy[2] = e.target.value; props.학년변경(copy)}}/>
          <input type="text" className="학년_세-3" defaultValue={storage.학년[3]} 
            onInput={(e)=>{let copy = {...props.학년}; copy[3] = e.target.value; props.학년변경(copy)}}/>


          <input type="text" className="출석총원-재적" defaultValue={storage.재적} onChange={(e)=>{props.재적변경(e.target.value)}}/>
          <input type="text" className="출석총원-계" defaultValue={storage.총계} onChange={(e)=>{props.총계변경(e.target.value)}}/>



          {/* 출석현황 출석1 */}
          {
            출석.map((a, i)=>{
              return (
                <input type="text" className={"출석1 출석1-" + a}
                defaultValue={storage.출석1[i]}
                onInput={(e)=>{let copy = {...props.출석1}; copy[i] = e.target.value; props.출석1변경(copy)}}
                ></input>      
              )
            })
          }
          <input type="text" className="출석1 출석1-12" value={props.출석1합계}></input>


          {/* 출석현황 출석2 */}
          {
            출석.map((a, i)=>{
              return (
                <input type="text" className={"출석2 출석2-" + a + " green"}
                defaultValue={storage.출석2[i]}
                onInput={(e)=>{let copy = {...props.출석2}; copy[i] = e.target.value; props.출석2변경(copy)}}
                ></input>      
              )
            })
          }
          <input type="text" className="출석2 출석2-12" value={props.출석2합계}/>

          {/* 출석현황 출석3 */}
          {
            출석.map((a, i)=>{
              return (
                <input type="text" className={"출석3 출석3-" + a}
                defaultValue={storage.출석3[i]}
                onInput={(e)=>{let copy = {...props.출석3}; copy[i] = e.target.value; props.출석3변경(copy)}}
                ></input>      
              )
            })
          }
          <input type="text" className="출석3 출석3-12" value={props.출석3합계}/>
        </div> 
      </div>

        {/* 결석 박스*/}
        <div className='결석자박스'>
        {
          props.결석자명단.map((a, i)=>{
            return (
              <div className='결석자박스리스트'>
                <input type="text" className="소그룹"
                defaultValue={storage.결석자명단[i].dag_ko}
                onInput={(e)=>{let copy = {...props.소그룹}; copy[i+1] = e.target.value; props.소그룹변경(copy)}}
                ></input>
                <input type="text" className="결석자"
                defaultValue={storage.결석자명단[i].n}
                onInput={(e)=>{let copy = {...props.결석자}; copy[i+1] = e.target.value; props.결석자변경(copy)}}
                ></input>
                <input type="text" className="사유"
                onInput={(e)=>{let copy = {...props.사유}; copy[i+1] = e.target.value; props.사유변경(copy)}}
                ></input>
              </div>
            )
          })
        }
        </div>
        <div className='report_footer'>
          <button class="button2 savebutton" onClick={()=>{
            navigate('/lastreport/result')
          }}>저장하기</button>
        </div>
        
      
    </div>
  )
}


export default Modify;