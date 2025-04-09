import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

export default tseslint.config(
  {
    ignores: ['**/*.js', 'dist', 'node_modules', '.git', '.idea', '.eslintcache', '**/*.mjs'],
  },
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylisticTypeChecked,
  {
    plugins: {
      '@stylistic': stylistic
    },
    files: ['**/*'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@stylistic/semi': ['error', 'never'],
      'no-console': 'error',
      '@stylistic/object-curly-spacing': ["error", "always"]
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json'
      }
    }
  }
)
