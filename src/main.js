import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.css'
import axios from 'axios'
import qs from 'qs'
import {Button, Card, Col, Form, FormItem, Input, Message, Row, Tag} from 'element-ui';
Vue.prototype.qs=qs
Vue.prototype.axios=axios
axios.defaults.baseURL="http://127.0.0.1:8888/api/private/v1/"


Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
