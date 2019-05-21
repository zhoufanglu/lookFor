const express = require('express')//框架
const bodyParser = require('body-parser')//解析参数
const cors = require('cors')//解决跨域
//import sqlFn from './mysql/select'
import query from './mysql/config'
const app = express()
app.use(bodyParser.json())//json请求
app.use(cors()) //解决跨域
//app.use(bodyParser.urlencoded({extended:false}))//表单请求

app.listen(8001,()=>{
  console.log('服务启动')
})

let login = true
//拦截器
app.all('*',(req,res,next)=>{
  if(!login){
    return res.json('未登录')
  }else{
    next() //向下执行
  }
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
  res.json({
    code: 0,
    msg: '请求成功',
    data: rows
  })
})
