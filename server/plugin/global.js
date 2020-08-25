const fs = require('fs')
const path = require('path')
/**
 *方法插件
 **/
export const analyticState =(state,msg,data)=>{
  return {
    state:state,
    msg:msg,
    data:data
  }
}

/**
 * 删除某一个包下面的需要符合格式的文件。
 * @param  {String} url  文件路径，绝对路径
 * @param  {String} name 需要删除的文件名称
 * @return {Null}
 * @author huangh 20170123
 */
export const delImgs= ({path='./img', names})=> {
  const imgs = names.split(',')
  imgs.forEach(fileName=>{
    fs.unlink(`${path}/${fileName}`, err=>{
      if(err){
        console.log(err)
      }else {
        console.log('删除成功')
      }
    })
  })
}

//删除整个文件夹
export function deleteAll(path) {
  let files = [];
  if(fs.existsSync(path)){
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      if(fs.statSync(curPath).isDirectory()){
        delDir(curPath); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
    fs.rmdirSync(path);
  }
}