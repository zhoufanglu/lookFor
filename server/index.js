const express = require('express')//框架
const bodyParser = require('body-parser')//解析post参数
const cors = require('cors')//解决跨域
//token
const jwt = require('jsonwebtoken')//引入jwt

/**********************文件上传***********************/
const multer = require('multer')// multer文件处理
const fs = require('fs')

//import sqlFn from './mysql/select'
import query from './mysql/config'//数据库封装

import checkApiToken from './plugin/check_api_token'


//引入userSQL语句
import {userSQL, personalSQL, fileSQL} from './mysql/sql/sqlLang'

//引入公用方法插件
import {analyticState, delImgs, emptyFile} from './plugin/global'

const app = express()

//七牛云上传token
import uploadToken from "./plugin/qiniu";

//解析application/json
app.use(bodyParser.json());

//设置文件上传路径
const upload = multer({
  dest: './img'
})


app.use(cors()) //解决跨域
app.use(upload.any()) //处理上传的文件

app.listen(8002, () => {
  console.log('服务启动')
})

let loginState = 'user'

//拦截器
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");//允许所有跨域请求
  next() //向下执行
  /*if(req.method=="OPTIONS") res.send(200);/!*让options请求快速返回*!/
  else  next();*/
})

/**
 * 登录
 * @type {boolean}
 */
app.post('/login', async (req, res) => {
  loginState = req.body.loginState
  let sendItem = {}
  if (req.body.loginState === 'user') {
    const user = await query(userSQL.login(req.body.username, req.body.password))
    if (user.length === 0) {
      sendItem = analyticState('err', '账号密码错误！', req.body)
    } else {
      const userInfo = await query(userSQL.getUserByNickname(req.body.username))
      //创建密钥
      const token = jwt.sign({username: req.body.username}, 'my_token'/*, {expiresIn: '2h'}*/)
      sendItem = analyticState('success', '登录成功', {
        token: token,
        userInfo: userInfo[0]
      })
    }
  } else if (req.body.loginState === 'visitor') {
    sendItem = analyticState('success', '游客登录成功', '游客')
  }

  res.json(sendItem)
})

//屏蔽不需要token的接口
const withoutName = ['register', 'test', 'getUserInfo', '/tool/uploadImg']
app.use((req, res, next) => {
  let isNeedToken = false
  const index = withoutName.findIndex(i => {
    return (req.originalUrl).includes(i)
  })
  isNeedToken = !index === -1
  //console.log(76, isNeedToken)
  if (loginState === 'user' && isNeedToken) {
    checkApiToken(req, res, next)
  } else {
    next()
  }
  //console.log(63,req.originalUrl)
})


app.get('/test', (req, res) => {
  console.log(26, res.json('test111'))
  /*return res.json({
    query:req.query,
    data:req.params,
    params:req.body
  })*/
})

/*app.get('/wx_test',(req,res)=>{
  let jscode2session = ''
  console.log('wx_test',req.query)
  app.get('https://api.weixin.qq.com/sns/jscode2session?appid=wx1e0f04d4ff8eb1ac&secret=80c24ecb16c43f78f243c02edeeef237\n' +
    '80c24ecb16c43f78f243c02edeeef237&js_code='+req.query+'&grant_type=authorization_code',(req,res)=>{
    jscode2session = res
    console.log(39,res)
  })
  res.json(jscode2session)
  console.log(43,jscode2session)
})*/


//console.log(33,sqlFn.getAllNowLocation())
//console.log(33,SqlFn)

//sqlFn.getAllNowLocation()

/**
 * 获取现代省份
 */
//console.log(57,sqlFn.getAllNowLocation())
app.post('/getNowLocation', async (req, res) => {
  // 现在
  const rows = await query('select * from now_location;')
  //res.header({"Content-Type":"application/x-www-form-urlencoded"});
  res.json({
    code: 200,
    msg: '请求成功',
    data: rows
  })
})

/**
 * 注册
 */
app.post('/register', async (req, res) => {
  //console.log(79,sqlLang.getUserByNickname('admin'))
  const userInfo = await query(userSQL.getUserByNickname(req.body.username))
  //先判断有没有注册过
  //console.log(50,userInfo)
  let sendItem = {}
  if (userInfo.length === 0) {
    console.log(97, userSQL.insert(req.body.username, req.body.password))
    const insertUser = await query(userSQL.insert(req.body.username, req.body.password))
    sendItem = analyticState('success', '注册成功', req.body)
    //console.log(99,insertUser)
  } else {
    sendItem = analyticState('err', '该用户名已经存在', userInfo)
  }
  //若没有，注册成功
  res.json(sendItem)
})

