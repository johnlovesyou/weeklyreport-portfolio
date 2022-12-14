/*eslint-disable*/
import { React, useMemo, useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { useSelector } from "react-redux"
import axios from 'axios';
import classnames from 'classnames';
import './NameModify.css'
import Basicdepmain from './Basicdepmain.js';
import Basicgroup from './Basicgroup.js';
import Basicgroup2 from './Basicgroup2.js';

function NameModify(props) {

  let state = useSelector((state) => { return state } )
  let navigate = useNavigate();

  useMemo(()=>{ return (
    axios.get('/namemodify').then((결과)=>{
      console.log(결과.data)
      let copy = [...결과.data]
      setdep(copy)
    }),
    axios.get('/dep/1').then((결과)=>{
      console.log(결과.data)
      let copy = [...결과.data]
      setgroup1(copy)
    }),
    axios.get('/dep/3').then((결과)=>{
      console.log(결과.data)
      let copy = [...결과.data]
      setgroup3(copy)
    })
  ) }, [])


  
  

  let [show, setshow] = useState('')

  // 부서이름선택
  let [dep, setdep] = useState(Basicdepmain)
  let copy = dep.map(e => e.depname_main)
  let depcopy = [...new Set(copy)]
  
  // 각부서 그룹이름 선택
  let [depname, setdepname] = useState('')
  let [group1, setgroup1] = useState(Basicgroup)
  let group1_copy = group1.map(e => e.groupname)
  let group1_depcopy = [...new Set(group1_copy)]

  let [group3, setgroup3] = useState(Basicgroup2)
  let group3_copy = group3.map(e => e.groupname)
  let group3_depcopy = [...new Set(group3_copy)]


  // 명단추가 박스
  let [newid, setnewid] = useState('')
  let [newgroup, setnewgroup] = useState('')
  let [newgroupname, setnewgroupname] = useState('')

  

  var depnamechange = (dep) => {
    if (dep == 'dep1') {return '영유아2부'} 
    else if (dep == 'dep2') {return '영유아3부'}
    else if (dep == 'dep3') {return '유치2부'}
  };

  var depshowchange = (dep) => {
    if (dep == '영유아2부') {return '1'} 
    else if (dep == '유치2부') {return '3'}
  };

  var depchange_reverse = (dep) => {
    if (dep == '영유아2부') {return '1'} 
    else if (dep == '유치2부') {return '3'}
  };


  var groupchange_reverse = (group) => {
    for (var i = 1; i < 101; i++) {
      for (var a = 1; a < 11; i++) {
        group == i;
        return `${i}_${a}`
      }
      
    }

    // if () {return '1_1'} 
    // else if (group == '1-2') {}
    // else if (group == '1-3') {return '1_3'}
    // else if (group == '1-4') {return '1_4'}
    // else if (group == '1-5') {return '1_5'}
    // else if (group == '1-6') {return '1_6'}
    // else if (group == '1-7') {return '1_7'}
    // else if (group == '1-8') {return '1_8'}
    // else if (group == '1-9') {return '1_9'}
    // else if (group == '1-10') {return '1_10'}
    
    
  };


  return (
    <div className='nameinput'>


      {/* 상단 선택 박스 */}
      <div className='nameinput_wrapper'>

        {/* 각부서 선택 */}
          <div className='nameinput_box1'>
            <div className='nameinput_content'></div>
            <div className='nameinput_content choice'>선택</div>
          </div>

          <div className='nameinput_box2'>
            <div className='nameinput_content'>부서</div>
            <div className='nameinput_content'>
              <select className='nameinput_select_dep'
                onChange={(e)=>{
                let copy = e.target.value
                setdepname(copy)
                let showdata = depshowchange(copy)
                setshow(showdata)
              }}>
                <option>부서</option>
                {
                  depcopy.map((a,i)=>{
                    return (
                    <option>{depnamechange(depcopy[i])}</option>
                    )
                  })
                }  
              </select>
            </div>
          </div>

        {/* 각부서 그룹이름 선택 */}

          <div className='nameinput_box3'>
            <div className='nameinput_content'>소그룹/반</div>
            <div className='nameinput_content'>
              <div className='nameinput_notice'>
            
                {/* 영유아2부 */}
                <div className={classnames('nameinput_notice_wrapper', {show: show ==='1'})}>
                  <select className='nameinput_select_group' 
                    onChange={(e)=>{
                      let copy = e.target.value
                      console.log(copy)
                      setnewgroup(copy)
                    }}>
                    <option>{depname}</option>
                    {
                      group1_depcopy.map((a,i)=>{
                        return (
                        <option>{group1_depcopy[i]}</option>
                        )
                      })
                    }  
                  </select>
                </div>
        
                {/* 유치2부 */}
                <div className={classnames('nameinput_notice_wrapper', {show: show ==='3'})}>
                  <select className='nameinput_select_group'
                    onChange={(e)=>{
                      let copy = e.target.value
                      console.log(copy)
                      setnewgroup(copy)
                    }}>
                    <option>{depname}</option>
                    {
                      group3_depcopy.map((a,i)=>{
                        return (
                        <option>{group3_depcopy[i]}</option>
                        )
                      })
                    }  
                  </select>
                </div>
    
              </div> 

            </div>
          </div>
      </div>

      

      {/* 명단 추가 박스 */}
      <div className='nameinput_input'>
        <input type="text" className="input_none" onChange={(e)=>{setnewid(e.target.value)}}/>
        
        <div className='nameinput_inputbox'>
          <div className='text'>소그룹/반</div>
          <input type="text" className="input" value={newgroup} onChange={(e)=>{setnewgroup(e.target.value)}}/>
        </div>
        <div className='nameinput_inputbox'>
          <div className='text'>이름</div>
          <input type="text" className="input" onChange={(e)=>{setnewgroupname(e.target.value)}}/>
        </div>   
      </div>


      <button className='nameinput_button' 
        onClick={()=>{
        axios.post('/namemodify', {
          depnumber : depchange_reverse(depname),
          newgroup : groupchange_reverse(newgroup),
          newgroupname : newgroupname,
        }).then((결과)=>{})
        .catch(()=>{
          console.log('실패함')
        })
        navigate('/')
      }}>입력하기</button>



      <button className='nameinput_button' 
        onClick={()=>{
          navigate('/')
        }}
      >돌아가기</button> 

      <button className='test_button' 
        onClick={()=>{
          console.log(newgroup)
        }}
      >테스트</button>

      
  

    </div>
  );
}

export default NameModify;