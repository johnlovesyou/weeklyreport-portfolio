/*eslint-disable*/
import { React, useMemo, useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { useSelector } from "react-redux"
import axios from 'axios'
import './Report.css';
import Result from './Result';
import Modify from './Modify';
import LastResult from './LastResult';
import BasicDatedata from '../depdatabasic/BasicDatedata'

function Report(props) {
  
  let state = useSelector((state) => { return state } )
  let navigate = useNavigate();

  useMemo(()=>{ return (
    axios.get(`/date`).then((결과)=>{ 
      console.log(결과.data)
      let copy = [...결과.data]
      setdate_data(copy)
    }),
    axios.get(`/info`).then((결과)=>{ 
      console.log(결과.data)
      let copy = [...결과.data]
      setinfo(copy)
    })
  ) }, [])
  
  let [date_data, setdate_data] = useState(BasicDatedata)
  let [date_month, setdate_month] = useState('')
  let [date_day, setdate_day] = useState('')
  let [info, setinfo] = useState('')

  var date_ft = (ds) => {
    let result = [];
    let copy = date_data.filter(e => e.date === `${ds}`);
    let copy2 = copy[0].month;
    result.push(copy2);
    let copy3 = copy[0].day
    result.push(copy3);
    return result
  }

  const date = new Date();
  const year = date.getFullYear();

  let [년, 년변경] = useState(year)
  let [월, 월변경] = useState(date_month)
  let [일, 일변경] = useState(date_day)
  let [째주, 째주변경] = useState('')

  let [부서, 부서변경] = useState('')
  let [반, 반변경] = useState('')
  let [학년, 학년변경] = useState('')
  let [재적, 재적변경] = useState('')

  let [예배기도자, 예배기도자변경] = useState('')
  let [설교본문, 설교본문변경] = useState('')
  let [설교자, 설교자변경] = useState('')
  let [설교제목, 설교제목변경] = useState('')

  let [헌금, 헌금변경] = useState({1:'', 2:'', 3:'', 4:''})
  let [헌금합계, 헌금합계변경] = useState('')
  헌금합계 = parseInt(헌금[1] || 0)+parseInt(헌금[2] || 0)+parseInt(헌금[3] || 0)+parseInt(헌금[4] || 0)

  let [출석1, 출석1변경] = useState({1:'', 2:'', 3:'', 4:'', 5:'', 6:'', 7:'', 8:'', 9:'', 10:''})
  let [출석1합계] = useState('')
  let sum1 = 0; for (var i = 1; i < 11; i++) {sum1 += parseInt(출석1[i] || 0)} 출석1합계 = sum1;
  
  let [출석2, 출석2변경] = useState({1:'', 2:'', 3:'', 4:'', 5:'', 6:'', 7:'', 8:'', 9:'', 10:''})
  let [출석2합계] = useState('')
  let sum2 = 0; for (var i = 1; i < 11; i++) {sum2 += parseInt(출석2[i] || 0)} 출석2합계 = sum2;
  
  let [출석3, 출석3변경] = useState({1:'', 2:'', 3:'', 4:'', 5:'', 6:'', 7:'', 8:'', 9:'', 10:''})
  let [출석3합계] = useState('')
  let sum3 = 0; for (var i = 1; i < 11; i++) {sum3 += parseInt(출석3[i] || 0)} 출석3합계 = sum3;
  
  let [총계, 총계변경] = useState('')
  총계 = parseInt(출석1합계 || 0)+parseInt(출석2합계 || 0)+parseInt(출석3합계 || 0)
  let 출석 = [1,2,3,4,5,6,7,8,9,10]
  
  let 결석자관리 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
    21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
    41,42,43,44,45,46,47,48]
  
  let [결석, 결석변경] = useState({
    1:'', 2:'', 3:'', 4:'', 5:'', 6:'', 7:'', 8:'', 9:'', 10:'', 11:'', 12:'', 13:'', 14:'', 15:'', 16:'',
    17:'', 18:'', 19:'', 20:'', 21:'', 22:'', 23:'', 24:'', 25:'', 26:'', 27:'', 28:'', 29:'', 30:'', 31:'', 32:'',
    33:'', 34:'', 35:'', 36:'', 37:'', 38:'', 39:'', 40:'', 41:'', 42:'', 43:'', 44:'', 45:'', 46:'', 47:'', 48:'',
  })
  
 


  return (
    <div className='LastReport'>

    <Routes>
      <Route path="/" element={

        <div className='main'>
        
          {/* 부서 초기화 버튼 */}
          <div className='buttons'>
            {
              state.부서info.map((a, i)=>{
                return (
                  <button className='button1' onClick={()=>{

                    부서변경(state.부서info[i].dep)
                    설교자변경(info[i].ministry)
                    반변경(state.각부서반[i])
                    학년변경(state.각부서학년[i])
                    재적변경(info[i].all_num)
                    
                  }}>{state.부서info[i].dep}</button>
                )
              })
            }
          </div>

          <div className='report_dateselect_wrapper'>
            <div className='report_dateselect_text1'>날짜선택</div>
            <select className='report_dateselect_box'
              onChange={(e)=>{
                  let copy = e.target.value; 
                  let copy2 = date_ft(copy)
                  setdate_month(copy2[0])
                  setdate_day(copy2[1])
                  }}>
              <option>선택</option>
              {  date_data.map((a,i)=>{return (<option>{date_data[i].date}</option>)})}  
            </select>
            <div className='report_dateselect_text2'>← 날짜를 선택하세요</div>
          </div>

          

          <div className='inputs'>
            <input type="text" className="부서" defaultValue={부서} />
            
            <input type="text" className="날짜 년" defaultValue={year} onChange={(e)=>{년변경(e.target.value)}}/>
            <input type="text" className="날짜 월" defaultValue={date_month} onChange={(e)=>{월변경(e.target.value)}}/>
            <input type="text" className="날짜 일" defaultValue={date_day} onChange={(e)=>{일변경(e.target.value)}}/>
            <input type="text" className="날짜 째주" onChange={(e)=>{째주변경(e.target.value)}}/>

            <input type="text" className="예배 예배기도자" onChange={(e)=>{예배기도자변경(e.target.value)}}/>
            <input type="text" className="예배 설교본문" onChange={(e)=>{설교본문변경(e.target.value)}}/>
            <input type="text" className="예배 설교자" defaultValue={설교자} onChange={(e)=>{설교자변경(e.target.value)}}/>
            <input type="text" className="예배 설교제목" onChange={(e)=>{설교제목변경(e.target.value)}}/>

            {/* 헌금 input */}
            {
              [1,2,3,4].map((a)=>{
                return (
                  <input type="text" className={"헌금 헌금" + a}
                  onInput={(e)=>{let copy = {...헌금}; copy[a] = e.target.value; 헌금변경(copy)}}
                  ></input>      
                )
              })
            }
            <input type="text"  className="헌금 합계" value={헌금합계}></input>


            {/* 출석현황 줄 - 반 */}
            {
              [1,2,3,4,5,6,7,8,9,10].map((a)=>{
                return (
                  <input type="text" className={"출석-반 출석-반" + a}
                  defaultValue={반[a]}
                  ></input>      
                )
              })
            }

            <input type="text" className="학년_세-1" defaultValue={학년[1]}/>
            <input type="text" className="학년_세-2 green" defaultValue={학년[2]}/>
            <input type="text" className="학년_세-3" defaultValue={학년[3]}/>

            {/* 출석현황 출석1 */}
            {
              출석.map((a, i)=>{
                return (
                  <input type="text" className={"출석1 출석1-" + a}
                    defaultValue={출석1[a]}
                    onInput={(e)=>{ let copy = {...출석1}; copy[a] = e.target.value; 출석1변경(copy)}}
                  >{}</input>      
                )
              })
            }
            <input type="text" className="출석1 출석1-11" value={출석1합계}></input>
            
            {/* 출석현황 출석2 */}
            {
              출석.map((a)=>{
                return (
                  <input type="text" className={"출석2 출석2-" + a + " green"}
                  defaultValue={출석2[a]}
                  onInput={(e)=>{let copy = {...출석2}; copy[a] = e.target.value; 출석2변경(copy)}}
                  ></input>      
                )
              })
            }
            <input type="text" className="출석2 출석2-11" value={출석2합계}/>

            {/* 출석현황 출석3 */}
            {
              출석.map((a)=>{
                return (
                  <input type="text" className={"출석3 출석3-" + a}
                  defaultValue={출석3[a]}
                  onInput={(e)=>{let copy = {...출석3}; copy[a] = e.target.value; 출석3변경(copy)}}
                  ></input>      
                )
              })
            }
            <input type="text" className="출석3 출석3-11" value={출석3합계}/>

            <input type="text" className="출석총원-재적" defaultValue={재적} />
            <input type="text" className="출석총원-계" value={총계}/>

            {/* 결석 */}
            {
              결석자관리.map((a)=>{
                return (
                  <input type="text" className={"결석자 결석_" + a}
                  onInput={(e)=>{let copy = {...결석}; copy[a] = e.target.value; 결석변경(copy)}}
                  ></input>      
                )
              })
            } 

            
          </div>

          <button class="button2 savebutton" onClick={()=>{
            if (date_day === '' || date_day === '') {
              alert('날짜를 선택하세요')
            } else {
              navigate('/lastreport/result')
            }
          }}>저장하기</button>

          <button class="button2 uplordButton1" onClick={()=>{
            navigate('/lastreport/lastresult')
          }}>출석현황보기</button>

          <button class="button2 homeButton1" onClick={()=>{
            navigate('/')
          }}>Home</button>

        </div>
        }/>

        <Route path="/result" element={
          <Result 
            년={년} 월={date_month} 일={date_day} 째주={째주}
            부서={부서} 
            예배기도자={예배기도자} 설교본문={설교본문} 설교자={설교자} 설교제목={설교제목}
            헌금={헌금} 헌금합계={헌금합계}
            반={반} 학년={학년}
            출석1합계={출석1합계} 출석2합계={출석2합계} 출석3합계={출석3합계}
            출석1={출석1} 출석2={출석2} 출석3={출석3} 
            재적={재적} 총계={총계}
            결석={결석}
          ></Result>
        }/>

        
        <Route path="/modify" element={
          <Modify
            부서변경={부서변경} 년변경={년변경} 월변경={월변경} 일변경={일변경} 째주변경={째주변경}
            예배기도자변경={예배기도자변경} 설교본문변경={설교본문변경} 
            설교자변경={설교자변경} 설교제목변경={설교제목변경}
            헌금={헌금}
            헌금변경={헌금변경} 헌금합계변경={헌금합계변경}
            반={반} 학년={학년}
            반변경={반변경} 학년변경={학년변경} 재적변경={재적변경} 총계변경={총계변경}
            
            출석1합계={출석1합계} 출석2합계={출석2합계} 출석3합계={출석3합계}
            출석1변경={출석1변경} 출석2변경={출석2변경} 출석3변경={출석3변경} 
            출석1={출석1} 출석2={출석2} 출석3={출석3} 
            결석={결석} 결석변경={결석변경}
        ></Modify>}/> 


        <Route path="/lastresult" element={<LastResult></LastResult>}/> 

      </Routes>
    </div>
  );
}

export default Report;