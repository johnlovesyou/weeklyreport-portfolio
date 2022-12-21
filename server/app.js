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


///////////// 로그인
app.post('/login', function(요청, 응답) {
  var username = 요청.body.username;
  var password = 요청.body.password;
  if (username && password) {
      db.query('SELECT * FROM user WHERE username = ? AND password = ?'
      , [username, password], function(error, result, fields) {
        if (error) throw error;
        if (result.length > 0) {
          응답.send("로그인 성공!");
          응답.end();
        } else {              
          응답.send("로그인 정보가 일치하지 않습니다.");
        }            
      });
  } else {        
      응답.send("username과 password를 입력하세요!");    
      응답.end();
  }
});


// dep부서.1학년.get //
app.get('/dep/:id', function(요청, 응답) {
  var id = 요청.params.id
  console.log(id)
  var command = `
    (select * from d${id}_a1 inner join d${id}_a1_g1 on d${id}.dgn = d${id}_a1_g1.gn)
    union
    (select * from d${id}_a1 inner join d${id}_a1_g2 on d${id}.dgn = d${id}_a1_g2.gn)
    union
    (select * from d${id}_a1 inner join d${id}_a1_g3 on d${id}.dgn = d${id}_a1_g3.gn)
    union
    (select * from d${id}_a1 inner join d${id}_a1_g4 on d${id}.dgn = d${id}_a1_g4.gn)
    union
    (select * from d${id}_a1 inner join d${id}_a1_g5 on d${id}.dgn = d${id}_a1_g5.gn)
    order by dgn`
    db.query(command, function (error, result) {if (error) {console.log(error);} 응답.send(result) 
  });  
})

// depmain.get //
app.get('/depmain', function(요청, 응답) {
  db.query(`
  (select dmain.dn_main, dn_ko, dan, dan_ko from dmain inner join d1 on dmain.dn_main = d1.dn)
  union
  (select dmain.dn_main, dn_ko, dan, dan_ko from dmain inner join d3 on dmain.dn_main = d3.dn)
  order by dn_main
  `, function (error, result) {if(error) {console.log(error);} 응답.send(result) });
})

app.get('/depmain/1', function(요청, 응답) {
  db.query(`
  (select d1.dn, d1.dn_ko, dan, dan_ko, dgn, dgn_ko from d1 inner join d1_a1 on d1.dan = d1_a1.an)
  union
  (select d1.dn, d1.dn_ko, dan, dan_ko, dgn, dgn_ko from d1 inner join d1_a2 on d1.dan = d1_a2.an)
  union
  (select d1.dn, d1.dn_ko, dan, dan_ko, dgn, dgn_ko from d1 inner join d1_a3 on d1.dan = d1_a3.an)
  order by dgn
  `, function (error, result) {if(error) {console.log(error);} 응답.send(result) });
})
// d1 이랑 d1_a1 & d1_a2 & d1_a3 합치기
// (select d1.dn, d1.dn_ko, dan, dan_ko, dgn, dgn_ko from d1 inner join d1_a1 on d1.dan = d1_a1.an)
//  union
// (select d1.dn, d1.dn_ko, dan, dan_ko, dgn, dgn_ko from d1 inner join d1_a2 on d1.dan = d1_a2.an)
//  union
// (select d1.dn, d1.dn_ko, dan, dan_ko, dgn, dgn_ko from d1 inner join d1_a3 on d1.dan = d1_a3.an)
// order by dgn

// d3 이랑 d3_a1 & d3_a2 & d3_a3 합치기
// (select d3.dn, d3.dn_ko, dan, dan_ko, dgn, dgn_ko from d3 inner join d3_a1 on d3.dan = d3_a1.an)
//  union
// (select d3.dn, d3.dn_ko, dan, dan_ko, dgn, dgn_ko from d3 inner join d3_a2 on d3.dan = d3_a2.an)
//  union
// (select d3.dn, d3.dn_ko, dan, dan_ko, dgn, dgn_ko from d3 inner join d3_a3 on d3.dan = d3_a3.an)
// order by dgn

// nameadd.post //
app.post('/nameadd', function(요청, 응답){
  var d_number = 요청.body.d_number;
  var g_number = 요청.body.g_number;
  var dg_number = 요청.body.dg_number;
  var new_n = 요청.body.new_n;
  db.query(`
  INSERT IGNORE INTO d${d_number}_g${g_number} (gn, n) VALUES ('${dg_number}', '${new_n}')
  `,function(error, result){
  if (error) {throw error}
  if (result.affectedRows > 0) {            
    응답.send("입력 성공!");
    응답.end();
  } else {
    응답.send("중복된 이름이 있거나 입력 정보가 올바르지 않습니다.");  
  }  
  })
});

// groupadd.post //
app.post('/groupadd', function(요청, 응답){
  var body = 요청.body
  db.query(`
  INSERT IGNORE INTO d${body.dep} (dgn, dgn_ko) values ('${body.g_num}', '${body.new_gn}')
  `,function(error, result){
  if (error) {throw error}
  if (result.affectedRows > 0) {            
    응답.send("입력 성공!");
    응답.end();
  } else {
    응답.send("중복된 이름이 있거나 입력 정보가 올바르지 않습니다.");  
  }  
  })
});


// dateinput
app.post('/dateinput', function(요청, 응답){
  console.log(요청.body);
  var id = 요청.body.id
  var day = 요청.body.day
  var dep = 요청.body.dep
  var depgroup = 요청.body.depgroup
  var name = 요청.body.name
  db.query(`
  UPDATE d${dep}_g${group} SET day${day} = '1' WHERE (name = '${name}');
   `,
    function(error, result){
  if(error){
    throw error;
  }
  })
});


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






// addnamemodify //
app.get('/addnamemodify', function(요청, 응답) { 
  db.query(`
  show tables  
  `
  , function (error, result) {
    if (error) {console.log(error);}
    응답.send(result)
  });
})

app.post('/addnamemodify', function(요청, 응답){
  console.log(요청.body);
  db.query(`
  ALTER TABLE ${요청.body.testname1} RENAME TO ${요청.body.testname2};`
  , function(error, result){if(error){throw error}})
});





app.use(express.static(path.join(__dirname, '/build')));
app.get('/', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/build/index.html'));
});
app.get('*', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/build/index.html'));
});


