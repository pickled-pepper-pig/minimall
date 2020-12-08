import Toast from "./Toast"

const obj = {

}

obj.install = function(Vue) {
  // document.body.appendChild(Toast.$el)   这个时候的Toast.$el为undefined

  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  // 2.利用new方式，根据组件构造器，创建出一个组件对象
  const toast = new toastConstructor()

  // 3.将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // 4.toast.$el对应的就是div（这样才能调用里面的template）
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj