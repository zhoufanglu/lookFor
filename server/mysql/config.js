const mysql = require('mysql');
const option = {
  host: 'localhost',
  user: 'root',
  password: 'l568767199',
  database: 'lookfor',
  connectTimeout: 5000,//连接超时
  //multipleStatements: false,//是否允许一个query中包含多条sql语句
  insecureAuth : true
}
const conn = mysql.createConnection(option);

conn.connect();

export default conn;