const mysql = require('mysql');
const option = {
  host: '119.45.53.85',
  user: 'lookFor',
  password: 'w87dRTxBzSpwrEBA',
  database: 'lookFor',
}

//创建连接池
const pool = mysql.createPool(option)

let query = function( sql, values ) {
  // 返回一个 Promise
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          // 结束会话
          connection.release()
        })
      }
    })
  })
}
export default query;