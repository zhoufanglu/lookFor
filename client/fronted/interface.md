# 接口文档

# api/login 登录
```js
    $api(
        'api/login',
        {
           loginCate: 'user/visitor',
           username: 'admin',
           password: '123456'
        }
    ).then(res=>{
    return {
                state:'success',
                msg:'登录成功',
                data:token
              }
    }).catch(err){
        return {
            state:'err',
            msg:'账号密码错误',
            data:{userInfo}
          }
    }
```