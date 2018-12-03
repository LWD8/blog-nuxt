import Vue from 'vue'
import * as filters from '~/filter'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})