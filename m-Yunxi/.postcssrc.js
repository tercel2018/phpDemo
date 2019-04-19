// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: {
    'postcss-import': {}, // 解决@import引入路径问题
    'postcss-url': {}, // 该插件主要用来处理文件，比如图片文件、字体文件等引用路径的处理
    'autoprefixer': {}
    // 'postcss-aspect-ratio-mini': {}, // 处理元素容器宽高比
    // // 处理移动端1px的解决方案
    // 'postcss-write-svg': {
    //   utf8: false
    // },
    // 'postcss-cssnext': {}, // 可以让我们使用CSS未来的特性，其会对这些特性做相关的兼容性处理
    // // 把px单位转换为vw、vh、vmin或者vmax
    // 'postcss-px-to-viewport': {
    //   viewportWidth: 1080, // 视窗的宽度，对应的是我们设计稿的宽度
    //   viewportHeight: 1920, // 视窗的高度，也可以不配置
    //   unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
    //   viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
    //   selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
    //   minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
    //   mediaQuery: false // 是否允许在媒体查询中转换`px`
    // },
    // 'postcss-viewport-units': {},
    // // 压缩和清理CSS代码
    // cssnano: {
    //   preset: 'advanced',
    //   autoprefixer: false,
    //   'postcss-zindex': false
    // }
  }
}