/**
 * 获取用户账号密码
 */
app.get('/getUserInfo', async (req, res) => {
  const password = req.query.password
  if (password === '123456') {
    const userInfo = await query(userSQL.getUserInfo())
    res.json(analyticState('success', '获取成功', userInfo))
    //res.send('aaaa')
    /*res.writeHead( 400, 'Current password does not match', {'content-type' : 'text/plain'});
    res.end( 'Current value does not match');

    return*/
  }
})
/**
 * 获取亲戚列表
 */

app.post('/getRelative', async (req, res) => {
  // 现在
  const rows = await query('select * from relative_name;')
  //res.header({"Content-Type":"application/x-www-form-urlencoded"});
  res.json({
    code: 200,
    msg: '请求成功',
    data: rows
  })
})

/**
 * 根据user_id 查找个人信息
 */
app.post('/personal/search', async (req, res) => {
  //console.log(162,req.body)
  const rows = await query(personalSQL.search(req.body.userId))
  //res.header({"Content-Type":"application/x-www-form-urlencoded"});
  res.json({
    code: 200,
    msg: '加载成功',
    data: rows
  })
})

/**
 * 个人信息的填写
 */
app.post('/addPersonalInfo', async (req, res) => {
  const rows = await query(personalSQL.insert(req.body))
  res.json({
    code: 200,
    msg: '保存成功',
    data: rows
  })
})

/**
 * 上传图片
 */
app.post('/tool/uploadImg',
  /*upload.array('files', 5),*/
  async (req, res) => {
    let msg = ''
    const imgList = req.files//客户端的文件信息列表
    let imgSqlList = [] //存入数据库的数据

    const readSqlList = await query(fileSQL.searchAll()) //数据库查的图片数据
    for(let i=0;i<imgList.length;i++){
      const fileInfo = imgList[i]
      const params = {
        name: fileInfo.originalname,
        size: fileInfo.encoding,
        type: fileInfo.mimetype,
        path: fileInfo.path
      }
      //给文件命名
      const newFile = `./img/${params.name}`
      const oldFile = fileInfo.path
      /**
       * 对文件进行改名-同步
       * oldFile, newFile, callback
       */
      fs.renameSync(oldFile,newFile)
      console.log('修改成功了')
      //判断有没有相同的文件，没有再插入
      const findIndex = readSqlList.findIndex(i=>i.name === fileInfo.originalname)
      if(findIndex===-1){
        console.log(250,` 插入数据库成功`)
        msg = '没有重复数据，插入成功'
        imgSqlList.push({
          name: params.name,
          size: params.size,
          type: params.type
        })
      }else{
        console.log('有重复数据')
        msg = `有重复数据，插入成功,重复文件名为${readSqlList[findIndex].name}`
      }
      //const rows = await query(fileSQL.insert(params))
    }
    if(imgSqlList.length!==0){
      await imgInsert(imgSqlList)
    }
    res.json({
      code: 200,
      msg: msg,
      data: '200'
    })

  })


async function imgInsert(imgSqlList) {
  //把对象的转成纯数组
  var values = [];
  imgSqlList.forEach(function(n, i){
    var _arr = [];
    for(var m in n){
      _arr.push(n[m]);
    }
    values.push(_arr);
  })

  var sql = "INSERT INTO File (name,size,type) VALUES ?";
  const rows = await query(sql,[values])
}

/**
 * 图片获取
 **/
app.get('/tool/getImgNameList', async (req, res) => {
  const rows = await query(fileSQL.search(100))
  res.json({
    code: 200,
    msg: '查找成功',
    data: rows
  })
})

/**
 * 图片删除
 **/
app.post('/tool/delImg', async (req, res) => {
  delImgs({names: req.body.names})
  const rows = await query(fileSQL.del(req.body.ids))
  res.json({
    code: 200,
    msg: '删除成功',
  })
})

/**
 * 图片删除所有
 **/
app.post('/tool/delAllImg', async (req, res) => {
  emptyFile('img')
  const rows = await query(fileSQL.delAll(req.body.ids))
  console.log('数据库删除所有文件')
  res.json({
    code: 200,
    msg: '数据所有清除成功',
  })
})

/**
 * 获取七牛云upload token
 **/
app.post('/tool/getUploadToken', async (req, res) => {
  res.json({
    code: 200,
    msg: '请求成功',
    data: uploadToken
  })
})


/*
process.on('uncaughtException', function(err) {
  console.log('Caught exception2222222222: ' + err);
  throw err;
});*/
