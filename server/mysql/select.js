import query from './config'
class SqlFn {
  constructor(){

  }

  /**
   *person
   */

  /**
   *now_location
   */
  //获取所有当前地区
  getAllNowLocation(){
    query("select * from now_location;", [1], function(err,results,fields){
      console.log(41,results)
    });
  }
}
let sqlFn = new SqlFn()
export default sqlFn

