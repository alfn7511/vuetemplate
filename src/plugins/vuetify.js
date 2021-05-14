import Vue from 'vue'
import Vueify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vueify, {
  iconfont: 'mdiSvg',
  theme: {
    primary: '#00854a'
  }
})
