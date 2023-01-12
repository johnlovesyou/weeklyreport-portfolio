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
import Basicgroup from '../depdatabasic/Basicgroup'

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
    }),
    axios.get(`/depage`).then((결과)=>{ 
      console.log(결과.data)
      let copy = [...결과.data]
      setdepage(copy)
    }),
    axios.get(`/depgroup`).then((결과)=>{ 
      console.log(결과.data)
      let copy = [...결과.data]
      setdepgroup(copy)
    })
  ) }, [])
  let [date_data, setdate_data] = useState(BasicDatedata)
  let [date_id, setdate_id] = useState('')
  let [date_month, setdate_month] = useState('')
  let [date_day, setdate_day] = useState('')
  let [info, setinfo] = useState('')
  let [부서data, set부서data] = useState(Basicgroup)
  let [depage, setdepage] = useState('')
  let [depgroup, setdepgroup] = useState('')


  var date_ft = (ds) => {
    let result = [];
    let copy = date_data.filter(e => e.date === `${ds}`);
    let copy2 = copy[0].month;
    result.push(copy2);
    let copy3 = copy[0].day
    result.push(copy3);
    return result
  }
  
  var date_ft2 = (ds) => {
    let copy = date_data.filter(e => e.date === `${ds}`);
    let result = copy[0].id;
   return result
  }

  let y_copy = 부서data.map(e => e.da)
  let y_n = [...new Set(y_copy)] // ['1-1', '1-2', '1-3']

  var 소그룹별출석인원_출석1 = (dn) => {
    let dep_da = 부서data.filter(e => e.da === `${dn}`)
    let dag_num_copy = dep_da.map(e => e.dag)
    let dag_num = [...new Set(dag_num_copy)]
    let result1 = {...출석1}
    let 부서출석 = 부서data.filter(e => eval("e.day"+(`${date_id}`)) === '1')  
    for (var i = 0; i < 11; i++) {
      let copy = 부서출석.filter(e => e.dag === `${dag_num[i]}`).length
      if (copy > 0) {
        result1[i] = (copy);      
      } else {
        result1[i] = '';
      }
    }
    출석1변경(result1)
    return result1
  }
  var 소그룹별출석인원_출석2 = (dn) => {
    let dep_da = 부서data.filter(e => e.da === `${dn}`)
    let dag_num_copy = dep_da.map(e => e.dag)
    let dag_num = [...new Set(dag_num_copy)]
    let result2 = {...출석2}
    let 부서출석 = 부서data.filter(e => eval("e.day"+(`${date_id}`)) === '1')  
    for (var i = 0; i < 11; i++) {
      let copy = 부서출석.filter(e => e.dag === `${dag_num[i]}`).length
      if (copy > 0) {
        result2[i] = (copy);      
      } else {
        result2[i] = '';
      }
    }
    출석2변경(result2)
    return result2
  }
  var 소그룹별출석인원_출석3 = (dn) => {
    let dep_da = 부서data.filter(e => e.da === `${dn}`)
    let dag_num_copy = dep_da.map(e => e.dag)
    let dag_num = [...new Set(dag_num_copy)]
    let result3 = {...출석3}
    let 부서출석 = 부서data.filter(e => eval("e.day"+(`${date_id}`)) === '1')  
    for (var i = 0; i < 11; i++) {
      let copy = 부서출석.filter(e => e.dag === `${dag_num[i]}`).length
      if (copy > 0) {
        result3[i] = (copy);      
      } else {
        result3[i] = '';
      }
    }
    출석3변경(result3)
    return result3
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

  let [출석1, 출석1변경] = useState({1:'', 2:'', 3:'', 4:'', 5:'', 6:'', 7:'', 8:'', 9:'', 10:'', 11:''})
  let [출석1합계] = useState('')
  let sum1 = 0; for (var i = 0; i < 11; i++) {sum1 += parseInt(출석1[i] || 0)} 출석1합계 = sum1;
  
  let [출석2, 출석2변경] = useState({1:'', 2:'', 3:'', 4:'', 5:'', 6:'', 7:'', 8:'', 9:'', 10:'', 11:''})
  let [출석2합계] = useState('')
  let sum2 = 0; for (var i = 0; i < 11; i++) {sum2 += parseInt(출석2[i] || 0)} 출석2합계 = sum2;
  
  let [출석3, 출석3변경] = useState({1:'', 2:'', 3:'', 4:'', 5:'', 6:'', 7:'', 8:'', 9:'', 10:'', 11:''})
  let [출석3합계] = useState('')
  let sum3 = 0; for (var i = 0; i < 11; i++) {sum3 += parseInt(출석3[i] || 0)} 출석3합계 = sum3;
  
  let [총계, 총계변경] = useState('')
  총계 = parseInt(출석1합계 || 0)+parseInt(출석2합계 || 0)+parseInt(출석3합계 || 0)
  let 출석 = [1,2,3,4,5,6,7,8,9,10,11]
  
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

                    axios.get(`/dep/${i+1}`).then((결과)=>{ 
                      console.log(결과.data)
                      let copy = [...결과.data]
                      set부서data(copy)
                    })

                    학년변경(depage[i])
                    반변경(depgroup[i])
                    부서변경(info[i].dep)
                    설교자변경(info[i].ministry)
                    재적변경(info[i].all_num)
                    
                  }}>{state.부서info[i].dep}</button>
                )
              })
            }
          </div>

          {/* 날짜선택 */}
          <div className='report_dateselect_wrapper'>
            <div className='report_dateselect_text1'>날짜선택</div>
            <select className='report_dateselect_box'
              onChange={(e)=>{
                    let copy = e.target.value; 
                    let copy2 = date_ft(copy);
                    let copy3 = date_ft2(copy);
                    setdate_month(copy2[0]);
                    setdate_day(copy2[1]);
                    setdate_id(copy3);
                  }}>
              <option>선택</option>
              {  date_data.map((a,i)=>{return (<option>{date_data[i].date}</option>)})}  
            </select>
            
          </div>
          <div className='report_dateselect_text2'>↓ 날짜를 선택하세요</div>
          

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
              [1,2,3,4,5,6,7,8,9,10,11].map((a)=>{
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
                    defaultValue={출석1[i]}
                    onInput={(e)=>{ let copy = {...출석1}; copy[i] = e.target.value; 출석1변경(copy)}}
                  >{}</input>      
                )
              })
            }
            <input type="text" className="출석1 출석1-12" value={출석1합계}></input>
            
            {/* 출석현황 출석2 */}
            {
              출석.map((a, i)=>{
                return (
                  <input type="text" className={"출석2 출석2-" + a + " green"}
                  defaultValue={출석2[i]}
                  onInput={(e)=>{let copy = {...출석2}; copy[i] = e.target.value; 출석2변경(copy)}}
                  ></input>      
                )
              })
            }
            <input type="text" className="출석2 출석2-12" value={출석2합계}/>

            {/* 출석현황 출석3 */}
            {
              출석.map((a, i)=>{
                return (
                  <input type="text" className={"출석3 출석3-" + a}
                  defaultValue={출석3[i]}
                  onInput={(e)=>{let copy = {...출석3}; copy[i] = e.target.value; 출석3변경(copy)}}
                  ></input>      
                )
              })
            }
            <input type="text" className="출석3 출석3-12" value={출석3합계}/>

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

          <button class="button2 resultButton" onClick={()=>{
            navigate('/lastreport/lastresult')
          }}>전체통계</button>

          <button class="button2 homeButton1" onClick={()=>{
            navigate('/')
          }}>Home</button>

          <button class="button2 statsButton" onClick={()=>{
            if (date_day === '' || date_day === '') {
              alert('날짜를 선택하세요')
            } else if (부서 === '') {
              alert('부서를 선택하세요')
            } else {
              소그룹별출석인원_출석1(`${y_n[0]}`)
              소그룹별출석인원_출석2(`${y_n[1]}`)
              소그룹별출석인원_출석3(`${y_n[2]}`)
            }
          }}>출석현황<br></br>불러오기</button>

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