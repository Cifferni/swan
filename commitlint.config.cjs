module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', //新增
        'fix', // 修复
        'docs', // 文档
        'style', //样式
        'refactor', //重构
        'perf', // 性能
        'test', //测试
        'build', //打包
        'ci', //修改cli配置
        'chore',
        'revert', // 回复
        'wip', //
        'workflow', // 工作流
        'types', // 类型
        'release',
      ],
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
}
