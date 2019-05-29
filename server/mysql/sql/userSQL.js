/**
 * 注册
 */
const userSQL = {
  insert(userName,password){
    return `INSERT INTO user(userName,password) VALUES('${userName}','${password}');` // 插入数据
  },
  //drop: 'DROP TABLE User', // 删除表中所有的数据
  queryAll: 'SELECT * FROM user', // 查找表中所有数据
  getUserByNickname(userName){
    return `SELECT * FROM User WHERE username ='${userName}';`
  },
  login(userName,password){
    return `SELECT * from User WHERE username='${userName}' and password='${password}';`
  }
}

export default userSQL;