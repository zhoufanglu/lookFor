const express = require('express')//框架
const bodyParser = require('body-parser')//解析post参数
const cors = require('cors')//解决跨域
//token
const jwt = require('jsonwebtoken')//引入jwt

//import sqlFn from './mysql/select'
import query from './mysql/config'//数据库封装

import checkApiToken from './plugin/check_api_token'


//引入userSQL语句
import {userSQL,personalSQL} from './mysql/sql/sqlLang'

//引入公用方法插件
import {analyticState} from './plugin/global'

const app = express()

//解析application/json
app.use(bodyParser.json());


app.use(cors()) //解决跨域

app.listen(8001,()=>{
  console.log('服务启动')
})

let loginState = 'user'

//拦截器
app.all('*',(req,res,next)=>{
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
        token:token,
        userInfo:userInfo[0]
      })
    }
  } else if (req.body.loginState === 'visitor') {
    sendItem = analyticState('success', '游客登录成功', '游客')
  }

  res.json(sendItem)
})

//屏蔽不需要token的接口
const withoutName = ['register', 'test', 'userInfo']
app.use((req,res,next)=>{
	let isNeedToken = false
	isNeedToken = !withoutName.includes(req.originalUrl.replace('/', ''))
  if(loginState === 'user'&& isNeedToken){
    checkApiToken(req,res,next)
  }else{
    next()
  }
  //console.log(63,req.originalUrl)
})


app.get('/test',(req,res)=>{
  console.log(26,res.json('test111'))
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
app.post('/getNowLocation',async (req,res)=>{
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
app.post('/register',async (req,res)=>{
  //console.log(79,sqlLang.getUserByNickname('admin'))
  const userInfo = await query(userSQL.getUserByNickname(req.body.username))
  //先判断有没有注册过
  //console.log(50,userInfo)
  let sendItem = {}
  if(userInfo.length === 0){
    console.log(97,userSQL.insert(req.body.username,req.body.password))
    const insertUser =  await query(userSQL.insert(req.body.username,req.body.password))
    sendItem = analyticState('success','注册成功',req.body)
    //console.log(99,insertUser)
  }else{
    sendItem = analyticState('err','该用户名已经存在',userInfo)
  }
  //若没有，注册成功
  res.json(sendItem)
})

/**
 * 获取用户账号密码
 */
app.get('/getUserInfo',async (req,res)=>{
	const password = req.query.password
	if(password === '123456') {
		const userInfo = await query(userSQL.getUserInfo())
		res.json(analyticState('success','获取成功',userInfo))
	}
})
/**
 * 获取亲戚列表
 */

app.post('/getRelative',async (req,res)=>{
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
app.post('/personal/search',async (req,res)=>{
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
app.post('/addPersonalInfo',async(req,res)=>{
  const rows = await query(personalSQL.insert(req.body))
  res.json({
    code: 200,
    msg: '保存成功',
    data: rows
  })
})