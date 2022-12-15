const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('build'));
app.use(express.urlencoded({extended: true})) 

app.listen(8001, ()=>{
  console.log('server is running')
});

app.use(express.json());
var cors = require('cors');
const { json } = require('body-parser');
app.use(cors());

// 클라우드 업로드용 (naver)
// var mysql = require('mysql');
// var db = mysql.createPool({
//   host     : 'localhost',
//   port     : '3306',
//   user     : 'root',
//   password : 'gksksla6985!',
//   database : 'report'
// });

// 내 컴퓨터 용
var mysql = require('mysql');
const { request } = require('https');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'gksksla',
  database : 'report'
});
db.connect();


// dep //
app.get('/dep/:id', function(요청, 응답) {
  db.query(`
  (select * from dep${요청.params.id} inner join dep${요청.params.id}group1 on dep${요청.params.id}.depgroupname = dep${요청.params.id}group1.groupname)
  union
  (select * from dep${요청.params.id} inner join dep${요청.params.id}group2 on dep${요청.params.id}.depgroupname = dep${요청.params.id}group2.groupname)
  union
  (select * from dep${요청.params.id} inner join dep${요청.params.id}group3 on dep${요청.params.id}.depgroupname = dep${요청.params.id}group3.groupname)
  union
  (select * from dep${요청.params.id} inner join dep${요청.params.id}group4 on dep${요청.params.id}.depgroupname = dep${요청.params.id}group4.groupname)
  union
  (select * from dep${요청.params.id} inner join dep${요청.params.id}group5 on dep${요청.params.id}.depgroupname = dep${요청.params.id}group5.groupname)
  union
  (select * from dep${요청.params.id} inner join dep${요청.params.id}group6 on dep${요청.params.id}.depgroupname = dep${요청.params.id}group6.groupname)
  union
  (select * from dep${요청.params.id} inner join dep${요청.params.id}group7 on dep${요청.params.id}.depgroupname = dep${요청.params.id}group7.groupname)
  union
  (select * from dep${요청.params.id} inner join dep${요청.params.id}group8 on dep${요청.params.id}.depgroupname = dep${요청.params.id}group8.groupname)
  union
  (select * from dep${요청.params.id} inner join dep${요청.params.id}group9 on dep${요청.params.id}.depgroupname = dep${요청.params.id}group9.groupname)
  union
  (select * from dep${요청.params.id} inner join dep${요청.params.id}group10 on dep${요청.params.id}.depgroupname = dep${요청.params.id}group10.groupname)
  order by depgroupname`
  , function (error, result) {
    if (error) {console.log(error);}
    응답.send(result)
  });
})


// // namemodify //
app.get('/namemodify', function(요청, 응답) {
  db.query(`
  (select depmain.depname_main, depgroupname from depmain inner join dep1 on depmain.depname_main = dep1.depname)
  union
  (select depmain.depname_main, depgroupname from depmain inner join dep3 on depmain.depname_main = dep3.depname)
  order by depname_main
  `
  , function (error, result) {
    if (error) {console.log(error);}
    응답.send(result)
  });
})






// // namemodify //
// app.get('/namemodify', function(요청, 응답) {
//   db.query(`
//   (select depmain.depname_main, depgroupname from depmain inner join dep1 on depmain.depname_main = dep1.depname)
//   union
//   (select depmain.depname_main, depgroupname from depmain inner join dep3 on depmain.depname_main = dep3.depname)
//   order by depname_main
//   `
//   , function (error, result) {
//     if (error) {console.log(error);}
//     응답.send(result)
//   });
// })







app.post('/testnamemodify', function(요청, 응답){
  console.log(요청.body);
  db.query(`
  ALTER TABLE ${요청.body.testname1} RENAME TO ${요청.body.testname2}`
  , function(error, result){if(error){throw error}})
});






// app.post('/nameinput', function(요청, 응답){
//   console.log(요청.body);
//   db.query(`INSERT INTO group1_1 (dep, name, day1, day2, day3, day4, day5, day6, day7, day8, day9, day10)
//    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//   [요청.body.dep, 요청.body.name, 요청.body.day1, 요청.body.day2, 요청.body.day3, 요청.body.day4,
//     요청.body.day5, 요청.body.day6, 요청.body.day7, 요청.body.day8, 요청.body.day9, 요청.body.day10], 
//   function(error, result){
//   if(error){
//     throw error;
//   }
//   })
// });





app.delete('/dep_delete', function(요청, 응답) {
  console.log(요청.body);
  if (요청.body.groupname == '1-1') {
    db.query(`DELETE FROM group1_1
    WHERE id='${요청.body.id}' AND groupname='${요청.body.groupname}' AND name='${요청.body.name}'`,
    function(error, result){if(error){throw error;}})
  }
  else if (요청.body.groupname == '1-2') {
    db.query(`DELETE FROM group1_2
    WHERE id='${요청.body.id}' AND groupname='${요청.body.groupname}' AND name='${요청.body.name}'`,
    function(error, result){if(error){throw error;}})
  }
})







app.get('/uplord', function(요청, 응답) {
  db.query('SELECT * FROM result', function (error, result) {
    if (error) {console.log(error);}
    응답.send(result)
  });
})

app.post('/uplord', function(요청, 응답){
  console.log(요청.body);
  db.query(`INSERT INTO result (date, title, number) VALUES(?, ?, ?)`,
  [요청.body.date, 요청.body.title, 요청.body.number], 
  function(error, result){
  if(error){
    throw error;
  }
  })
});


app.delete('/delete', function(요청, 응답) {
  db.query(`DELETE FROM result 
  WHERE date='${요청.body.date}' AND title='${요청.body.title}' AND number='${요청.body.number}'`, 
  function(error, result){
    if(error){throw error;}
  })
})



app.use(express.static(path.join(__dirname, '/build')));
app.get('/', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/build/index.html'));
});
app.get('*', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/build/index.html'));
});

