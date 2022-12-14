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
  const dep_id = 요청.params.id
  db.query(`
  (select * from dep${dep_id} inner join group${dep_id}_1 on dep${dep_id}.depgroupname = group${dep_id}_1.groupname)
  union
  (select * from dep${dep_id} inner join group${dep_id}_2 on dep${dep_id}.depgroupname = group${dep_id}_2.groupname)
  union
  (select * from dep${dep_id} inner join group${dep_id}_3 on dep${dep_id}.depgroupname = group${dep_id}_3.groupname)
  union
  (select * from dep${dep_id} inner join group${dep_id}_4 on dep${dep_id}.depgroupname = group${dep_id}_4.groupname)
  union
  (select * from dep${dep_id} inner join group${dep_id}_5 on dep${dep_id}.depgroupname = group${dep_id}_5.groupname)
  union
  (select * from dep${dep_id} inner join group${dep_id}_6 on dep${dep_id}.depgroupname = group${dep_id}_6.groupname)
  union
  (select * from dep${dep_id} inner join group${dep_id}_7 on dep${dep_id}.depgroupname = group${dep_id}_7.groupname)
  union
  (select * from dep${dep_id} inner join group${dep_id}_8 on dep${dep_id}.depgroupname = group${dep_id}_8.groupname)
  union
  (select * from dep${dep_id} inner join group${dep_id}_9 on dep${dep_id}.depgroupname = group${dep_id}_9.groupname)
  union
  (select * from dep${dep_id} inner join group${dep_id}_10 on dep${dep_id}.depgroupname = group${dep_id}_10.groupname)
  order by depgroupname`
  , function (error, result) {
    if (error) {console.log(error);}
    응답.send(result)
  });
})


// (select * from dep1 inner join group1_1 on dep1.depgroupname = group1_1.groupname)
// union
// (select * from dep1 inner join group1_2 on dep1.depgroupname = group1_2.groupname)
// union
// (select * from dep1 inner join group1_3 on dep1.depgroupname = group1_3.groupname)
// union
// (select * from dep1 inner join group1_4 on dep1.depgroupname = group1_4.groupname)
// union
// (select * from dep1 inner join group1_5 on dep1.depgroupname = group1_5.groupname)
// union
// (select * from dep1 inner join group1_6 on dep1.depgroupname = group1_6.groupname)
// union
// (select * from dep1 inner join group1_7 on dep1.depgroupname = group1_7.groupname)
// union
// (select * from dep1 inner join group1_8 on dep1.depgroupname = group1_8.groupname)
// union
// (select * from dep1 inner join group1_9 on dep1.depgroupname = group1_9.groupname)
// union
// (select * from dep1 inner join group1_10 on dep1.depgroupname = group1_10.groupname)
// order by depgroupname


// namemodify //
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


app.post('/namemodify', function(요청, 응답){
  console.log(요청.body);
  const depnumber = 요청.body.depnumber
  const group = 요청.body.newgroup;
  db.query(`INSERT INTO group${group} (groupname, name) VALUES (?, ?)`,
  [요청.body.newgroup, 요청.body.newgroupname]
  , function(error, result){if(error){throw error}})

  if (요청.body.depnumber == '1') {
  
  }
  else if (요청.body.depnumber == '3') {
    db.query(`INSERT INTO group${group} (groupname, name) VALUES (?, ?)`,
    [요청.body.newgroup, 요청.body.newgroupname]
    , function(error, result){if(error){throw error}})
  }
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

