import Button from './components/button'

const components = {
  Button
}

const iview = {
  ...components,
  iButton: Button
}

const install = function (Vue, opts = {}) {
  if (!install.installed) {
    Object.keys(iview).forEach(key => {
      Vue.component(key, iview[key])
    })
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const API = {
  ...components
}

module.exports.default = module.exports = API
