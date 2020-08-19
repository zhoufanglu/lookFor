module.export = {
  "apps": [
    {
      "name": "lookfor",
      "cwd": "./",
      //"script":"pm2-server.js",
      "script":"index.js",
      "log_date_format": "YYYY-MM-DD HH:mm Z",
      "error_file": "./logs/app-err.log",
      "out_file": "./logs/app-out.log",
      "exec_mode":"fork",
      "watch": true,
      "exec_interpreter":"babel-node",//此配置就是使用babel-node去執行nodejs檔案
      "env": {
        "COMMON_VARIABLE": "true"
      },
      "env_production" : {
        "NODE_ENV": "production"
      }
    }
  ]
}