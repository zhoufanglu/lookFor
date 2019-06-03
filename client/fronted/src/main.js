import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/*px2rem-loader：将css中的px转为rem单位，用了它就不用自己计算rem值了
lib-flexible：根据设备宽度，修改根元素html的font-size，以适配不同终端*/
import 'lib-flexible'


/**
 * vant
 */

import { Button, Row, Col,Field,Cell,CellGroup,Icon,Tag,NavBar,ActionSheet,Tab, Sidebar, SidebarItem,
  Tabs,RadioGroup, Radio,Picker,Popup,Dialog,DatetimePicker } from 'vant';

Vue.use(Row).use(Col).use(Button).use(Field).use(CellGroup).use(Icon).use(Tag).use(NavBar).use(ActionSheet).
use(Cell).use(Tab).use(Tabs).use(RadioGroup).use(Radio).use(Picker).use(Popup).use(Sidebar).use(SidebarItem)
  .use(Dialog).use(DatetimePicker)

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

