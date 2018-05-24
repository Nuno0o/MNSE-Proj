// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueVideoPlayer from 'vue-video-player'

Vue.config.productionTip = false
import 'video.js/dist/video-js.css'


global.jQuery = require('jquery');
global.$ = global.jQuery;

Vue.use(VueVideoPlayer,
  /* {
  options: global default options,
  events: global videojs events
} */
)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
