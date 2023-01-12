const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('build'));
app.use(express.urlencoded({extended: true})) 

app.listen(8000, ()=>{
  console.log('server is running')
});

app.use(express.json());
var cors = require('cors');
const { json } = require('body-parser');
app.use(cors());


// 클라우드 업로드용 (naver)
var mysql = require('mysql');
var db = mysql.createPool({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : 'gksksla6985!',
  database : 'report'
});

// 내 컴퓨터 용
// var mysql = require('mysql');
// const { request } = require('https');
// var db = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'gksksla',
//   database : 'report'
// });
// db.connect();


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

// depmain.get //
app.get('/date', function(요청, 응답) {
  db.query(`
  select * from date
  `, function (error, result) {if(error) {console.log(error);} 응답.send(result) });
})

// info //
app.get('/info', function(요청, 응답) {
  db.query(`
  select * from info
  `, function (error, result) {if(error) {console.log(error);} 응답.send(result) });
})

// depage //
app.get('/depage', function(요청, 응답) {
  db.query(`
  select * from dep_age
  `, function (error, result) {if(error) {console.log(error);} 응답.send(result) });
})

// depage //
app.get('/depgroup', function(요청, 응답) {
  db.query(`
  select * from dep_group
  `, function (error, result) {if(error) {console.log(error);} 응답.send(result) });
})

// depmain.get //
app.get('/depmain', function(요청, 응답) {
  db.query(`
  (select dmain.dn, dmain.dn_ko, dan, dan_ko, dgn, dgn_ko from dmain inner join d1 on dmain.dan = d1.an)
  union
  (select dmain.dn, dmain.dn_ko, dan, dan_ko, dgn, dgn_ko from dmain inner join d2 on dmain.dan = d2.an)
  union
  (select dmain.dn, dmain.dn_ko, dan, dan_ko, dgn, dgn_ko from dmain inner join d3 on dmain.dan = d3.an)
  union
  (select dmain.dn, dmain.dn_ko, dan, dan_ko, dgn, dgn_ko from dmain inner join d4 on dmain.dan = d4.an)
  union
  (select dmain.dn, dmain.dn_ko, dan, dan_ko, dgn, dgn_ko from dmain inner join d5 on dmain.dan = d5.an)
  union
  (select dmain.dn, dmain.dn_ko, dan, dan_ko, dgn, dgn_ko from dmain inner join d6 on dmain.dan = d6.an)
  union
  (select dmain.dn, dmain.dn_ko, dan, dan_ko, dgn, dgn_ko from dmain inner join d7 on dmain.dan = d7.an)
  union
  (select dmain.dn, dmain.dn_ko, dan, dan_ko, dgn, dgn_ko from dmain inner join d8 on dmain.dan = d8.an)
  union
  (select dmain.dn, dmain.dn_ko, dan, dan_ko, dgn, dgn_ko from dmain inner join d9 on dmain.dan = d9.an)
  union
  (select dmain.dn, dmain.dn_ko, dan, dan_ko, dgn, dgn_ko from dmain inner join d10 on dmain.dan = d10.an)
  order by dgn
  `, function (error, result) {if(error) {console.log(error);} 응답.send(result) });
})




// dep부서.get //
app.get('/dep/:id', function(요청, 응답) {
  console.log(요청.params.id)
  var id = 요청.params.id
  var command = `
    (select * from d${id}_a1) 
    union
    (select * from d${id}_a2) 
    union
    (select * from d${id}_a3)
    order by dag
    `
    db.query(command, function (error, result) {if (error) {console.log(error);} 응답.send(result) 
  });  
})

