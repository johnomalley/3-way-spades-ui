module.exports = {
  env: {
    node: true
  },
  extends: [
    'love'
  ],
  rules: {
    '@typescript-eslint/strict-boolean-expressions': [
      'off'
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'off'
    ],
    '@typescript-eslint/no-non-null-assertion': [
      'off'
    ]
  },
  parserOptions: {
    project: './tsconfig.json'
  },
  ignorePatterns: ['**/*.html', '**/*.scss', '**/*.js', '**/*.json']
}
