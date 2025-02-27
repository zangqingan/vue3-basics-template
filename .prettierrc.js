/** @type {import('prettier').Config} */
const config = {
  // 基础格式规则
  semi: true, // 语句末尾添加分号
  useTabs: false, // 使用空格而非制表符
  tabWidth: 2, // 缩进空格数
  proseWrap: 'preserve', // 不改变 Markdown 文本的换行
  printWidth: 120, // 每行最大字符数
  arrowParens: 'always', // 总是为箭头函数的参数添加圆括号
  singleQuote: true, // 使用单引号
  bracketSameLine: false,
  singlelineHtmlElementContentNewline: false, // 强制单行元素内容不换行

  // 对象/数组格式
  trailingComma: 'es5', // 多行时添加尾随逗号
  bracketSpacing: true, // 在对象字面量的括号内添加空格

  // Vue 文件特殊处理
  vueIndentScriptAndStyle: true, // 缩进 <script> 和 <style> 标签内容

  // 其他语言支持
  htmlWhitespaceSensitivity: 'css', // HTML 中的空格敏感性
  endOfLine: 'auto', // 行尾换行符自动适配
};

export default config;
