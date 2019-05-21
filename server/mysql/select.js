//import query from './config'
//暂时废弃
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
  async getAllNowLocation(){
    let rows = await query("select * from now_location;")
      //console.log(18,results)
      /*return new Promise(function(resolve) {
        setTimeout(function(){
          resolve(results);
        },10)
      })*/
      return rows;
  }
}
let sqlFn = new SqlFn()
export default sqlFn

