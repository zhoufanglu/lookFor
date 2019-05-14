import conn from './config'

class SqlFn {
  constructor(){

  }
  //获取所有当前地区
  getAllNowLocation(){
    conn.query('select * from now_location;',  (error, results,) =>{
      console.log('The solution is: ', results);
    });
  }
}
let sqlFn = new SqlFn()
export default sqlFn