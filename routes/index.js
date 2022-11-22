const express = require('express');
const router = express.Router();
const testjson = require('../json/test.json');
const mysqlConnect = require('../config/mysql');
const conn = mysqlConnect.init();
const bodyParser = require('body-parser');

router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/get/demo',function(req,res){
  res.json(req.query.young);
  //res.send(process.env.port);
});
/**
 * 게시글 추가
 */
router.post('/api/post/demo',function(req,res){ 
  var title = req.body.title;
  console.log("title : ",title);
  var content = req.body.content;
  console.log("content : ",content);
  const sql = 'insert into test_board(title,content) values (?,?)';
  var datas = [title,content];

  conn.query(sql,datas,function(err,rows){
    if(err){
      console.log("error로인해 게시글 등록이 실패 하였습니다.",err);
    }else{    
      console.log("게시글 등록 완료하였습니다.");
      res.json(req.body);
    }
  });
});
/**
 * 게시글 삭제
 */
router.delete('/api/delete/demo',function(req,res){
  const sql = "delete from test_board where no = ? ";
  let params = [];
  params.push(req.query.no);
  conn.query(sql,params,function(err,rows){
    if(err){
      console.log("error로인해 게시글 삭제가 실패 하였습니다.",err);
    }else{
      console.log("게시글 삭제 완료하였습니다.");
      res.json(rows);
    }
  });
});
/**
 * 게시글 조회
 */
router.get('/api/select/demo',function(req,res){
  const sql = "select * from test_board";
  conn.query(sql,function(err,rows){
    if(err){
      console.log("error로인해 게시글 조회가 실패 하였습니다.",err);
    }else{
      console.log("게시글 조회 완료하였습니다.");
      res.json(rows);
    }
  });
});
/**
 * 게시글 수정
 */
router.put('/api/update/demo',function(req,res){
  const sql = "update test_board set title=?,content=? where no=?";
  var no = req.body.no;
  var title = req.body.title;
  var content = req.body.content;
  var datas = [title,content,no];
  conn.query(sql,datas,function(err,rows){
    if(err){
      console.log("error로 인해 게시글 수정이 실패 하였습니다.",err);
    }else{
      console.log("게시글이 수정되었습니다.");
      res.json(rows);
        }
  })
})



module.exports = router;
