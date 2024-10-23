/**
 * @type {import('prettier').Config}
 * @see https://www.prettier.cn/docs/options.html
 */
export default {
  // 在对象或数组的最后一项后面添加逗号
  trailingComma: 'all',
  // 使用单引号而不是双引号
  singleQuote: true,
  // 不使用分号结束语句
  semi: false,
  // 每行的最大宽度为80个字符
  printWidth: 80,
  // 箭头函数参数始终使用括号
  arrowParens: 'always',
  // 总是换行以适应文档宽度
  proseWrap: 'always',
  // 使用 LF 作为行尾符
  endOfLine: 'lf',
  // 不启用实验性的三元运算符格式化
  experimentalTernaries: false,
  // 制表符的宽度为2个空格
  tabWidth: 2,
  // 不使用制表符缩进，而是使用空格
  useTabs: false,
  // 对象属性引用保持一致，如果已有引号则继续使用相同的引号
  quoteProps: 'consistent',
  // 在对象字面量的大括号之间添加空格
  bracketSpacing: true,
  // 多行对象字面量的结束大括号不在同一行
  bracketSameLine: false,
  // Vue 单文件组件中的 <script> 和 <style> 标签不使用额外的缩进
  vueIndentScriptAndStyle: false,
  // HTML 标签的属性不强制每行一个
  singleAttributePerLine: false,
}
