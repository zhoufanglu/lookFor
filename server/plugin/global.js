const fs = require('fs-extra')
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
/*export function deleteAll(path) {
  fs.writeFile('img','',[options],callback)

}*/

// 清空文件夹
export async function emptyFile (path) {
  try {
    await fs.emptyDir(path)
    console.log('success!')
  } catch (err) {
    console.error(err)
  }
}