// dateinput
app.post('/dateinput', function(요청, 응답){
  console.log(요청.body);
  var day = 요청.body.day
  var dep = 요청.body.dep
  var age = 요청.body.age
  var person = 요청.body.person
  var command = `
  update d${dep}_a${age} set 
  day${day} = case when n='${person[0]}' then '1' else day${day} end, 
  day${day} = case when n='${person[1]}' then '1' else day${day} end, 
  day${day} = case when n='${person[2]}' then '1' else day${day} end,
  day${day} = case when n='${person[3]}' then '1' else day${day} end, 
  day${day} = case when n='${person[4]}' then '1' else day${day} end, 
  day${day} = case when n='${person[5]}' then '1' else day${day} end,
  day${day} = case when n='${person[6]}' then '1' else day${day} end, 
  day${day} = case when n='${person[7]}' then '1' else day${day} end, 
  day${day} = case when n='${person[8]}' then '1' else day${day} end,
  day${day} = case when n='${person[9]}' then '1' else day${day} end, 
  day${day} = case when n='${person[10]}' then '1' else day${day} end,
  day${day} = case when n='${person[11]}' then '1' else day${day} end, 
  day${day} = case when n='${person[12]}' then '1' else day${day} end,
  day${day} = case when n='${person[13]}' then '1' else day${day} end, 
  day${day} = case when n='${person[14]}' then '1' else day${day} end, 
  day${day} = case when n='${person[15]}' then '1' else day${day} end,
  day${day} = case when n='${person[16]}' then '1' else day${day} end, 
  day${day} = case when n='${person[17]}' then '1' else day${day} end, 
  day${day} = case when n='${person[18]}' then '1' else day${day} end,
  day${day} = case when n='${person[19]}' then '1' else day${day} end, 
  day${day} = case when n='${person[20]}' then '1' else day${day} end
  where n in ('${person[0]}', '${person[1]}', '${person[2]}', 
  '${person[3]}', '${person[4]}', '${person[5]}', '${person[6]}', 
  '${person[7]}', '${person[8]}', '${person[9]}', '${person[10]}',
  '${person[11]}', '${person[12]}', 
  '${person[13]}', '${person[14]}', '${person[15]}', '${person[16]}', 
  '${person[17]}', '${person[18]}', '${person[19]}', '${person[20]}');
  `
  db.query(command, function(error, result){
  if (error) {throw error}
  if (result.affectedRows > 0) {            
    응답.send("입력 성공!");
    응답.end();
  } else {
    응답.send("중복된 이름이 있거나 입력 정보가 올바르지 않습니다.");  
  }  
  })
});

app.post('/datedelete', function(요청, 응답){
  console.log(요청.body);
  var day = 요청.body.day
  var dep = 요청.body.dep
  var age = 요청.body.age
  var person = 요청.body.person
  var command = `
  update d${dep}_a${age} set 
  day${day} = case when n='${person[0]}' then '0' else day${day} end, 
  day${day} = case when n='${person[1]}' then '0' else day${day} end, 
  day${day} = case when n='${person[2]}' then '0' else day${day} end,
  day${day} = case when n='${person[3]}' then '0' else day${day} end, 
  day${day} = case when n='${person[4]}' then '0' else day${day} end, 
  day${day} = case when n='${person[5]}' then '0' else day${day} end
  where n in ('${person[0]}', '${person[1]}', '${person[2]}', 
  '${person[3]}', '${person[4]}', '${person[5]}');
  `
  db.query(command, function(error, result){
  if (error) {throw error}
  if (result.affectedRows > 0) {            
    응답.send("입력 성공!");
    응답.end();
  } else {
    응답.send("중복된 이름이 있거나 입력 정보가 올바르지 않습니다.");  
  }  
  })
});

// nameadd.post //
app.post('/nameadd', function(요청, 응답){
  console.log(요청.body)
  var d_num = 요청.body.d_num;
  var a_num = 요청.body.a_num;
  var g_num = 요청.body.g_num;
  var g_ko = 요청.body.g_ko;
  var new_n = 요청.body.new_n;
  db.query(`
  INSERT IGNORE INTO d${d_num}_a${a_num} (dag, dag_ko, n) VALUES ('${d_num}-${a_num}-${g_num}', '${g_ko}', '${new_n}');
  `,function(error, result){
  if (error) {throw error}
  if (result.affectedRows > 0) {            
    응답.send("입력되었습니다!");
    응답.end();
  } else {
    응답.send("중복된 이름이 있거나 입력 정보가 올바르지 않습니다.");  
  }})
});

