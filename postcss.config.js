module.exports = {
  plugins: {
    "postcss-px-to-viewport": {
      viewportWidth: 375,     //视窗的宽度，对应我们设计稿的宽度
      viewportHeight: 667,    //视窗的宽度，对应我们设计稿的高度（也可以不配置）
      unitPrecision: 5,      //指定'px'转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw',     //指定需要转换成的视窗单位，建议使用vw
      selectBlackList:['ignore', 'tab-bar', 'tab-bar-item'], //指定不需要转换的类，或者在不需要转换的类后面添加ignore即可
      minPixelValue: 1,    //小于或等于'1px'不转换为视窗单位比如1px在宽度为320的情况下显示为0.8，那这个时候就没有必要转化了
      mediaQuery: false,     //允许在媒体查询中转换'px'
      exclude: [/TabBar/]   //必须是正则，其中^abc表示陪陪的内容移abc开头， abc$表示匹配的内容以abc结尾
    }
  }
}