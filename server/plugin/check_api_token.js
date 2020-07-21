let jwt = require('jsonwebtoken');
// 检查用户会话
export default function(req, res, next) {
  //console.log('检查post的信息或者url查询参数或者头信息');
  //检查post的信息或者url查询参数或者头信息
  let token = req.body.token || req.query.token || req.headers['authorization'];
  //console.log(7,token)
  // 解析 token
  if (token) {
    // 确认token
    jwt.verify(token, 'my_token', function(err, decoded) {
      console.log(err)
      if (err) {//token信息错误
        return res.status(402).send({
          success: false,
          message: '登录信息出错！请重新登录。'
        });
        //return res.json({ success: false, message: '登录信息错误.' });
      } else {
        // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
        req.userInfo = decoded;
        console.log(17,req.userInfo);
        next();
      }
    });
  }
  else {
    // 如果没有token，则返回错误
    return res.status(403).send({
      success: false,
      message: '没有提供token！'
    });
  }
};