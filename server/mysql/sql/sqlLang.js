/**
 * 用户注册
 */
export const userSQL = {
  insert(userName,password){
    console.log(6666, userName)
    return `INSERT INTO User(userName,password) VALUES('${userName}','${password}');` // 插入数据
  },
  //drop: 'DROP TABLE User', // 删除表中所有的数据
  queryAll: 'SELECT * FROM User', // 查找表中所有数据
  getUserByNickname(userName){
    return `SELECT * FROM User WHERE username ='${userName}';`
  },
  login(userName,password){
    return `SELECT * from User WHERE username='${userName}' and password='${password}';`
  },
	getUserInfo (){
		return `SELECT * FROM User`
	}
}

/**
 *
 * 个人信息
 */
export const personalSQL = {
  insert(req){
    return `INSERT INTO person (user_id,surname,name,sex,before_location,now_location,date_of_birth) 
    VALUES(
    '${req.userId}',
    '${req.surname}',
    '${req.name}',
    '${req.sex}',
    '${req.beforeLocation}',
    '${req.nowLocation}',
    '${req.dateOfBirth}
    );` // 插入数据
  },
  search(userId){
    return `SELECT * FROM person WHERE user_id=${userId};`
  },
  update(){

  }
}


/**
 * 文件内容
 */

export const fileSQL ={
  insert(req){
    return `INSERT INTO File (name,size,type)
    VALUES ${req};` // 插入数据
  },
  search(number){
    return `SELECT * FROM File LIMIT 0,${number};`
  },
  del(ids){
    return `DELETE FROM File where id in (${ids});`
  },
  delAll(){
    return 'DELETE FROM File;'
  },
  searchAll(){
    return `SELECT * FROM File;`
  },
}

/**
 * 七牛云文件内容
 */

export const qiniuFileSQL ={
  insert(req){
    return `INSERT INTO QiniuFile (qiniuHash,qiniuKey)
    VALUES ${req};` // 插入数据
  },
  search(number){
    return `SELECT * FROM QiniuFile;`
  },
  del(ids){
    return `DELETE FROM File where id in (${ids});`
  },
  delAll(){
    return 'DELETE FROM QiniuFile;'
  },
  searchAll(){
    return `SELECT * FROM QiniuFile;`
  },
}