// namedelete //
app.post('/namedelete', function(요청, 응답){
  console.log(요청.body)
  var d_num = 요청.body.d_num;
  var a_num = 요청.body.a_num;
  var delete_n = 요청.body.delete_n;
  db.query(`
  delete from d${d_num}_a${a_num} where n = '${delete_n}';
  `,function(error, result){
  if (error) {throw error}
  if (result.affectedRows > 0) {            
    응답.send("삭제되었습니다!");
    응답.end();
  } else {
    응답.send("이름이 없거나 정보가 올바르지 않습니다.");  
  }})
});

// groupadd.post //
app.post('/groupadd', function(요청, 응답){
  console.log(요청.body)
  var d_num = 요청.body.d_num;
  var a_num = 요청.body.a_num;
  var g_numplus1 = 요청.body.g_numplus1;
  var new_gn = 요청.body.new_gn;
  db.query(`
  INSERT IGNORE INTO d${d_num} (an, dgn, dgn_ko) values ('${d_num}-${a_num}', '${d_num}-${a_num}-${g_numplus1}', '${new_gn}')
  `,function(error, result){
  if (error) {throw error}
  if (result.affectedRows > 0) {            
    응답.send("입력되었습니다!");
    응답.end();
  } else {
    응답.send("중복된 이름이 있거나 입력 정보가 올바르지 않습니다.");  
  }  
  })
});

// groupdelete //
app.post('/groupdelete', function(요청, 응답){
  console.log(요청.body)
  var d_num = 요청.body.d_num;
  var a_num = 요청.body.a_num;
  var delete_gn = 요청.body.delete_gn;
  db.query(`
  delete from d${d_num} where an = '${d_num}-${a_num}' and dgn_ko = '${delete_gn}';
  `,function(error, result){
  if (error) {throw error}
  if (result.affectedRows > 0) {            
    응답.send("삭제되었습니다!");
    응답.end();
  } else {
    응답.send("중복된 이름이 있거나 입력 정보가 올바르지 않습니다.");  
  }  
  })
});




// # report #

// depmain.get //
// app.get('/report', function(요청, 응답) {
//   db.query(`select * from info;
//   `, function (error, result) {if(error) {console.log(error);} 응답.send(result) });
// })

// app.get('/report', function(요청, 응답) {
//   db.query(`
//   SELECT n,day1 from d1_a1_g1 where day1=1;
//   `, function (error, result) {if(error) {console.log(error);} 응답.send(result) });
// })

// result.부서별총계입력
app.post('/uplord', function(요청, 응답){
  console.log(요청.body)
  var month = 요청.body.month;
  var day = 요청.body.day;
  var dep = 요청.body.dep;
  var num = 요청.body.num;
  db.query(`
  UPDATE result SET ${dep} = ${num} WHERE month = '${month}' and day = '${day}';
  `,function(error, result){
  if (error) {throw error}
  if (result.affectedRows > 0) {            
    응답.send("업로드되었습니다!");
    응답.end();
  } else {
    응답.send("입력 정보가 올바르지 않습니다.");
  }  
  })
});

// result출력
app.get('/lastresult', function(요청, 응답) {
  db.query('SELECT * FROM result', function (error, result) {
    if (error) {console.log(error);}
    응답.send(result)
  });
})

// 합계출력
app.get('/resultsum', function(요청, 응답) {
  db.query(`
  SELECT sum(영유아2부)+sum(영유아3부)+sum(유치2부)+sum(유치3부)+sum(유년2부)
  +sum(유년3부)+sum(초등2부)+sum(초등3부)+sum(중등부)+sum(고등부)
  FROM result where month='1' and day='1';
  `, function (error, result) {
    if (error) {console.log(error);}
    응답.send(result)
  });
})











app.use(express.static(path.join(__dirname, '/build')));
app.get('/', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/build/index.html'));
});
app.get('*', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/build/index.html'));
});


