import { useState } from 'react';
import React from 'react';
import html2canvas from 'html2canvas';
import './Result.css';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios'


function Result(props) {

  let navigate = useNavigate();
  let 출석 = [1,2,3,4,5,6,7,8,9,10]
  let 결석자관리 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
    21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
    41,42,43,44,45,46,47,48]

  let arr = {
    부서: props.부서, 년: props.년, 월 : props.월, 일 : props.일, 째주 : props.째주, 
    예배기도자 : props.예배기도자, 설교본문 : props.설교본문, 설교자: props.설교자, 설교제목: props.설교제목,
    헌금 : props.헌금, 반 : props.반, 학년 : props.학년, 재적 : props.재적, 총계 : props.총계,
    출석1 : props.출석1, 출석1합계 : props.출석1합계,
    출석2 : props.출석2, 출석2합계 : props.출석2합계,
    출석3 : props.출석3, 출석3합계 : props.출석3합계,
    결석 : props.결석,
  }
  sessionStorage.setItem("arr", JSON.stringify(arr));

  let storage = JSON.parse(sessionStorage.getItem('arr'))

  return (
    <div class='result' id='result'>
      
      <span className="result부서">{storage.부서}</span>
      <span className="result날짜 년">{storage.년}</span>
      <span className="result날짜 월">{storage.월}</span>
      <span className="result날짜 일">{storage.일}</span>
      <span className="result날짜 째주">{storage.째주}</span>
    
      <span className="result예배 예배기도자">{storage.예배기도자}</span>
      <span className="result예배 설교본문">{storage.설교본문}</span>
      <span className="result예배 설교자" >{storage.설교자}</span>
      <span className="result예배 설교제목">{storage.설교제목}</span>

      {
        [1,2,3,4].map((a)=>{
          return (
            <span className={"result헌금 헌금" + a}>{storage.헌금[a]}</span>      
          )
        })
      }
      <span className="result헌금 합계">{props.헌금합계}</span>

      {
        [1,2,3,4,5,6,7,8,9,10].map((a)=>{
          return (
            <span className={"result출석-반 출석-반" + a}>{storage.반[a]}</span>      
          )
        })
      }
      
      {
        [1,2,3].map((a)=>{
          return (
            <span className={"result학년 세_" + a}>{storage.학년[a]}</span>      
          )
        })
      }
      
      {
        출석.map((a)=>{
          return (
            <span className={"result출석1 출석1-" + a}>{storage.출석1[a]}</span>      
          )
        })
      }
      <span className="result출석1 출석1-11">{storage.출석1합계}</span>

      {
        출석.map((a)=>{
          return (
            <span className={"result출석2 출석2-" + a}>{storage.출석2[a]}</span>      
          )
        })
      }
      <span className="result출석2 출석2-11">{storage.출석2합계}</span>

      {
        출석.map((a)=>{
          return (
            <span className={"result출석3 출석3-" + a}>{storage.출석3[a]}</span>      
          )
        })
      }
      <span className="result출석3 출석3-11">{storage.출석3합계}</span>

      <span className="result출석총원-재적">{storage.재적}</span>
      <span className="result출석총원-계">{storage.총계}</span>

     {
        결석자관리.map((a)=>{
          return (
              <span className={"result결석자 결석_" + a}>{storage.결석[a]}</span>
          )
        })
      } 

     <button class="button3 captureButton" onClick={()=>{
              html2canvas(document.querySelector('#result')).then((canvas)=>{ //document에서 body 부분을 스크린샷을 함.
                drawImg(canvas.toDataURL('image/png')); //canvas 결과값을 drawImg 함수를 통해서 결과를 canvas 넘어줌.
                saveAs(canvas.toDataURL(),`${props.year}년${props.month}월${props.day}일 ${props.부서}.png`); 
              }).catch(function (err) {
                console.log(err);
              })
              axios.post('/uplord', {
                month : storage.월,
                day : storage.일,
                dep : storage.부서,
                num : storage.총계
              }).then((결과)=>{
                alert(결과.data)})
              .catch(()=>{console.log('실패함')})

            }}>업로드&<br></br>
              캡처하기</button>

     <button class="button3 uplordButton2" onClick={()=>{
             navigate('/lastreport/lastresult')
            }}>출석현황보기</button>

      <button class="button3 modifyButton" onClick={()=>{
            navigate('/lastreport/modify')
            }}>수정하기</button>

      <button class="button3 newButton" onClick={()=>{
              navigate('/lastreport')
            }}>다시작성하기</button>

    </div>
  )
}


function drawImg(imgData) {
  return new Promise(function reslove() { //내가 결과 값을 그릴 canvas 부분 설정
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); //canvas의 뿌려진 부분 초기화
    var imageObj = new Image();
    imageObj.onload = function () {
    ctx.drawImage(imageObj, 10, 10); //canvas img를 그리겠다.
    };
    imageObj.src = imgData; //그릴 image데이터를 넣어준다.
  }, function reject() {});
}

function saveAs(uri, filename) {
  var link = document.createElement('a');
  if (typeof link.download === 'string') {
  link.href = uri;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  } else {
  window.open(uri);
  }
}


export default Result;