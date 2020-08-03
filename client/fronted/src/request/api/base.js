/**
 * 接口域名的管理
 */
//console.log(4, process.env.NODE_ENV)
//'http://127.0.0.1:8002' http://119.45.53.85:8002
const base = {
  taobao:'https://suggest.taobao.com',
  //nodeServer:'http://119.45.53.85:8002',
  nodeServer: process.env.NODE_ENV === 'development'?
  'http://127.0.0.1:8002':"http://119.45.53.85:8002",
  api: '/api' //本地服务开发利用proxy内的代理访问
}

export default base;