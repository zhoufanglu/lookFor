const express = require('express')//框架
const bodyParser = require('body-parser')//解析参数
const cors = require('cors')//解决跨域
import sqlFn from './mysql/select'
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

app.post('/test/:data',(req,res)=>{
  return res.json({
    query:req.query,
    data:req.params,
    params:req.body
  })
})

app.get('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx997337d2d17c5a12&redirect_uri=https://proctor.ata.net.cn&response_type=code&scope=snsapi_userinfo&state=login#wechat_redirect',(req,res)=>{
  console.log(34,res)
})

//console.log(33,sqlFn.getAllNowLocation())
/*
console.log(33,SqlFn)
SqlFn.getAllNowLocation()*/

//sqlFn.getAllNowLocation()
