export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // 'postcss-pxtorem': {
    //   rootValue: 37.5, // UI设计稿的宽度/10
    //   unitPrecision: 3, // 转rem精确到小数点多少位
    //   propList: ['*', '!border*', '!border-radius'], // 需要转换的属性 *表示所有
    //   selectorBlackList: ['ignore'], // 不进行px转换的选择器
    //   replace: true, // 是否直接更换属性值，而不添加备用属性
    //   mediaQuery: false, // 是否在媒体查询的css代码中也进行转换
    //   minPixelValue: 0, // 设置要替换的最小像素值x
    //   exclude: /node_modules/i // 排除node_modules文件夹下的文件
    // },
  },
}
