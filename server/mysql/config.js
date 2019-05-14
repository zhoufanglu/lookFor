const mysql = require('mysql');
const option = {
  host: 'localhost',
  user: 'root',
  password: 'l568767199',
  database: 'lookfor',
}

//创建连接池
const pool = mysql.createPool(option)

//封装
var query=function(sql,options,callback){
  pool.getConnection(function(err,conn){
    if(err){
      callback(err,null,null);
    }else{
      conn.query(sql,options,function(err,results,fields){
        //释放连接
        conn.release();
        //事件驱动回调
        callback(err,results,fields);
      });
    }
  });
};
/*query("select * from now_location;", [1], function(err,results,fields){
  console.log(41,results)
});*/
export default query;