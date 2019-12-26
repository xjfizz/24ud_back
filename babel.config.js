/*
 * @Author: your name
 * @Date: 2019-11-22 17:32:52
 * @LastEditTime: 2019-12-08 14:39:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \24ud-back\babel.config.js
 */

/* 
 * 去除console
*/
const plugins = []

// if (process.env.NODE_ENV === 'production') {

//   plugins.push('transform-remove-console')

// } else {
//   plugins.push('transform-remove-console')
// }


module.exports = {
  presets: [
    '@vue/app',
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'entry'
      }
    ]
  ],
  //plugins

  // if your use import on Demand, Use this code
  // ,
  // plugins: [
  //   [ 'import', {
  //     'libraryName': 'ant-design-vue',
  //     'libraryDirectory': 'es',
  //     'style': true // `style: true` 会加载 less 文件
  //   } ]
  // ]
}
