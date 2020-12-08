import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
      // addCart(state, payLoad) {
    // let oldProduct = null
    // for(let item of state.carList) {
    //   if(item.iid === payLoad.iid) {
    //     oldProduct = item
    //   }
    // }
    // // 判断新添加的内容是否重复
    // if(oldProduct) {
    //   oldProduct.count++
    // } else {
    //   payLoad.count = 1
    //   state.carList.push(payLoad)
    // }

    // 1.查找之前数组中是否有数组
    // let oldProduct = state.carList.find(item => item.iid === payLoad.iid)
    // // 2.判断oldProduct
    // if(oldProduct) {
    //   oldProduct.count++
    // } else {
    //   payLoad.count = 1
    //   state.carList.push(payLoad)
    // }
    [ADD_COUNTER](state, payLoad) {
      payLoad.count++
    },
    [ADD_TO_CART](state, payLoad) {
      payLoad.count = 1
      state.carList.push(payLoad)
      payLoad.checked = true
    }
}