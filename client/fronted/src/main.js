import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/*px2rem-loader：将css中的px转为rem单位，用了它就不用自己计算rem值了
lib-flexible：根据设备宽度，修改根元素html的font-size，以适配不同终端*/
import 'lib-flexible'
import '@/assets/js/utils/rem.js'

import prototype from '@/assets/js/prototype'
Vue.use(prototype)
/**
 * 插件引入文件
 */
import '@/assets/js/plugins'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

