/**
 * 注册
 */
const userSQL = {
  insert: 'INSERT INTO user(userName,PASSWORD) VALUES(?,?);', // 插入数据
  //drop: 'DROP TABLE User', // 删除表中所有的数据
  queryAll: 'SELECT * FROM user', // 查找表中所有数据
  getUserByNickname(userName){
    return `SELECT * FROM User WHERE username ='${userName}';`
  }
}

export default userSQL;